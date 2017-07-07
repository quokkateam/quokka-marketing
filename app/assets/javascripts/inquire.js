function makeJoinBtnsInteractive() {
  $('[data-action=request-to-join]').click(function () {
    $(document).scrollTo();
  });
}

function makeInquiryInteractive() {
  $('[data-action=submit-inquiry]').click(function (e) {
    var inquiry = parseFields();

    if (isValidInquiry(inquiry, true)) {
      sendInquiry(inquiry, e.target);
    }
  });

  $('.inquiry-field').keypress(function (e) {
    $(e.target).removeClass('invalid');
    $('.submit-mobile').removeClass('completed').html('Submit');
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

function sendInquiry (data, submitBtn) {
  if ($(submitBtn).hasClass('submit-mobile')) {
    $(submitBtn).parent().addClass('loading');
  }

  $.ajax({
    type: "POST",
    url: '/inquire',
    data: data,
    dataType: 'application/json',
    complete: function () {
      var $btn = $(submitBtn);
      $btn.hasClass('submit-mobile') ? onMobileComplete($btn) : onDesktopComplete($btn);
    }
  });
}

function onMobileComplete ($btn) {
  setTimeout(function () {
    $btn.html('Thanks!');
    $btn.addClass('completed');
    $btn.parent().removeClass('loading');
    $('.inquiry-field').val('');
  }, 1000);
}

function onDesktopComplete ($btn) {
  $btn.removeClass('loading');
  $btn.addClass('completed');

  setTimeout(function () {
    $btn.removeClass('completed');
    $('.inquiry-field').val('');
  }, 1200);
}

$(document).ready(function () {
  makeJoinBtnsInteractive();
  makeInquiryInteractive();
});