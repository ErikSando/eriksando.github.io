let newSave;
let loadSave;

window.onload = () => {
    newSave = document.getElementById('new-save');
    loadSave = document.getElementById('load-save');

    newSave.onclick = () => {
        startGame(true);
    }

    loadSave.onclick = () => {
        if (window.localStorage.getItem('save')) return startGame();
        
        loadSave.innerHTML = 'No Save!';
        
        setTimeout(() => {
            loadSave.innerHTML = 'Load Game'
        }, 1000);
    }
}