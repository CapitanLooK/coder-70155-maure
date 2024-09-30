const socket = io();

document.getElementById('addProductForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData.entries());
    fetch('/addProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
});

document.getElementById('deleteProductForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData.entries());
    fetch('/deleteProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
});

socket.on('productAdded', function(product) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `<h2>${product.name}</h2><p>${product.description}</p><p>${product.price}</p><p>${product.stock}</p>`;
    document.getElementById('products').appendChild(productDiv);
});

socket.on('productDeleted', function(name) {
    const productsDiv = document.getElementById('products');
    const productDivs = productsDiv.getElementsByClassName('product');
    for (let productDiv of productDivs) {
        if (productDiv.querySelector('h2').innerText === name) {
            productsDiv.removeChild(productDiv);
            break;
        }
    }
});