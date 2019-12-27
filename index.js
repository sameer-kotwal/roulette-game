

var startAngle = 0;
var arc = 2 * Math.PI / 50;
var ctx;

var startAngle = 0;

var spinTimeout = null;

var spinAngleStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;


function drawRouletteWheel() {

  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {

    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 125;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.font = 'bold 13px Helvetica, Arial';

    for (var i = 0; i < 50; i++) {

      var angle = startAngle + i * arc;
      if (i % 2 == 0 && i != 0) {
        ctx.fillStyle = "black";
      } // write ternary operators later
      else if (i == 0) {
        ctx.fillStyle = "green";
      } else {
        ctx.fillStyle = "red";
      }


      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();
      ctx.save();

      // part 2..


      if (i % 2 == 0) {
        ctx.fillStyle = "white";
      } // write ternary operators later
      else {
        ctx.fillStyle = "black";
      }

      // ctx.fillStyle = "white";
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
        250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = i;

      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();

    }

    //Arrow
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();

  }
}

function spin() {

 spinAngleStart = Math.random() * 4 + 10;
 spinTime = 0;
 spinTimeTotal = Math.random() * 3 + (Math.random() * 5) * 1000;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30; // also speed
  if (spinTime >= spinTimeTotal) {
    console.log("start angle "+startAngle + " radian");
    stopRotateWheel();
    return;
  }

   var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);


  startAngle += (spinAngle * Math.PI / 180);

  drawRouletteWheel();
  spinTimeout = setTimeout('rotateWheel()', 50);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);

  var audio =new Audio('sound.mp3');
  audio.play();
  var degrees = startAngle * 180 / Math.PI + 90;

  console.log(degrees);

  var arcd = arc * 180 / Math.PI; // angle in deg
  console.log("arc in deg is "+arcd);

  var index = Math.floor((360 - degrees % 360) / arcd);

  console.log("index is "+index)
  ctx.save();
  ctx.font = 'bold 30px Helvetica, Arial';
  var text = index;
  ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
  ctx.restore();
}



function easeOut(t, b, c, d) { //acceleration until halfway, then deceleration

  /*
  t = current time
  b = start value
  c = change in value
  d = duration */

  t /= d / 2;
  if (t < 1) {
    return c / 2 * t * t + b;
  }
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;

}

drawRouletteWheel();
