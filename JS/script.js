document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const cartToggle = document.getElementById('cartToggle');
    const closeCart = document.getElementById('closeCart');
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Корзина
    let cart = [];

    // Открытие/закрытие корзины
    cartToggle.addEventListener('click', function() {
        cartModal.style.display = 'flex';
        updateCartDisplay();
    });

    closeCart.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    // Закрытие корзины при клике вне её области
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Добавление товара в корзину
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            const itemName = this.getAttribute('data-name');
            const itemPrice = parseFloat(this.getAttribute('data-price'));

            // Проверяем, есть ли товар уже в корзине
            const existingItem = cart.find(item => item.id === itemId);

            if (existingItem) {
                // Если есть — увеличиваем количество
                existingItem.quantity += 1;
            } else {
                // Если нет — добавляем новый товар
                cart.push({
                    id: itemId,
            name: itemName,
            price: itemPrice,
            quantity: 1
        });
            }

            // Обновляем отображение корзины
            updateCartDisplay();

            // Показываем уведомление о добавлении
            showNotification(`«${itemName}» добавлен в корзину!`);
        });
    });

    // Обновление отображения корзины
    function updateCartDisplay() {
        // Очищаем содержимое корзины
        cartItems.innerHTML = '';

        // Если корзина пуста
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Корзина пуста</p>';
            cartCount.textContent = '0';
            cartTotal.textContent = '0';
            return;
        }

        let total = 0;
        let count = 0;

        // Проходим по всем товарам в корзине
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            count += item.quantity;

            // Создаём элемент для товара в корзине
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
            <p>${item.price} тенге × ${item.quantity} = ${itemTotal} тенге</p>
        </div>
        <div class="cart-item-actions">
            <button class="quantity-btn decrease" data-id="${item.id}">−</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn increase" data-id="${item.id}">+</button>
            <button class="remove-btn" data-id="${item.id}">Удалить</button>
        </div>
    `;
            cartItems.appendChild(cartItemElement);
        });

        // Обновляем счётчик и итоговую сумму
        cartCount.textContent = count;
        cartTotal.textContent = total;

        // Добавляем обработчики событий для кнопок изменения количества и удаления
        addCartItemEventListeners();
    }

    // Добавление обработчиков для элементов внутри корзины
    function addCartItemEventListeners() {
        // Кнопки увеличения количества
        document.querySelectorAll('.quantity-btn.increase').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                const item = cart.find(item => item.id === itemId);
                if (item) {
                    item.quantity += 1;
                    updateCartDisplay();
                }
            });
        });

        // Кнопки уменьшения количества
        document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                const item = cart.find(item => item.id === itemId);
                if (item && item.quantity > 1) {
                    item.quantity -= 1;
                    updateCartDisplay();
                } else if (item && item.quantity === 1) {
                    // Если количество 1, то удаляем товар
                    removeFromCart(itemId);
                }
            });
        });

        // Кнопки удаления товара
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                removeFromCart(itemId);
            });
        });
    }

    // Удаление товара из корзины
    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        updateCartDisplay();
    }

    // Кнопка оформления заказа
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Корзина пуста!');
            return;
        }
        alert(`Заказ оформлен на сумму ${cartTotal.textContent} тенге! Спасибо за покупку.`);
        // Очистка корзины после оформления
        cart = [];
        updateCartDisplay();
    });

    // Функция показа уведомления
    function showNotification(message) {
        // Создаём элемент уведомления
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1abc9c;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 3000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            transition: opacity 0.5s;
        `;
        document.body.appendChild(notification);

        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Элементы модального окна «О нас»
    const aboutBtn = document.getElementById('aboutBtn');
    const aboutModal = document.getElementById('aboutModal');
    const closeAbout = document.getElementById('closeAbout');

    // Открытие модального окна при нажатии на кнопку
    aboutBtn.addEventListener('click', function() {
        aboutModal.style.display = 'block';
    });

    // Закрытие модального окна при нажатии на крестик
    closeAbout.addEventListener('click', function() {
        aboutModal.style.display = 'none';
    });

    // Закрытие модального окна при клике вне его области
    window.addEventListener('click', function(event) {
        if (event.target === aboutModal) {
            aboutModal.style.display = 'none';
        }
    });

    // Дополнительно: закрытие по клавише ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && aboutModal.style.display === 'block') {
            aboutModal.style.display = 'none';
        }
    });
});
function validateCardData(number, month, year, cvv) {
    // Проверка номера карты (16 цифр)
    if (!/^\d{16}$/.test(number)) {
        alert('Введите корректный номер карты (16 цифр)');
        return false;
    }

    // Проверка срока действия
    if (!month || !year) {
        alert('Выберите месяц и год истечения срока действия карты');
        return false;
    }

    // Проверка CVV (3 цифры)
    if (!/^\d{3}$/.test(cvv)) {
        alert('Введите корректный CVV-код (3 цифры)');
        return false;
    }

    // Дополнительная проверка срока действия: не должен быть в прошлом
    const currentDate = new Date();
    const cardExpiry = new Date(parseInt(year), parseInt(month) - 1);

    if (cardExpiry < currentDate) {
        alert('Срок действия карты истёк');
        return false;
    }

    return true;
}
document.addEventListener('DOMContentLoaded', function() {
    const yearSelect = document.getElementById('expYear');
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year <= currentYear + 10; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
    document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');

            // Получаем категорию из data‑атрибута
            const category = this.getAttribute('data-category');

            // Фильтруем товары
            filterMenuItems(category);
        });
    });

    // Функция фильтрации товаров
    function filterMenuItems(category) {
        menuItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Инициализация: показываем все товары при загрузке
    filterMenuItems('all');
});
});
