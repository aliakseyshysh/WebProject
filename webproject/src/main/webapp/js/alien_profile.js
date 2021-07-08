function updateAlien() {

    let formAlienUpdate = document.getElementById("form-alien-update")
    let name = document.getElementById("form-alien-update-name")
    let descriptionSmall = document.getElementById("form-alien-update-description-small")
    let descriptionFull = document.getElementById("form-alien-update-description-full")
    let image = document.getElementById("form-alien-update-image")
    
    let nameInvalidFeedback = document.getElementById("form-alien-update-name-invalid-feedback");
    let descriptionSmallInvalidFeedback = document.getElementById("form-alien-update-description-small-invalid-feedback")
    let descriptionFullInvalidFeedback = document.getElementById("form-alien-update-description-full-invalid-feedback")
    let imageInvalidFeedback = document.getElementById("form-alien-update-image-invalid-feedback")
    let imageLabel = document.getElementById("form-alien-update-image-label")

    let alienId = document.getElementById("form-alien-update-alien-id-parameter-current-alien-id").innerHTML

    let formData = new FormData();
    formData.append(ALIEN_ID, alienId);
    formData.append(ALIEN_NAME, name.value);
    formData.append(ALIEN_SMALL_DESCRIPTION, descriptionSmall.value);
    formData.append(ALIEN_FULL_DESCRIPTION, descriptionFull.value);
    formData.append(ALIEN_NEW_IMAGE, image.files[0]);
    let url = CONTROLLER + "?" + COMMAND + "=" + UPDATE_ALIEN + "&" + ALIEN_ID + "=" + alienId;
    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            name.classList.add("is-valid")
            name.classList.remove("is-invalid")
            descriptionSmall.classList.add("is-valid")
            descriptionSmall.classList.remove("is-invalid")
            descriptionFull.classList.add("is-valid")
            descriptionFull.classList.remove("is-invalid")
            image.classList.add("is-valid")
            image.classList.remove("is-invalid")
            formAlienUpdate.classList.add("was-validated")
            // document.getElementById("form-update-login-parameter-current-user-login").innerHTML = enteredLogin;
            // document.getElementById("form-update-LOGIN").classList.remove('was-validated');
            // document.getElementById("form-update-LOGIN-LOGIN").classList.remove("is-invalid");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            formAlienUpdate.classList.remove("was-validated");
            if (jqXHR.responseJSON[ADD_NEW_UPDATE_ALIEN_ALIEN_NAME_STATUS] == false) {
                name.classList.add("is-invalid");
                name.classList.remove("is-valid");
            } else {
                name.classList.remove("is-invalid");
                name.classList.add("is-valid");
                nameInvalidFeedback.innerHTML = jqXHR.responseJSON[ADD_NEW_UPDATE_ALIEN_RESULT_INFO_ALIEN_NAME_FEEDBACK];
            }
            if (jqXHR.responseJSON[ADD_NEW_UPDATE_ALIEN_ALIEN_SMALL_DESCRIPTION_STATUS] == false) {
                descriptionSmall.classList.add("is-invalid");
                descriptionSmall.classList.remove("is-valid");
            } else {
                descriptionSmall.classList.remove("is-invalid");
                descriptionSmall.classList.add("is-valid");
                descriptionSmallInvalidFeedback.innerHTML = jqXHR.responseJSON[ADD_NEW_UPDATE_ALIEN_RESULT_INFO_ALIEN_SMALL_DESCRIPTION_FEEDBACK];
            }
            if (jqXHR.responseJSON[ADD_NEW_UPDATE_ALIEN_ALIEN_FULL_DESCRIPTION_STATUS] == false) {
                descriptionFull.classList.add("is-invalid");
                descriptionFull.classList.remove("is-valid");
            } else {
                descriptionFull.classList.remove("is-invalid");
                descriptionFull.classList.add("is-valid");
                descriptionFullInvalidFeedback.innerHTML = jqXHR.responseJSON[ADD_NEW_UPDATE_ALIEN_RESULT_INFO_ALIEN_FULL_DESCRIPTION_FEEDBACK];
            }
            if (jqXHR.responseJSON[ADD_NEW_UPDATE_ALIEN_ALIEN_IMAGE_STATUS] == false) {
                image.classList.add("is-invalid");
                image.classList.remove("is-valid");
            } else {
                image.classList.remove("is-invalid");
                image.classList.add("is-valid");
                imageInvalidFeedback.innerHTML = jqXHR.responseJSON[ADD_NEW_UPDATE_ALIEN_RESULT_INFO_ALIEN_IMAGE_FEEDBACK];
            }
            formAlienCreate.classList.add("was-validated");
        }
    });
};

