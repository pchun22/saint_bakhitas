$(document).ready(function(){
    window.location.href.split("/").pop() === "#students" && showStudents()
    window.location.href.split("/").pop() === "#about" && showAbout()
})

  
var scrollInView = function() {
    $('.fade-up').isInViewport({ }).addClass('in-view');
    $('.fade-in').isInViewport({ }).addClass('in-view');
    $('.fade-down').isInViewport({ }).addClass('in-view'); 
    $('.fade-right').isInViewport({ }).addClass('in-view'); 
    $('.fade-left').isInViewport({ }).addClass('in-view'); 
}

scrollInView()

$(window).scroll(scrollInView);
$(".nav-item").click(scrollInView);

function showStudents() {
    console.log("show students")
    $("#about").addClass("hidden") 
    $("#students").removeClass("hidden")
    $("#students").get(0).scrollIntoView({behavior: "smooth"})
    $("#about-btn").removeClass("dark-red")
    $("#students-btn").addClass("dark-red")
    $('.navbar-collapse').collapse('hide');
}

function showAbout(){
    console.log("show about")
    $("#students").addClass("hidden") 
    $("#about").removeClass("hidden")
    $("#about").get(0).scrollIntoView({behavior: "smooth"})
    $("#students-btn").removeClass("dark-red")
    $("#about-btn").addClass("dark-red")
    $('.navbar-collapse').collapse('hide');
}

$(".students-btn").click(showStudents)

$(".about-btn").click(showAbout)


$('#image-upload').on('change', function () {
    var $files = $(this).get(0).files;
    const fileName = $files[0].name;

    if ($files.length) {
    // Reject big files
    if ($files[0].size > $(this).data('max-size') * 1024) {
        console.log('Please select a smaller file');
        return false;
    }

    // Begin file upload
    console.log('Uploading file to Imgur..');

    // API key
    var apiUrl = 'https://api.imgur.com/3/image';
    var apiKey = '47d469dd3c40384';

    var settings = {
        async: false,
        crossDomain: true,
        processData: false,
        contentType: false,
        type: 'POST',
        url: apiUrl,
        headers: {
        Authorization: 'Client-ID ' + apiKey,
        Accept: 'application/json',
        },
        mimeType: 'multipart/form-data',
    };

    var formData = new FormData();
    formData.append('image', $files[0]);
    settings.data = formData;

    // Response contains stringified JSON
    // Image URL available at response.data.link
    $.ajax(settings).done(function (response) {
        const data = JSON.parse(response).data;
        const imageLinks = $('#imgData').attr("value") + ($('#imgData').attr("value") == "" ? data.link : "," + data.link);
        $('#imgData').attr("value", imageLinks);
        $('#image-upload').after("<p>"+fileName+"</p>")
        console.log(data.link)
    });
    }
});
  