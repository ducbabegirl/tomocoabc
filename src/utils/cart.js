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

// add voucher
export const addVoucher = (voucherItem, next) => {
    const voucher = JSON.parse(localStorage.getItem("voucher")) || [];

    const isExits = voucher.some((item) => item.id === voucherItem.id);

    if (!isExits) {
        voucher.push(voucherItem);
        localStorage.setItem("voucher", JSON.stringify(voucher));
    }

    next();
};

// xóa voucher
export const removeVoucher = (id, next) => {
    let voucher = JSON.parse(localStorage.getItem("voucher")) || [];

    voucher = voucher.filter((item) => item.id !== id);
    localStorage.setItem("voucher", JSON.stringify(voucher));

    next();
};

// tính tổng tiền giảm bởi voucher
export const totalPriceDerease = () => {
    const voucher = JSON.parse(localStorage.getItem("voucher")) || [];

    const totalCartPrice = getTotalPrice();

    let totalDecrease = 0;
    voucher.forEach((item) => {
        if (item.condition) {
            totalDecrease += item.conditionNumber;
        } else {
            totalDecrease += totalCartPrice * (item.conditionNumber / 100);
        }
    });

    return totalDecrease;
};

// lấy ds id voucher
export const getIdsVoucher = () => {
    const voucher = JSON.parse(localStorage.getItem("voucher")) || [];

    let voucherIds = [];

    if (voucher.length) {
        voucherIds = voucher.map((item) => item.id);
    }

    return voucherIds;
};

export const finishOrder = (next) => {
    localStorage.removeItem("cart");
    localStorage.removeItem("voucher");

    next();
};