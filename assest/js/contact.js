$(function () {
    "use strict";
    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator
    $('#contact-form').validator();
    // when the form is submitted
    $('#contact-form').on('submit', function (e) {
  			// if the validator does not prevent form submit
  			if (!e.isDefaultPrevented()) {
  					var url = "mail";
  					// POST values in the background the the script URL
  					$.ajax({
  							type: "POST",
  							url: url,
  							data: $(this).serialize(),
  							success: function (data)
  							{
  								if (data==1) {
                                    swal({
                                      title: "Thanks",
                                      text: "welcome to codewithdeep",
                                      icon: "success",
                                      buttons: false
                                    });
  								}
  								setTimeout(function() {
                                    location.reload();
                                }, 3000);
  							}
  					});
  					return false;
  			}
  	})
});
