document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
    }
});

const messages = [
    "Hola mi amorcitoooo, solamente ocupo que le vayas dando clic a la pantalla, porfaa",
    "Que tal esta mi Belencita lindaaa?❤️",
    "Pues aqui te traigo un regalito que te estaba planeandoo",
    "Puede que tampoco sea la gran cosa, pero este será el primero de muchos",
    "Quiero que sepas que sos lo mejor que tengo en mi vida, bonita",
    "A vos te adoro como no te haces una ideaaaa",
    "Sos una niña demasiado magnífica y especial para mí",
    "Tu corazón jamás tendrá comparación, mucho menos tu bondad hacia los demás",
    "Te lo digo con todo el amor y el orgullo del mundo",
    "Espero que tengas claro, que siempre que te digo que te amo",
    "Absolutamente en todas y cada una de las ocasiones en las que me despido de vos",
    "Todos y cada uno de esos te amo que te digo, vienen desde el fondo de mi corazoncito",
    "Solo espero que te saque una sonrisita con estooo",
    "Esa sonrisita preciosa que me encanta admirar",
    "Esa sonrisita por la que haré lo posible por el resto de mis días para no permitir que desaparezca",
    "Y en estas fechas...",
    "No pensabas que te ibas a quedar sin que te lo pidiera, verdad?",
    "Porque aunque ya sea tu novio, te lo quiero preguntar igual",
    "Maria Belén, quisieras ser mi San Valentín?",
    "Espero q digas que sí JAKSJAJAJA",
    "Tiamo bonita, gracias❤️",
    "Cuidate mucho siempre mi amor!💝"
];

let currentPage = 0;
let isLastPage = false;

function showMessage() {
    $('.message').text(messages[currentPage]);
    
    isLastPage = currentPage === messages.length - 1;
    
    if (isLastPage) {
        $('.next-button').show();
        $('.bg_heart').css('cursor', 'default');
    } else {
        $('.next-button').hide();
        $('.bg_heart').css('cursor', 'pointer');
    }
}

$('.bg_heart').on('click', function() {
    if (!isLastPage) {
        currentPage++;
        showMessage();
    }
});

var love = setInterval(function() {
    var r_num = Math.floor(Math.random() * 40) + 1;
    var r_size = Math.floor(Math.random() * 65) + 10;
    var r_left = Math.floor(Math.random() * 100) + 1;
    var r_bg = Math.floor(Math.random() * 25) + 100;
    var r_time = Math.floor(Math.random() * 5) + 5;
    
    $('.bg_heart').append("<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);animation:love " + r_time + "s ease'></div>");
    
    $('.bg_heart').append("<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%;background:rgba(255," + (r_bg - 25) + "," + (r_bg + 25) + ",1);animation:love " + (r_time + 5) + "s ease'></div>");
    
    $('.heart').each(function() {
        var top = parseFloat($(this).css("top"));
        var width = parseFloat($(this).css("width"));
        if (top <= -100 || width >= 150) {
            $(this).remove();
        }
    });
}, 500);

showMessage();

function clearMusicState() {
    localStorage.removeItem('musicPlaying');
    localStorage.removeItem('musicCurrentTime');
}

window.onload = function() {
    clearMusicState(); 
}

function setupMusic() {
    const music = document.getElementById('backgroundMusic');
    
    if (!localStorage.getItem('initialLoad')) {
        clearMusicState();
        localStorage.setItem('initialLoad', 'true');
        music.currentTime = 0;
    }

    const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
    const musicCurrentTime = localStorage.getItem('musicCurrentTime') || 0;

    if (isMusicPlaying) {
        music.currentTime = parseFloat(musicCurrentTime);
        music.play().catch(error => console.log('Playback failed', error));
    }

    music.addEventListener('play', () => {
        localStorage.setItem('musicPlaying', 'true');
    });

    music.addEventListener('pause', () => {
        localStorage.setItem('musicPlaying', 'false');
    });

    setInterval(() => {
        localStorage.setItem('musicCurrentTime', music.currentTime);
    }, 1000);

    document.addEventListener('click', function startMusic() {
        music.play().catch(error => {
            console.log('Autoplay prevented', error);
        });
        document.removeEventListener('click', startMusic);
    });
}

document.addEventListener('DOMContentLoaded', setupMusic);
