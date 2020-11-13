let botones = document.getElementsByClassName('openModal');
let modal = document.getElementById('idModal');
let modal2 = document.getElementById('idModal2');
let btnClose = document.getElementById('closeModal');
let btnClose2 = document.getElementById('closeModal2');

for(var i =0; i < botones.length; i++)
{

    console.log(botones[i].id)
    botones[i].addEventListener('click', showModal);
    btnClose.addEventListener('click', closeModal);
    btnClose2.addEventListener('click', closeModal);

}

function showModal(event){
    console.log(event.toElement.id)
    if(event.toElement.id === "btnRegistro"){
        modal.classList.add('showModal');
    }
    else{
        modal2.classList.add('showModal');
    }
}

function closeModal(){
    modal.classList.remove('showModal');
    modal2.classList.remove('showModal');
}


/* 



let btnModal = document.querySelector('.openModal');
let botones = document.getElementsByClassName('openModal');
let modal = document.getElementById('idModal');
let modal2 = document.getElementById('idModal2');
let btnClose = document.getElementById('closeModal');

console.log(btnModal)
console.log(modal)
console.log(modal2)
console.log(document.getSelection())

function showModal(){
   modal.classList.add('showModal');
   //modal2.classList.add('showModal');
}
function closeModal(){
    modal.classList.remove('showModal');
    //modal2.classList.remove('showModal');
}

btnModal.addEventListener('click', showModal);
btnClose.addEventListener('click', closeModal)
*/