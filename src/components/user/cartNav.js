const CartNav = {
    render(page) {
        return /* html */`
        <ul class="flex justify-center items-center">
            <li class="text-2xl px-2 ${page !== "index" ? "hidden md:block" : ""}">
                <a href="/#/cart" class="${page === "index" ? "text-black" : ""} text-gray-400 uppercase transition ease-linear duration-200 hover:text-black">SHOPPING CART</a>
            </li>
            <li class="text-md text-gray-400 px-2 hidden md:block">
                <i class="fas fa-chevron-right"></i>
            </li>
            <li class="text-2xl px-2 ${page !== "checkout" ? "hidden md:block" : ""}">
                <a href="/#/cart-checkout" class="${page === "checkout" ? "text-black" : ""} uppercase text-gray-400 transition ease-linear duration-200 hover:text-black">Checkout details</a>
            </li>
            <li class="text-md text-gray-400 px-2 hidden md:block">
                <i class="fas fa-chevron-right"></i>
            </li>
            <li class="text-2xl px-2 ${page !== "cart-thanks" ? "hidden md:block" : ""}">
                <span class="${page === "cart-thanks" ? "text-black" : ""} uppercase text-gray-400 cursor-default">Order Complete</span>
            </li>
        </ul>
        `;
    },
};

export default CartNav;