document.getElementById('play').onclick = () => {
    let music = new Audio('assets/sounds/Music.wav');
    music.loop = 'loop';
    music.autoplay = 'autoplay';

    music.play()
}