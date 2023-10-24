const CartLabel = {
    render() {
        const cartList = JSON.parse(localStorage.getItem("cart")) || [];

        return /* html */`
        <a href="/#/cart" class="relative">
            <label for="" class="absolute w-4 h-4 bg-green-700 text-xs text-center rounded-full -right-3 -top-1">${cartList.length}</label>
            <i class="fas fa-shopping-cart"></i>
        </a>
        `;
    },
};

export default CartLabel;