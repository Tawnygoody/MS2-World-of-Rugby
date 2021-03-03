$(document).ready(function() {
    $('.kick-off').fadeIn(1000).removeClass('hidden'); //fades in kick off button on page load
    $("#logo-image").slideDown(1000).removeClass('hidden'); //slides down logo on page load
    
    $("#rules-button").click(function() {
        $("#rules-info").slideToggle("medium").removeClass("hidden"); //slides down game rules when rules button is clicked
    })
})