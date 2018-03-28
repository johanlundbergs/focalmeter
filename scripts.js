var slider = document.getElementById("focalLengthSlider");
var output = document.getElementById("focalLength");
output.innerHTML = slider.value;

var values = ['24', '35', '50', '70', '85', '105', '135', '180', '200', '250', '300', '400', '500', '600',];


output.innerHTML = values[0] + 'mm';
$('.f1-4.circleDiv').addClass('activeAperture');
var fstop = $('.activeAperture').attr('data');
var url = 'images/' + values[slider.value - 1] + '-' + fstop + '.png';

slider.oninput = function () {
  output.innerHTML = values[slider.value - 1] + 'mm';
  var fstop = $('.activeAperture').attr('data');
  var url = 'images/' + values[slider.value - 1] + '-' + fstop + '.png';
  var url28 = 'images/' + values[slider.value - 1] + '-28.png';
  var url4 = 'images/' + values[slider.value - 1] + '-4.png';
  var url56 = 'images/' + values[slider.value - 1] + '-56.png';

  /* Gets image matching the specified focal length & aperture. If it does not exist it will continue trying
  with a lower fstop. */
  $.ajax({
    url: url,
    type: 'HEAD',
    error: function () {
      $.ajax({
        url: url28,
        type: 'HEAD',
        error: function () {
          $.ajax({
            url: url4,
            type: 'HEAD',
            error: function () {
              $.ajax({
                url: url56,
                type: 'HEAD',
                error: function () {
                  //Sista försöket

                },
                success: function () {
                  $('#referenceImageContainer').css('background-image', 'url(images/' + values[slider.value - 1] + '-56.png)');
                  $('.circleDiv').removeClass('activeAperture');
                  $('.f5-6').addClass('activeAperture');
                }
              });

            },
            success: function () {
              $('#referenceImageContainer').css('background-image', 'url(images/' + values[slider.value - 1] + '-4.png)');
              $('.circleDiv').removeClass('activeAperture');
              $('.f4').addClass('activeAperture');
            }
          });

        },
        success: function () {
          $('#referenceImageContainer').css('background-image', 'url(images/' + values[slider.value - 1] + '-28.png)');
          $('.circleDiv').removeClass('activeAperture');
          $('.f2-8').addClass('activeAperture');
        }
      });

    },
    success: function () {
      $('#referenceImageContainer').css('background-image', 'url(images/' + values[slider.value - 1] + '-' + fstop + '.png)');
      $(fstop).addClass('activeAperture');
    }
  });
}


$('.circleDiv').on('click', function () {
  var clickedFstop = this;
  var newFstop = $(this).attr('data');
  var newUrl = 'images/' + values[slider.value - 1] + '-' + newFstop + '.png';
  $.ajax({
    url: newUrl,
    type: 'HEAD',
    error: function () {

    },
    success: function () {
      $('#referenceImageContainer').css('background-image', 'url(images/' + values[slider.value - 1] + '-' + fstop + '.png)');
      $('.circleDiv').removeClass('activeAperture');
      $(clickedFstop).toggleClass('activeAperture');
    }
  });
});


