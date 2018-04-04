$(document).ready(function() {
  $('#contact_form').bootstrapValidator({
    // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      first_name: {
        validators: {
          stringLength: {
            min: 2,
          },
          notEmpty: {
            message: 'Please enter your First Name'
          }
        }
      },
      last_name: {
        validators: {
          stringLength: {
            min: 2,
          },
          notEmpty: {
            message: 'Please enter your Last Name'
          }
        }
      },
      username: {
        validators: {
          stringLength: {
            min: 8,
          },
          notEmpty: {
            message: 'Please enter your Username'
          }
        }
      },
      password: {
        validators: {
          stringLength: {
            min: 8,
          },
          notEmpty: {
            message: 'Please enter your Password'
          }
        }
      },
      email: {
        validators: {
          notEmpty: {
            message: 'Please enter your Email Address'
          },
          emailAddress: {
            message: 'Please enter a valid Email Address'
          }
        }
      },
      contact_no: {
        validators: {
          stringLength: {
            min: 10,
            max: 10,
          },
          notEmpty: {
            message: 'Please enter your Contact No.'
          }

        }
      },
      department: {
        validators: {
          notEmpty: {
            message: 'Please choose your Profession'
          }
        }
      },
      about_me: {
        validators: {
          stringLength: {
            min: 10,
            max: 1000,
          },
          notEmpty: {
            message: 'Please provide your details'
          }

        }
      },
      image: {
        validators: {
          notEmpty: {
            message: 'Please provide your image'
          }
        }
      },
    }
  })

  function ValidateSize(file) {
    var FileSize = file.files[0].size / 1024 / 1024; // in MB
    if (FileSize > 2) {
      alert('File size exceeds 2 MB');
      $(file).val(''); //for clearing with Jquery
    } else {

    }
  }

//$(document).ready(function() {
  $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
  });

  $('.btn-file :file').on('fileselect', function(event, label) {
    var input = $(this).parents('.input-group').find(':jpg'),
      log = label;

      if (input.length) {
        input.val(log);
      } else {
        if (log) alert(log);
      }
  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $('#img-upload').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#imgInp").change(function() {
    readURL(this);
  });

  //function to add user to the users collection on button click
  $('#comment-form').submit(function(event) {
    event.preventDefault();
    //first store form values in variables
    var first_name = $('first_name').val();
    var last_name = $('last_name').val();
    var profession = $('#profession option:selected').val();
    var user_name = $('#user_name').val();
    var user_password = $('#user_password').val();
    var email = $('#email').val();
    var contact_no = $('#contact_no').val();
    var about_me = $('#about_me').val();

    //code to add the data to the user collection
    dpd.users.post({
      username: user_name,
      password: user_password,
      firstname: first_name,
      lastname: last_name,
      profession: profession,
      email: email,
      contactno: contact_no,
      aboutme: about_me,
      userFragment: user_name
    }, function(user, err) {
      if (err) {
        // An error could be either the err.message property, or err.errors.title, so we account for either case
        alert(err.message || (err.errors && err.errors.title));
        return;
      }

      
    });
                        //   return false;
                        // }

  });
  
//});
});


