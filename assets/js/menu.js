btnMenu = document.getElementById('toggle-menu');
showHideMenu = document.getElementById('menu');

function showMenu(){
    showHideMenu.classList.toggle('is-active');
}

btnMenu.addEventListener('click', showMenu);