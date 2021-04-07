/*
Send Mail function taken from Code Institute tutorial by Matt Rudge (credited in README)
*/
function sendMail(contactForm) {
        emailjs.send("service_drsgi1h", "contact_form", {
            "from_name": contactForm.name.value,
            "from_email": contactForm.emailaddress.value,
            "customer_request": contactForm.customersummary.value
        })
        .then(
            function() {
                window.alert("Thank you for your enquiry.") //alerts the user once they have submitted their enquiry
                $('#contact-form')[0].reset(); //clear the contact form taken from Stack Overflow (credited in README)
                $("form").slideToggle("medium").addClass("hidden"); //hides the contact form once the customer has submitted their enquiry
            },
            function() {
                window.alert("Failed to submit enquiry.")
            });
            return false
    }


$(document).ready(function() {
    $('.kick-off').fadeIn(1000).removeClass('hidden'); //fades in kick off button on page load
    $("#logo-image").slideDown(1000).removeClass('hidden'); //slides down logo on page load
    $("#rules-button").click(function() {
        $("#rules-info, .listItems").slideToggle("medium").removeClass("hidden"); //slides down game rules when rules button is clicked
    });
    $("#contact-button").click(function() {
        $("form").slideToggle("medium").removeClass("hidden"); //slides down the contact form when the contact us button is clicked
    })
});