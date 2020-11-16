let showProduct = document.getElementById('show');
let productItem = document.getElementById('product');

productItem.addEventListener('click', show);

function show(){

    showProduct.classList.add('show-product');
}