function addNewComment() {
    var comment = document.getElementById("new-comment-form-comment").value;
    var data = {};
    data[NEW_COMMENT] = comment;
    data[ALIEN_ID] = alienId;
    data[USER_ID] = userId;
    var url = CONTROLLER + "?" + COMMAND + "=" + ADD_NEW_COMMENT;
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        success: function (updateResult) {
            if (updateResult == "true") {
                // load new comment (add to up)
                //window.location.href = "";
                document.getElementById("new-comment-form-comment").value = "";
                //$("#alien-update-form").load("/" + PROJECT_NAME + "/" + CONTROLLER + "?" + COMMAND + "=" + LOAD_ALIEN_UPDATE_CREATE_FORM + " #alien-update-form");
                //set invisible to visible validation green
            } else if (updateResult == "false") {
                // set invisible to visible validation red
            }
        },
        error: function () {
            // TODO show error
        }
    });
};

function deleteComment() {
    var data = {};
    data[COMMENT_ID] = commentId;
    var url = CONTROLLER + "?" + COMMAND + "=" + DELETE_COMMENT;
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        success: function (updateResult) {
            if (updateResult == "true") {
                var elementId = "comment_" + commentId;
                document.getElementById(elementId).remove();
                //$("#promote-demote-form").load("/" + PROJECT_NAME + "/" + CONTROLLER + "?" + COMMAND + "=" + DELETE_COMMENT + " #promote-demote-form");
                //set invisible to visible validation green
            } else if (updateResult == "false") {
                // set invisible to visible validation red
            }
        },
        error: function () {
            // TODO show error
        }
    });
};

function previousCommentPage(alienId, pageToRequest) {
    var url = CONTROLLER + "?" + COMMAND + "=" + OPEN_ALIEN_PROFILE_PAGE + "&" + ALIEN_ID + "=" + alienId + "&" + PAGE + "=" + pageToRequest;
    location.assign(url);
};

function nextCommentPage(alienId, pageToRequest) {
    var url = CONTROLLER + "?" + COMMAND + "=" + OPEN_ALIEN_PROFILE_PAGE + "&" + ALIEN_ID + "=" + alienId + "&" + PAGE + "=" + pageToRequest;
    location.assign(url);
};

const alienProfile = {
    updateAlien: updateAlien,
    addNewComment: addNewComment,
    deleteComment: deleteComment,
    previousCommentPage: previousCommentPage,
    nextCommentPage: nextCommentPage
}

$(document).ready(function () {
    let formAlienUpdate = document.getElementById("form-alien-update")
    let name = document.getElementById("form-alien-update-name")
    let descriptionSmall = document.getElementById("form-alien-update-description-small")
    let descriptionFull = document.getElementById("form-alien-update-description-full")
    let image = document.getElementById("form-alien-update-image")
    let imageLabel = document.getElementById("form-alien-update-image-label")
    if (formAlienUpdate != null) {
        name.value = document.getElementById("alien-name").innerHTML;
        descriptionSmall.value = document.getElementById("alien-small-description").innerHTML;
        descriptionFull.value = document.getElementById("alien-big-description").innerHTML;

        let alienProfile = document.getElementById("alien-image").src
        let splitted = alienProfile.split(".")
        let imgExtension = splitted[splitted.length - 1]

        fetch(alienProfile)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], 'alien_profile_image.' + imgExtension, blob);
                var dataTransfer = new DataTransfer()
                dataTransfer.items.add(file)
                image.files = dataTransfer.files
                imageLabel.innerHTML = file.name
            })

    }

    // TODO set file to input alien-image
    //document.getElementById("alien-update-form-image").files;
});


