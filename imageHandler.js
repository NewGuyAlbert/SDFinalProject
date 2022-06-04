require('dotenv').config()
const router = require('express').Router()

// loads db
const mongoose_original = require('mongoose')
const mongoose = require("./dbConnector.js")
const mongo = require('mongodb')

const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage
const Grid = require('gridfs-stream')

let gfs;
mongoose_original.connection.once('open', function() {
    // Init stream
    gfs = Grid(mongoose, mongo)
    gfs.collection('images');
})

const URI = process.env.MONGODB_URI

// create storage engine
const storage = new GridFsStorage({
    url: URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            try {
                const fileInfo = {
                    filename: file.originalname,
                    bucketName: 'images'
                }
                resolve(fileInfo)
            } catch (err) {
                reject(err)
            }
            // crypto.randomBytes(16, (err, buf) => { // randomBytes -> to generate names
            //     if (err) {
            //         return reject(err)
            //     }
            //     const filename = buf.toString('hex') + path.extname(file.originalname)
            //     const fileInfo = {
            //         filename: file.originalname,
            //         bucketName: 'images'
            //     }
            //     resolve(fileInfo)
            // })
        })
    }
})
const upload = multer({ storage })

// @route GET /image/json/:filename
// @desc Display the file in JSON
router.get('/image/json/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: `file with the name ${filename} does not exist`
            })
        }
        return res.json(file);
    })
})

// @route GET /image/:filename
// @desc Display the file as image
router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: `file with the name ${filename} does not exist`
            })
        }
        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read the output
            const readstream = gfs.createReadStream(file.filename)
            readstream.pipe(res)
        } else {
            res.status(404).json({
                err: "not an image"
            })
        }

    })
})

// @route POST /upload-image
// @desc Uploads file to DB
router.post('/upload-image', upload.single('file'), (req, res) => {
    res.status(200).json({
        status: "file uploaded successfully"
    })
})

// @route DELETE /image/:id
// @desc Delete file
router.delete('/image/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'images' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({
                err: err
            })
        }
        res.status(200).json({
            status: "file deleted successfully"
        })
    })
})

module.exports = router