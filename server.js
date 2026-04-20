const express = require('express');
const app = express();
const yookassa = require('yookassa');

app.use(express.json());

const yooKassa = new yookassa({
    shopId: 'your_shop_id',
    secretKey: 'your_secret_key'
});

app.post('/api/process-payment', async (req, res) => {
    try {
        const { items, card } = req.body;

        // Расчёт суммы
        const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Создание платежа через ЮKassa
        const payment = await yooKassa.createPayment({
            amount: {
                value: amount.toFixed(2),
                currency: 'RUB'
            },
            confirmation: {
                type: 'redirect',
                return_url: 'https://yoursite.com/success'
            },
            description: 'Заказ из кафе «Османлы»'
        });

        res.json({ success: true, paymentId: payment.id });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
