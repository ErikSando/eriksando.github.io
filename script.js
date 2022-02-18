let projectDivs = document.getElementsByTagName('project-div');

for (let i = 0; i < projectDivs.length; i++) {
    projectDivs[i].onclick = function () {
        console.log('cleck')
    }
}