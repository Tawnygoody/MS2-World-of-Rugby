/*
Send Mail function taken from Code Institute tutorial by Matt Rudge
*/
function sendMail(contactForm) {
        emailjs.send("service_drsgi1h", "contact_form", {
            "from_name": contactForm.name.value,
            "from_email": contactForm.emailaddress.value,
            "customer_request": contactForm.customersummary.value
        })
        .then(
            function(response) {
                window.alert("Thankyou for your enquiry.")
                $('#contact-form')[0].reset(); //clear the contact form taken from https://stackoverflow.com/questions/14589193/clearing-my-form-inputs-after-submission/47198786
                console.log("Success", response);
            },
            function(error) {
                window.alert("Failed to submit enquiry.")
                console.log("Failed", error);
            });
            return false
    }


$(document).ready(function() {
    $('.kick-off').fadeIn(1000).removeClass('hidden'); //fades in kick off button on page load
    $("#logo-image").slideDown(1000).removeClass('hidden'); //slides down logo on page load
    $("#rules-button").click(function() {
        $("#rules-info").slideToggle("medium").removeClass("hidden"); //slides down game rules when rules button is clicked
    });
    $("#contact-button").click(function() {
        $("form").slideToggle("medium").removeClass("hidden");
    })
});