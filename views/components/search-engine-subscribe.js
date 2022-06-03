function displayInfoModal(id, name) {
    $("#bg-info-modal-title").html(name)
    $("#modal-description > span").html($(`#${id}-description`).html())
    $("#modal-genre > span").html($(`#${id}-genre`).html())
    $("#modal-noOfPlayers > span").html($(`#${id}-noOfPlayers`).html())
    $("#modal-duration > span").html($(`#${id}-duration`).html())
    $("#modal-ageLimit > span").html($(`#${id}-ageLimit`).html())
    $("#modal-language > span").html($(`#${id}-language`).html())
    $("#bg-info-modal").modal("show")

}
