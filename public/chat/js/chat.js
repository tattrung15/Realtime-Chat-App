var socket = io();
var audio = new Audio('/chat/sound/rington.mp3');
const resultShow = document.getElementById('result');

socket.on('socket-send-room', (data) => {
    $('#room-id').html(data.data);
    $('#num-of-room').html('<img src="/chat/icon/online.png" style="width: 21px; height: 17px;" /> Online: ' + data.numOfOnline);
});

socket.on('server-send-num-in-room', (data) => {
    $('#num-of-room').html('<img src="/chat/icon/online.png" style="width: 21px; height: 17px;" /> Online: ' + data);
});

socket.on('server-send-message', (data) => {
    audio.play();
    $('#wrapper-message').append('<div class="mt-3 mb-3 message-content-receive d-flex"><p class="message-item-receive ml-2 mr-3">' + data + '</p></div>');
    $('html, body').animate({ scrollTop: $('#wrapper-message').height() }, 0);
});

socket.on('socket-typing', () => {
    $('#typing').removeClass('d-none');
});

socket.on('socket-stop-typing', () => {
    $('#typing').addClass('d-none');
});

socket.on('server-send-image', (data) => {
    if(document.getElementById('img-item')){
        resultShow.removeChild(document.getElementById('img-item'));
    }

    let img = document.createElement('img');
    img.id = 'img-item';
    img.src = data.path;
    img.style.width = '100%';
    img.style.marginTop = '20px';
    resultShow.appendChild(img);
    audio.play();
});

$(document).ready(function () {

    if($('#message').val() !== ''){
        $("#btnSend").attr('disabled', false);
    } else {
        $("#btnSend").attr('disabled', true);
    }
    
    if($('#roomId').val() !== ''){
        $("#btnJoinRoom").attr('disabled', false);
    } else {
        $("#btnJoinRoom").attr('disabled', true);
    }

    $('#btnJoinRoom').click(() => {
        $('#input-room').addClass('d-none');
        $('#out-room').removeClass('d-none');
        alert('Welcome to room: ' + $('#roomId').val());
        $('#main-container').removeClass('bgImg');
        $('.noti-enter-room').addClass('d-none');

        socket.emit('client-send-roomId', $('#roomId').val());
    });

    $('#btnOutRoom').click(() => {
        $('#input-room').removeClass('d-none');
        $('#out-room').addClass('d-none');
        alert('See you again!');
        $('#main-container').addClass('bgImg');

        $('.noti-enter-room').removeClass('d-none');
        socket.emit('client-out-roomId', $('#room-id').html());

        $('#roomId').val('');
        $("#btnJoinRoom").attr('disabled', true);
    });

    $('#btnSend').click(() => {
        $('#wrapper-message').append('<div class="mt-3 mb-3 message-content d-flex"><p class="message-item ml-3 mr-2">' + $('#message').val() + '</p></div>');
        $('html, body').animate({ scrollTop: $('#wrapper-message').height() }, 0);
        
        socket.emit('client-send-message', document.getElementsByTagName('span')[0].innerText + ": " + $('#message').val());
        $('#message').val('');
        $("#btnSend").attr('disabled', true);
    });

    $('#message').keydown((event) => {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13' && message.value !== ''){
            $('#wrapper-message').append('<div class="mt-3 mb-3 message-content d-flex"><p class="message-item ml-3 mr-2">' + $('#message').val() + '</p></div>');
            $('html, body').animate({ scrollTop: $('#wrapper-message').height() }, 0);
            
            socket.emit('client-send-message', document.getElementsByTagName('span')[0].innerText + ": " + $('#message').val());
            $('#message').val('');
            $("#btnSend").attr('disabled', true);
        }
    });

    $('#message').focusin(() => {
        socket.emit('typing');
    })

    $('#message').focusout(() => {
        socket.emit('stop-typing');
    });

    message.oninput = function(){
        if(message.value === ''){
            $("#btnSend").attr('disabled', true);
        } else {
            $("#btnSend").attr('disabled', false);
        }
    };

    roomId.oninput = function(){
        if(roomId.value === ''){
            $("#btnJoinRoom").attr('disabled', true);
        } else {
            $("#btnJoinRoom").attr('disabled', false);
        }
    };
});

function showFile(input){
    
    if(document.getElementById('img-item')){
        resultShow.removeChild(document.getElementById('img-item'));
    }

    let reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.onload = (event) => {
        let img = document.createElement('img');
        img.id = 'img-item';
        img.src = event.target.result;
        img.style.width = '100%';
        img.style.marginTop = '20px';
        resultShow.appendChild(img);

        socket.emit('client-send-image', {
            base64: event.target.result
        });
    }
}