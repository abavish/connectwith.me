/* Created and modified by Vishal */

var file = [];  //Array to store img file

//Executed on submit button of signup page. Replace the id in below loc with id of submit button
$('#comment-form').submit(function(event) {

        //event.preventDefault();
        //Need to populate usrFragment with a unique value
        var usrFragment = "";
        
        //uploading file code. Replace the id in below loc with id of img tag on signup page
        var imgFile = $('#exampleInputFile')[0].files[0];

        //storing FileList object data into array
        file.push(imgFile);

        //console.log(file);

        // Image upload code
         var fd = new FormData(); //FormData object to store uplpoaded image
         fd.append("uploadedFile", file[0]);

         var xhr = new XMLHttpRequest();

         //Dynamically assigning a usr property in the imgfileupload collection(in deployd)
        xhr.open('POST', 'http://localhost:2403/imgfileupload?usr=' + usrFragment); //associates the image to a unique fragment value
        xhr.onload = function() {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (this.status < 300) {
                console.log("Image Uploaded");
            } else {
          alert(response.message);
            }
        };
        xhr.onerror = function(err) {
            alert("Error: ", err);
        }
    
        xhr.send(fd);

        //redirect user to login page
        location.href = "/login.html";

        return false;
    });