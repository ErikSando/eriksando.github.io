let projectDivs = document.getElementsByClassName('project-div');

for (let i = 0; i < projectDivs.length; i++) {
    projectDivs[i].addEventListener('click', function () {
        window.location = projectDivs[i].src;
    });
}