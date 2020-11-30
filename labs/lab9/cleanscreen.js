$(document).ready(function () {
  let animationIntervalId = null;
  let circles = $("#circles");

  $('#btnStart').on('click', () => {
    circles.empty();

    for (let i = 0; i < parseInt($('#noOfCircles').val()); i++) {
      let circle = $("<div id=" + "'circle" + i + "'" + " class='circle'>Circular <br /> Div</div>");
      let pos = randPosition();
      let color = randColor();
      circle.css(
        {
          width: $('#width').val() + 'px',
          height: $('#width').val() + 'px',
          backgroundColor: color
        });
      circle.offset(
        {
          top: (pos.x + i),
          left: (pos.y + i)
        }
      );

      const animationIntervalId = startAminatingCircles(circle);

      circle.on('click', () => {
        clearInterval(animationIntervalId);
        circle.remove();
      });

      circles.append(circle);
    }
  });

  function startAminatingCircles(objCircle) {
    animationIntervalId = setInterval(
      () => {
        objCircle.css({
          width: (objCircle.width() + parseInt($('#amount').val())) + 'px',
          height: (objCircle.height() + parseInt($('#amount').val())) + 'px',
        });
        objCircle.offset({
          top: objCircle.offsetX,
          left: objCircle.offsetY
        });

        objCircle.html(
          "width: " + objCircle.width() + "<br />" +
          "height: " + objCircle.height() + "<br /> " +
          "background: " + objCircle.css("background-color")
        );
      }
      , parseInt($('#rate').val())
    );
    return animationIntervalId;
  }

  $('#btnClear').on('click', () => {
    circles.children().each((i, e) => {
      $(e).click();
    });
  });

  function randPosition() {
    const posx = (Math.random() * (Math.random() * 10 + 50)).toFixed();
    const posy = (Math.random() * (Math.random() * 10 + 50)).toFixed();
    return {
      x: posx,
      y: posy
    };
  }

  function randColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});
