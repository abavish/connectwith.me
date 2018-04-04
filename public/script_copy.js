function showError(error) {
        var message = "An error occurred";
        if (error.message) {
                message = error.message;
        } else if (error.errors) {
                var errors = error.errors;
                message = "";
                Object.keys(errors).forEach(function(k) {
                        message += k + ": " + errors[k] + "\n";
                });
        }

        alert(message);
}
$(document).ready(function() {

    //loadComments();
    var file = [];

    var usrFragment, userName;

    //code to associate the test property of the logged-in user
        dpd.users.me(function(result, error) {
            //console.log(result);
            usrFragment = result.test;
            userName = result.username;
        

            console.log("Username ", userName);
            console.log("User fragment", usrFragment);
            //code to populate the name and image fields on page load depending on logged-in user
            $('#usrName').val(userName);

            var query = {"usr":usrFragment};

            console.log(query);
            dpd.imgfileupload.get(query, function(result, err) {
                        console.log(result[result.length - 1].filename);
                        $('#profilePic').attr('src', 'http://localhost:2403/upload/' + result[result.length - 1].filename);
            });
        });
        

        //code for logout 
        $('#btnLogout').click(function() {
          dpd.users.logout(function(res, err) {
            location.href = "/index.html";
          });
        });

    $('#comment-form').submit(function(event) {

        event.preventDefault();
        //Get the data from the form
        var name = $('#name').val();
        var comment = $('#comment').val();

        // dpd.comments.post({
        //   name: name, //assigned value is the variable created above - form field value
        //   comment: comment
        // }, function(comment, error) {
        //   if(error) return showError(error);

        //   addComment(comment); //passing the comment object(created on callback)
        //   $('#name').val('');
        //   $('#comment').val('');

        // });

        //uploading file code
        var imgFile = $('#exampleInputFile')[0].files[0];

        file.push(imgFile);

        console.log(file);

         var fd = new FormData();
         fd.append("uploadedFile", file[0]);

         //console.log(fd);
         var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:2403/imgfileupload?usr=' + usrFragment);
        xhr.onload = function() {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (this.status < 300) {
                //$('.alert-success').append("Upload successful!<br />");
                console.log("Image Uploaded");
                // for (var index in response) {
                //    appendUploadedFileToTable(response[index]);
                // }
                //get all files uploaded
                $.get('http://localhost:2403/imgfileupload?usr=' + usrFragment, function(serverResponse) {
                  console.log("ImgFileUpload collection: ", serverResponse);
                });

                // $.get('http://localhost:2403/users?usrFragment=' + usrFragment, function(serverResponse) {
                //   console.log("Users Collection: ", serverResponse);
                // });
            
                dpd.imgfileupload.get(function(result, err) {
                    console.log(result);
                });

            } else {
          alert(response.message);
            }
        };
        xhr.onerror = function(err) {
            alert("Error: ", err);
        }
    
        xhr.send(fd);

        //display image
        //$('.displayPic').append

        return false;
    });

    // function addComment(comment) {
    //     $('<div class="comment">')
    //         .append('<div class="author">Posted by: ' + comment.name + '</div>')
    //         .append('<p>' + comment.comment + '</p>')
    //         .appendTo('#comments');
    // }

//     function loadComments() {
//     dpd.comments.get(function(comments, error) { //Use dpd.js to access the API
//         $('#comments').empty(); //Empty the list
//         comments.forEach(function(comment) { //Loop through the result
//             addComment(comment); //Add it to the DOM.
//         });
//     });
// }

});
