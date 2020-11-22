  var canvas = null;
  var canvasPosition = null;
  var context = null;

  var pixels = null;


  function initPixels()
  {
    pixels = [];
    for (var i = 0; i < 60; ++i) {
      var row = [];
      for (var j = 0; j < 80; ++j) {
        row.push(0);
      }
      pixels.push(row);
    }
    for (var j = 0; j < 80; ++j) {
      pixels[59][j] = 383;
    }
  }

  function randomizeBottomRow()
  {
    for (var j = 0; j < 80; ++j) {
      pixels[59][j] += Math.random() * 300 - 150;
      if (pixels[59][j] < 0) {
        pixels[59][j] = 0;
      }
      if (pixels[59][j] > 765) {
        pixels[59][j] = 765;
      }
    }
  }

  function updatePixels()
  {
    for (var i = 58; i >= 0; --i) {
      for (var j = 1; j < 79; ++j) {
        pixels[i][j] = (pixels[i][j] + pixels[i + 1][j - 1] + pixels[i + 1][j] + pixels[i + 1][j + 1]) / 4.05;
      }
    }
  }

  function drawPixels()
  {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < 60; ++i) {
      for (var j = 0; j < 80; ++j) {
        var intensity = Math.floor(pixels[i][j]);
        if (intensity < 255) {
          context.fillStyle = "rgb(0, 0, " + intensity + ")";
        }
        else if (intensity < 510) {
          context.fillStyle = "rgb(0, " + (intensity - 255) + ", 255)";
        }
        else {
          context.fillStyle = "rgb(" + (intensity -510) + ", 255,  255)";
        }
        context.fillRect(j * 10, i * 10, 10, 10);
      }
    }
  }

  function timerEvent()
  {
    randomizeBottomRow();
    updatePixels();
    drawPixels();
  }

  function initialize()
  {
    canvas = document.getElementById("canvas");
    canvasPosition = canvas.getBoundingClientRect();
    context = canvas.getContext("2d");
    initPixels();
    window.setInterval(timerEvent, 100);
  }