$(document).ready(function () {
    let formAlienUpdate = document.getElementById("form-alien-update");
    let name = document.getElementById("form-alien-update-name");
    let descriptionSmall = document.getElementById("form-alien-update-description-small");
    let descriptionFull = document.getElementById("form-alien-update-description-full");
    let image = document.getElementById("form-alien-update-image");
    
    let nameInvalidFeedback = document.getElementById("form-alien-update-name-invalid-feedback");
    let descriptionSmallInvalidFeedback = document.getElementById("form-alien-update-description-small-invalid-feedback");
    let descriptionFullInvalidFeedback = document.getElementById("form-alien-update-description-full-invalid-feedback");
    let imageInvalidFeedback = document.getElementById("form-alien-update-image-invalid-feedback");
    let imageLabel = document.getElementById("form-alien-update-image-label");

    formAlienUpdate.addEventListener('submit', function(event) {
        imageLabel.innerHTML = "Select image"; // TODO change to variable

        name.classList.remove("is-invalid");
        name.classList.remove("is-valid");
        descriptionSmall.classList.remove("is-invalid");
        descriptionSmall.classList.remove("is-valid");
        descriptionFull.classList.remove("is-invalid");
        descriptionFull.classList.remove("is-valid");
        image.classList.remove("is-invalid");
        image.classList.remove("is-valid");

        formAlienUpdate.classList.remove("was-validated");

        let files = image.files;
        let nameCheckResult = false;
        let descriptionSmallCheckResult = false;
        let descriptionFullCheckResult = false;
        let imageCheckResult = false;
        let validExtensions = ["image/jpg", "image/jpeg", "image/png"];

        if (name.value != "" && name.value.match(name.getAttribute("pattern"))) {
            nameCheckResult = true
            name.classList.add("is-valid")
        }
        if (descriptionSmall.value != "" && descriptionSmall.value.match(descriptionSmall.getAttribute("pattern"))) {
            descriptionSmallCheckResult = true
            descriptionSmall.classList.add("is-valid")
        }
        if (descriptionFull.value != "" && descriptionFull.value.replaceAll('\n', '\\n').match(descriptionFull.getAttribute("pattern"))) {
            descriptionFullCheckResult = true
            descriptionFull.classList.add("is-valid")
        }
        if (files.length == 1) {
            let file = files[0];
            
            if (file.size <= 1000000) { // bytes
                for (let i = 0; i < validExtensions.length; i++) {
                    if (validExtensions[i] == file.type) {
                        imageCheckResult = true
                        image.classList.add("is-valid")
                        break
                    }
                }    
            }
        }

        if (!nameCheckResult || !descriptionSmallCheckResult || !descriptionFullCheckResult || !imageCheckResult) {
            if (!nameCheckResult) {
                nameInvalidFeedback.innerHTML = ADD_NEW_UPDATE_ALIEN_STANDARD_ALIEN_NAME_FEEDBACK;
                name.classList.add("is-invalid");
            }
            if (!descriptionSmallCheckResult) {
                descriptionSmallInvalidFeedback.innerHTML = ADD_NEW_UPDATE_ALIEN_STANDARD_ALIEN_SMALL_DESCRIPTION_FEEDBACK;
                descriptionSmall.classList.add("is-invalid");
            }
            if (!descriptionFullCheckResult) {
                descriptionFullInvalidFeedback.innerHTML = ADD_NEW_UPDATE_ALIEN_STANDARD_ALIEN_FULL_DESCRIPTION_FEEDBACK;
                descriptionFull.classList.add("is-invalid");
            }
            if (!imageCheckResult) {
                imageInvalidFeedback.innerHTML = ADD_NEW_UPDATE_ALIEN_STANDARD_ALIEN_IMAGE_FEEDBACK;
                image.classList.add("is-invalid");
            }
        // formAlienCreate.classList.add('was-validated');
           // document.getElementById("form-alien-update-image").setCustomValidity(UPDATE_IMAGE_RESULT_INFO_FEEDBACK_INVALID_IMAGE);
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            document.getElementById("form-alien-update-image-label").innerHTML = files[0].name;
            alienProfile.updateAlien()
        }
      }, false);
      name.addEventListener('input', function(event) {
        formAlienUpdate.classList.remove('was-validated');
        name.classList.remove("is-invalid");
        name.classList.remove("is-valid");
      })
      descriptionSmall.addEventListener('input', function(event) {
        formAlienUpdate.classList.remove('was-validated');
        descriptionSmall.classList.remove("is-invalid");
        descriptionSmall.classList.remove("is-valid");
      })
      descriptionFull.addEventListener('input', function(event) {
        formAlienUpdate.classList.remove('was-validated');
        descriptionFull.classList.remove("is-invalid");
        descriptionFull.classList.remove("is-valid");
      })
      image.addEventListener('input', function(event) {
        imageLabel.innerHTML = image.files[0].name;
        formAlienUpdate.classList.remove('was-validated');
        image.classList.remove("is-invalid");
        image.classList.remove("is-valid");
      })
});