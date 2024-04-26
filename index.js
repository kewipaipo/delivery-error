let cart = [];

    function showCart() {
        let overlay = document.getElementById('overlay');
        overlay.style.display = 'flex';
        displayCartItems();
    }

    function closeCart() {
        let overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
    }

    function addToCart(name, price, modification) {
        cart.push({ name: name, price: price, modification: modification });
        displayCartItems();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        displayCartItems();
    }

    function displayCartItems() {
        let cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = '';

        let totalPrice = 0;

        cart.forEach((item, index) => {
            let li = document.createElement('li');
            li.innerHTML = `${item.name} - ${item.modification ? item.modification : 'Без модификации'} - $${item.price}
                            <button onclick="removeFromCart(${index})">Удалить</button>`;
            cartItems.appendChild(li);
            totalPrice += parseFloat(item.price);
        });

        let checkout = document.querySelector('.checkout');
        checkout.innerHTML = `
            <label for="deliveryAddress">Адрес доставки:</label>
            <input type="text" id="deliveryAddress"><br><br>
            <label for="deliveryTime">Время доставки:</label>
            <input type="datetime-local" id="deliveryTime" min="" required><br><br>
            <label for="orderComment">Комментарий к заказу:</label><br>
            <textarea id="orderComment" rows="4" cols="50"></textarea><br><br>
            <p>Итого: $${totalPrice.toFixed(2)}</p>
            <button onclick="placeOrder()">Оформить заказ</button>`;
    }

    function placeOrder() {
        let deliveryAddress = document.getElementById('deliveryAddress').value;
        let deliveryTime = document.getElementById('deliveryTime').value;
        let orderComment = document.getElementById('orderComment').value;

        if (deliveryAddress.trim() === '' || deliveryTime.trim() === '') {
            alert('Пожалуйста, укажите адрес и время доставки.');
            return;
        }

        let orderDetails = {
            items: cart,
            address: deliveryAddress,
            time: deliveryTime,
            comment: orderComment
        };

        console.log(orderDetails); 
        
        alert('Заказ оформлен!');

        cart = [];
        displayCartItems();
        closeCart();
    }

    document.addEventListener("DOMContentLoaded", function() {
        let deliveryTimeInput = document.getElementById('deliveryTime');
        let now = new Date();
        now.setHours(now.getHours() + 1); 
        let minTime = now.toISOString().slice(0, 16); 
        deliveryTimeInput.setAttribute('min', minTime);
    });

    document.querySelectorAll('.addToCart').forEach(item => {
        item.addEventListener('click', event => {
            let name = event.currentTarget.getAttribute('data-name');
            let price = event.currentTarget.getAttribute('data-price');
            let modification = event.currentTarget.parentNode.querySelector('.ingredientSelect').value;
            addToCart(name, price, modification);
        });
    });