// thêm
export const addToCart = (newProduct, next) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // eslint-disable-next-line max-len
    const exitsProduct = cart.find((item) => item.productId === newProduct.productId && item.sizeId === newProduct.sizeId && item.toppingId === newProduct.toppingId && item.ice === newProduct.ice && item.sugar === newProduct.sugar);

    if (!exitsProduct) {
        cart.push(newProduct);
    } else {
        exitsProduct.quantity += +newProduct.quantity;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    next();
};

// xóa sp khỏi giỏ hàng
export const removeItemInCart = (cartId, next) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== cartId);
    localStorage.setItem("cart", JSON.stringify(cart));

    next();
};

// cập nhật số lượng
export const updateQuantity = (listQuantity, next) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    listQuantity.forEach((cartItem) => {
        if (!cartItem.quantity) {
            cart = cart.filter((item) => item.id !== cartItem.id);
        } else {
            const currentProduct = cart.find((item) => item.id === cartItem.id);
            currentProduct.quantity = cartItem.quantity;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    });

    next();
};

// tính tổng tiền
export const getTotalPrice = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;

    if (cart.length) {
        totalPrice = cart.reduce((total, item) => {
            // eslint-disable-next-line no-param-reassign
            total += (item.productPrice + item.sizePrice + item.toppingPrice) * item.quantity;
            return total;
        }, 0);
    }

    return totalPrice;
};
