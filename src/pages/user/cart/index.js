import Swal from "sweetalert2";
import toastr from "toastr";
import { getByCode } from "../../../api/voucher";
import CartNav from "../../../components/user/cartNav";
import Footer from "../../../components/user/footer";
import Header from "../../../components/user/header";
import { formatCurrency, getUser, reRender } from "../../../utils";
import {
    addVoucher, getTotalPrice, removeItemInCart, removeVoucher, totalPriceDerease, updateQuantity,
} from "../../../utils/cart";

const CartPage = {
    getTitle() {
        return "Giỏ hàng - Trà Sữa Yotea";
    },
    async render() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const voucher = JSON.parse(localStorage.getItem("voucher")) || [];

        // tổng tiền giảm khi áp voucher
        const totalPriceVoucher = totalPriceDerease();

        return /* html */ `
        ${await Header.render()}

        <!-- content -->
        <main>
            <section class="container max-w-6xl mx-auto px-3 mt-10">
                ${CartNav.render("index")}
            </section>

            <section class="container max-w-6xl mx-auto px-3 mt-10 grid grid-cols-12 mb-9">
                ${cart.length ? /* html */`
                <form action="" method="POST" id="cart__detail-form" class="col-span-12 lg:col-span-8 lg:pr-6">
                    <table class="table-auto w-full text-left border-collapse" id="cart__detail">
                        <thead>
                            <tr class="uppercase border-b-2">
                                <th class="pb-1 uppercase text-sm text-gray-500" colspan="3">Sản phẩm</th>
                                <th class="pb-1 uppercase text-sm text-gray-500">Giá</th>
                                <th class="pb-1 uppercase text-sm text-gray-500">Số lượng</th>
                                <th class="pb-1 uppercase text-sm text-gray-500 text-right">Tạm tính</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${cart.map((item) => /* html */`
                                <tr class="border-b cart__detail-item" data-id="${item.id}">
                                    <td>
                                        <button type="button" data-id="${item.id}" class="cart__detail-btn-remove p-2 text-gray-400 text-xl transition ease-linear duration-200 hover:text-black ">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </td>
                                    <td class="p-2">
                                        <a href="/#/product/${item.productId}">
                                            <img class="block w-16 object-cover" src="${item.productImage}" alt="">
                                        </a>
                                    </td>
                                    <td class="p-2">
                                        <a href="/#/product/${item.productId}" class="font-semibold">${item.productName}</a>
                                        <div class="text-sm">
                                            <p>Đá: ${item.ice}%</p>
                                            <p>Đường: ${item.sugar}%</p>
                                            <p>Size: ${item.sizeName}</p>
                                            <p>Topping: ${item.toppingId ? item.toppingName : "Không chọn Topping"}</p>
                                        </div>
                                    </td>
                                    <td class="font-bold">${formatCurrency(item.productPrice + item.sizePrice + item.toppingPrice)}</td>
                                    <td class="p-2">
                                        <div class="flex items-center h-9" id="cart__detail-qnt-wrap">
                                            <button type="button" class="cart__detail-qnt-btn btn-decrease cart__detail-btn-decrease px-2 bg-gray-100 border-gray-200 h-full border-l border-y transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">-</button>
                                            <input type="text" class="cart__detail-qnt border border-gray-200 h-full w-10 text-center outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc]" value="${item.quantity}">
                                            <button type="button" class="cart__detail-qnt-btn btn-increase cart__detail-btn-increase px-2 bg-gray-100 border-gray-200 h-full border-r border-y transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">+</button>
                                        </div>
                                    </td>
                                    <td class="font-bold text-right">${formatCurrency((item.productPrice + item.sizePrice + item.toppingPrice) * item.quantity)}</td>
                                </tr>
                                `).join("")}
                        </tbody>
                    </table>

                    <ul class="flex mt-6 items-center">
                        <li>
                            <a href="/#/products" class="">
                                <button type="button" class="select-none uppercase h-8 text-[#D9A953] font-semibold text-sm border-[#D9A953] border-2 px-3 transition ease-linear duration-300 hover:bg-[#D9A953] hover:text-white">
                                    <i class="fas fa-long-arrow-alt-left"></i>
                                    Tiếp tục xem sản phẩm
                                </button>
                            </a>
                        </li>
                        <li class="ml-2">
                            <button id="btn-cart-update" disabled class="cursor-pointer select-none uppercase bg-[#D9A953] px-3 h-8 font-semibold text-sm text-white transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Cập nhật giỏ hàng</button>
                        </li>
                    </ul>

                </form>

                <div class="mt-8 lg:mt-0 col-span-12 lg:col-span-4 lg:border-l lg:pl-6">
                    <table class="table-fixed w-full text-left">
                        <thead>
                            <tr class="uppercase border-b-2">
                                <th class="pb-1 text-sm text-gray-500" colspan="2">Cộng giỏ hàng</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr class="border-b">
                                <td >Tạm tính</td>
                                <td class="py-2 text-right font-semibold">${formatCurrency(getTotalPrice())}</td>
                            </tr>

                            ${voucher.map((item) => /* html */`
                                <tr class="border-b">
                                    <td>
                                        Voucher
                                        <strong class="ml-1 mr-2">${item.code}</strong>
                                        <button class="btn-remove-voucher" data-id="${item.id}">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </td>
                                    <td class="py-2 text-right font-semibold">- ${item.condition ? formatCurrency(item.conditionNumber) : `${item.conditionNumber}%`}</td>
                                </tr>
                                `).join("")}
                            
                            <tr class="border-b">
                                <td >Tổng</td>
                                <td class="py-2 text-right font-semibold">${formatCurrency(getTotalPrice() - totalPriceVoucher > 0 ? getTotalPrice() - totalPriceVoucher : 0)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <a href="/#/cart-checkout">
                        <button class="mt-4 w-full px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Tiến hành thanh toán</button>
                    </a>
                    
                    <form action="" class="mt-7" id="form__voucher-add">
                        <div class="flex items-center pb-2 font-semibold border-b-2 text-gray-500">
                            <div class="mr-2">
                                <i class="fas fa-tag"></i>
                            </div>
                            Mã giảm giá
                        </div>
                        
                        <input type="text" id="form__voucher-add-control" placeholder="Mã giảm giá" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] my-4 w-full border px-2 h-10 text-sm outline-none">

                        <button class="w-full px-3 py-2 bg-gray-100 border border-gray-300 text-black text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Áp dụng</button>
                    </form>
                </div>
                ` : /* html */`
                <section class="text-center col-span-12 py-12">
                    <p>Chưa có sản phẩm nào trong giỏ hàng</p>

                    <a href="/#/products" class="block mt-4">
                        <button class="uppercase h-8 text-[#D9A953] font-semibold text-sm border-[#D9A953] border-2 px-3 transition ease-linear duration-300 hover:bg-[#D9A953] hover:text-white">
                            <i class="fas fa-long-arrow-alt-left"></i>
                            Tiếp tục mua hàng
                        </button>
                    </a>
                </section>
                `}
            </section>
        </main>
        <!-- end content -->

        ${Footer.render()}
        `;
    },
    afterRender() {
        Header.afterRender();
        Footer.render();

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // nếu có sp trong giỏ hàng
        if (cart.length) {
            const btnUpdateCart = document.querySelector("#btn-cart-update");
            // get parent element
            // eslint-disable-next-line consistent-return
            const getParent = (element, selector) => {
                while (element.parentElement) {
                    if (element.parentElement.matches(selector)) {
                        return element.parentElement;
                    }
                    // eslint-disable-next-line no-param-reassign
                    element = element.parentElement;
                }
            };

            // tăng giảm số lượng
            const btnsQuantity = document.querySelectorAll(".cart__detail-qnt-btn");

            btnsQuantity.forEach((btn) => {
                btn.addEventListener("click", () => {
                    btnUpdateCart.removeAttribute("disabled");
                    const quantityWrap = getParent(btn, "#cart__detail-qnt-wrap");
                    const qntElement = quantityWrap.querySelector(".cart__detail-qnt");

                    if (btn.classList.contains("btn-decrease")) {
                        if (+qntElement.value) qntElement.value -= 1;
                    } else if (btn.classList.contains("btn-increase")) {
                        qntElement.value = +qntElement.value + 1;
                    }
                });
            });

            // xóa sp
            const btnsRemove = document.querySelectorAll(".cart__detail-btn-remove");
            btnsRemove.forEach((btn) => {
                const { id } = btn.dataset;

                btn.addEventListener("click", () => {
                    Swal.fire({
                        title: "Bạn có chắc chắn muốn xóa không?",
                        text: "Bạn không thể hoàn tác sau khi xóa!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            removeItemInCart(id, () => {
                                toastr.success("Xóa sản phẩm thành công");
                                reRender(CartPage, "#app");
                            });
                        }
                    });
                });
            });

            // cập nhật số lượng sp
            const cartForm = document.querySelector("#cart__detail-form");
            const trElements = cartForm.querySelectorAll(".cart__detail-item");
            cartForm.addEventListener("submit", (e) => {
                e.preventDefault();

                const cartQuantity = Array.from(trElements).map((item) => ({
                    id: item.dataset.id,
                    quantity: +item.querySelector(".cart__detail-qnt").value,
                }));

                updateQuantity(cartQuantity, () => {
                    toastr.success("Cập nhật giỏ hàng thành công");
                    reRender(CartPage, "#app");
                });
            });

            cartForm.addEventListener("input", () => btnUpdateCart.removeAttribute("disabled"));

            // add voucher
            const formAddVoucher = document.querySelector("#form__voucher-add");
            const voucherElement = formAddVoucher.querySelector("#form__voucher-add-control");
            formAddVoucher.addEventListener("submit", async (e) => {
                e.preventDefault();

                const userLogged = getUser();

                if (userLogged) {
                    if (!voucherElement.value) {
                        toastr.info("Vui lòng nhập mã Voucher");
                    } else {
                        const voucherCode = voucherElement.value.toUpperCase();
                        // check voucher
                        const { data } = await getByCode(voucherCode);

                        if (!data.length) {
                            toastr.info("Mã voucher không tồn tại");
                        } else {
                            const [voucherData] = data;
                            const timeStart = new Date(voucherData.timeStart);
                            const timeEnd = new Date(voucherData.timeEnd);

                            const now = new Date();

                            if (timeStart > now) {
                                toastr.info("Voucher chưa đến thời gian sử dụng");
                            } else if (timeEnd < now) {
                                toastr.info("Voucher đã quá hạn sử dụng");
                            } else if (!voucherData.quantity) {
                                toastr.info("Voucher đã hết lượt sử dụng");
                            } else if (!voucherData.status) {
                                toastr.info("Voucher đã bị khóa");
                            } else {
                                // check user đã sử dụng voucher chưa

                                const listIdUsed = voucherData.user_ids;

                                const isUsed = listIdUsed.some((id) => id === userLogged.id);
                                if (isUsed) {
                                    toastr.info("Bạn đã sử dụng Voucher này trước đó");
                                } else {
                                    addVoucher(voucherData, () => {
                                        reRender(CartPage, "#app");
                                    });
                                }
                            }
                        }
                    }
                } else {
                    toastr.info("Vui lòng đăng nhập để sử dụng Voucher");
                }
            });

            // remove voucher
            const btnsRemoveVoucher = document.querySelectorAll(".btn-remove-voucher");
            btnsRemoveVoucher.forEach((btn) => {
                const { id } = btn.dataset;

                btn.addEventListener("click", () => {
                    removeVoucher(+id, () => reRender(CartPage, "#app"));
                });
            });
        }
    },
};

export default CartPage;