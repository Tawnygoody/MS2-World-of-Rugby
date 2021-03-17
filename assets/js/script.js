function sendMail(contactForm) {
        emailjs.send("service_drsgi1h", "contact_form", {
            "from_name": contactForm.name.value,
            "from_email": contactForm.emailaddress.value,
            "customer_request": contactForm.customersummary.value
        })
        .then(
            function(response) {
                console.log("Success", response);
            },
            function(error) {
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