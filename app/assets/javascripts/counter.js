$(document).ready(function () {

  var addCommasToInt = function (intNum) {
    return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  };

  var $tacoCounter = $('#tacos > .val');
  var $moneyCounter = $('#money > .val > span');

  if ($tacoCounter[0] && $moneyCounter[0]) {
    var tacosPerSec = 1055/60;
    var interval = (1/tacosPerSec) * 1000;
    var dollarsPerTaco = 0.5;
    var currentRev, newRev, newCents, newDollars;

    setInterval(function () {
      currentRev = parseFloat($moneyCounter.html().replace(/,/g, ''));
      newRev = (currentRev + dollarsPerTaco).toFixed(2);
      newCents = newRev.substr(newRev.length - 2);
      newDollars = addCommasToInt(parseInt(newRev));

      $tacoCounter.html(addCommasToInt(parseInt($tacoCounter.html().replace(/,/g, '')) + 1));
      $moneyCounter.html(newDollars + '.' + newCents);
    }, interval);

    console.log('That\'s a lot of tacos!');
  }
});