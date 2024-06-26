let orders = [
    { id: 1, status: "отправляется" },
    { id: 2, status: "отправляется" },
    { id: 3, status: "отправляется" }
];

function displayOrders() {
    const orderList = document.getElementById("orderList");
    orderList.innerHTML = "";
    orders.forEach(order => {
        const li = document.createElement("li");
        li.className = "orderItem";
        li.innerHTML = `Заказ ${order.id} - Статус: ${order.status}`;
        if (order.status === "отправляется") {
            const startButton = document.createElement("button");
            startButton.textContent = "начинает готовиться";
            startButton.addEventListener("click", () => startCooking(order.id));
            li.appendChild(startButton);
        } else if (order.status === "готовится") {
            const waitForCourierButton = document.createElement("button");
            waitForCourierButton.textContent = "ожидает курьера";
            waitForCourierButton.addEventListener("click", () => waitForCourier(order.id));
            li.appendChild(waitForCourierButton);
        }
        orderList.appendChild(li);
    });
}

function startCooking(orderId) {
    const order = orders.find(order => order.id === orderId);
    if (order) {
        order.status = "готовится";
        displayOrders();
    }
}

function waitForCourier(orderId) {
    const order = orders.find(order => order.id === orderId);
    if (order) {
        order.status = "ожидает курьера";
        displayOrders();
    }
}

function init() {
    displayOrders();
}

init();
