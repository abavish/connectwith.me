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

dpd.users.me(function(user) {
      if (user) {
        location.href = "/index_copy2.html";
      }
    });



$('#main-form').submit(function() {
    var usrname = $('#txtEmail').val();
    var pwd = $('#txtPwd').val();
    //var usrFragment = "";

    dpd.users.login({username: usrname, password: pwd}, function(session, error) {
        if (error) {
          alert(error.message);
        } else {
            //console.log(session);
            // dpd.users.me(function(me) {
            //   //console.log(me.test);
            //   usrFragment = me.test;
            //   location.href = "/index_copy2.html#" + usrFragment;
            location.href = "/index_copy2.html";
            // });
        }
    });


    return false;
});

