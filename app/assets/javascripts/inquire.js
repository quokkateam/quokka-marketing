function makeInquiryInteractive() {
  $('[data-action=submit-inquiry]').click(function (e) {
    var inquiry = parseFields();

    if (isValidInquiry(inquiry, true)) {
      sendInquiry(inquiry);
    }
  });

  $('.inquiry-field').keypress(function (e) {
    $(e.target).removeClass('invalid');
  });
}

function parseFields () {
  return {
    school: $('.inquiry-field[name=school]').val().trim(),
    email: $('.inquiry-field[name=email]').val().trim()
  };
}

function isValidInquiry (data) {
  var isValid = true;

  for (var k in data) {
    if (!data[k]) {
      $('.inquiry-field[name=' + k + ']').addClass('invalid');
      isValid = false
    }
  }

  return isValid;
}

function sendInquiry (data) {
  $.ajax({
    type: "POST",
    url: '/inquire',
    data: data,
    dataType: 'application/json',
    complete: onInquireComplete
  });
}

function onInquireComplete () {
  $('.submit-desktop').addClass('completed');

  setTimeout(function () {
    $('.submit-desktop').removeClass('completed');
    $('.inquiry-field').val('');
  }, 1200);
}

$(document).ready(function () {
  makeInquiryInteractive();
});