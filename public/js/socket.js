$(function() {
  var socket = io.connect();
    var socket = io();


    socket.on('connect', function() {
      // Connected, let's sign-up for to receive messages for player room
      console.log("conected");
    });
    socket.on('controlls', function(msg) {
      if(msg =='play'){
        player.play();
      }else if (msg == 'pause'){
        player.pause();
      }else if (msg == 'restart'){
        player.pause();
        player.currentTime(0);
      }else if (msg == 'rewind'){
        player.pause();
        var position = player.currentTime() - 10;
        player.currentTime(position);
      }else if(msg =='reposition'){
        var canvas = player.getChild('canvas');
        canvas.lat = 0;
        canvas.lon = 0;
        console.log('reposition');
      }else if(msg =='fullscreen'){
        if (!player.isFullscreen()) {
            //set to fullscreen
            player.isFullscreen(true);
            player.enterFullWindow();
            resizeFn();
            window.addEventListener("devicemotion", resizeFn);
        } else {
            player.isFullscreen(false);
            player.exitFullWindow();
            player.el().style.width = "";
            player.el().style.height = "";
            canvas.handleResize();
            window.removeEventListener("devicemotion", resizeFn);
        }
      }else if(msg =='volume-off'){
        if(player.muted()){
          player.muted(false);
        }else{
          player.muted(true);
        }
      }else if(msg =='volume-up'){
        var a = player.volume();
        a = a + 0.1;
        player.volume(a);
      }else if(msg =='volume-down'){
        var a = player.volume();
        a = a - 0.1;
        player.volume(a);
      }
      console.log(msg);
    });

  });
