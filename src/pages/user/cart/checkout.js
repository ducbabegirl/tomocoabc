import toastr from "toastr";
import $ from "jquery";
import {
    getAllProvince, getDistrict, getDistrictById, getProvinceById, getWard, getWardById,
} from "../../../api/location";
import CartNav from "../../../components/user/cartNav";
import Footer from "../../../components/user/footer";
import Header from "../../../components/user/header";
import { formatCurrency, getUser } from "../../../utils";
import {
    finishOrder, getIdsVoucher, getTotalPrice, totalPriceDerease,
} from "../../../utils/cart";
import { add } from "../../../api/order";
import { update as updateVoucher, get } from "../../../api/voucher";
import { add as addOrderDetail } from "../../../api/orderDetail";
import {
    add as addAddress, getByUserId, get as getAdd, checkAddExits,
} from "../../../api/address";

const CheckoutPage = {
    getTitle() {
        return "Thanh toán - Trà Sữa Yotea";
    },
    async render() {
        const userLogged = getUser();
        const { data: listProvince } = await getAllProvince();

        let listDistrict;
        let listWard;
        if (userLogged && userLogged.provinceCode) {
            listDistrict = await getDistrict(userLogged.provinceCode);
            listWard = await getWard(userLogged.districtCode);
        }

        const cartList = JSON.parse(localStorage.getItem("cart")) || [];
        const voucherList = JSON.parse(localStorage.getItem("voucher")) || [];

        // tổng tiền giảm bởi voucher
        const totalPriceVoucher = totalPriceDerease();

        return /* html */ `
        ${await Header.render()}

        <!-- content -->
        <main>
            <section class="container max-w-6xl mx-auto px-3 mt-10">
                ${CartNav.render("checkout")}
            </section>

            <form action="" id="cart__checkout-form" method="POST" class="container max-w-6xl mx-auto px-3 mt-10 mb-9 grid grid-cols-12 gap-5">
                <div class="col-span-12 lg:col-span-8 border-t-2 pt-3">
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="uppercase text-gray-500 font-semibold text-lg">Thông tin thanh toán</h3>
                        ${userLogged ? /* html */`
                        <button type="button" id="btn-choose-address" class="px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Sử dụng địa chỉ khác</button>
                        ` : ""}
                    </div>
                    
                    <div class="grid grid-cols-12 gap-x-4">
                        <div class="col-span-6 mb-3">
                            <label for="cart__checkout-form-name" class="font-semibold mb-1 block">Họ và tên *</label>
                            <input type="text" id="cart__checkout-form-name" value="${userLogged ? userLogged.fullName : ""}" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Nhập họ tên">
                            <div class="text-sm mt-0.5 text-red-500"></div>
                        </div>
                        <div class="col-span-6 mb-3">
                            <label for="cart__checkout-form-phone" class="font-semibold mb-1 block">Điện thoại *</label>
                            <input type="text" id="cart__checkout-form-phone" value="${userLogged ? userLogged.phone : ""}" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Số điện thoại người nhận hàng">
                            <div class="text-sm mt-0.5 text-red-500"></div>
                        </div>
                        <div class="col-span-12 mb-3">
                            <label for="cart__checkout-form-email" class="font-semibold mb-1 block">Email *</label>
                            <input type="email" id="cart__checkout-form-email" value="${userLogged ? userLogged.email : ""}" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Email người nhận hàng">
                            <div class="text-sm mt-0.5 text-red-500"></div>
                        </div>
                        
                        ${userLogged && userLogged.provinceCode ? /* html */`
                        <div class="col-span-12 md:col-span-4 mb-3 relative">
                            <label for="cart__checkout-province" class="font-semibold mb-1 block">Tỉnh/Thành phố *</label>
                            <select id="cart__checkout-province" class="shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)] hover:shadow-none hover:cursor-default focus:shadow-none focus:cursor-text w-full border px-2 h-10 text-sm outline-none">
                                <option value="">-- Chọn Tỉnh/TP --</option>
                                ${listProvince.map((item) => `<option value="${item.code}" ${userLogged.provinceCode === item.code ? "selected" : ""}>${item.name}</option>`).join("")}
                            </select>
                            <div class="text-sm mt-0.5 text-red-500"></div>
                        </div>
                        <div class="col-span-12 md:col-span-4 mb-3 relative">
                            <label for="cart__checkout-district" class="font-semibold mb-1 block">Quận/Huyện *</label>
                            <select id="cart__checkout-district" class="shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)] hover:shadow-none hover:cursor-default focus:shadow-none focus:cursor-text w-full border px-2 h-10 text-sm outline-none">
                                <option value="">-- Chọn Quận/Huyện --</option>
                                ${listDistrict.map((item) => `<option value="${item.code}" ${userLogged.districtCode === item.code ? "selected" : ""}>${item.name}</option>`).join("")}
                            </select>
                            <div class="text-sm mt-0.5 text-red-500"></div>
                        </div>
                        <div class="col-span-12 md:col-span-4 mb-3 relative">
                            <label for="cart__checkout-ward" class="font-semibold mb-1 block">Xã/Phường *</label>
                            <select id="cart__checkout-ward" class="shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)] hover:shadow-none hover:cursor-default focus:shadow-none focus:cursor-text w-full border px-2 h-10 text-sm outline-none">
                                <option value="">-- Chọn Xã/Phường --</option>
                                ${listWard.map((item) => `<option value="${item.code}" ${userLogged.wardsCode === item.code ? "selected" : ""}>${item.name}</option>`).join("")}
                            </select>
                            <div class="text-sm mt-0.5 text-red-500"></div>
                        </div>
                        ` : /* html */`
                        <div class="col-span-12 md:col-span-4 mb-3 relative">
                            <label for="cart__checkout-province" class="font-semibold mb-1 block">Tỉnh/Thành phố *</label>
                            <select id="cart__checkout-province" class="shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)] hover:shadow-none hover:cursor-default focus:shadow-none focus:cursor-text w-full border px-2 h-10 text-sm outline-none">
                                <option value="">-- Chọn Tỉnh/TP --</option>
                                ${listProvince.map((item) => `<option value="${item.code}">${item.name}</option>`).join("")}
                            </select>
                            <div class="text-sm mt-0.5 text-red-500"></div>
                        </div>
                        <div class="col-span-12 md:col-span-4 mb-3 relative">
                            <label for="cart__checkout-district" class="font-semibold mb-1 block">Quận/Huyện *</label>
                            <select id="cart__checkout-district" class="shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)] hover:shadow-none hover:cursor-default focus:shadow-none focus:cursor-text w-full border px-2 h-10 text-sm outline-none">
                                <option value="">-- Chọn Quận/Huyện --</option>
                            </select>
                            <div class="text-sm mt-0.5 text-red-500"></div>
                        </div>
                        <div class="col-span-12 md:col-span-4 mb-3 relative">
                            <label for="cart__checkout-ward" class="font-semibold mb-1 block">Xã/Phường *</label>
                            <select id="cart__checkout-ward" class="shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)] hover:shadow-none hover:cursor-default focus:shadow-none focus:cursor-text w-full border px-2 h-10 text-sm outline-none">
                                <option value="">-- Chọn Xã/Phường --</option>
                            </select>
                            <div class="text-sm mt-0.5 text-red-500"></div>
                        </div>
                        `}

                        <div class="col-span-12 mb-3">
                            <label for="cart__checkout-form-add" class="font-semibold mb-1 block">Địa chỉ cụ thể *</label>
                            <input type="text" id="cart__checkout-form-add" value="${userLogged ? userLogged.address : ""}" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="VD: Số xx, Ngõ xx, Phú Kiều">
                            <div class="text-sm mt-0.5 text-red-500"></div>
                        </div>

                        ${userLogged ? /* html */`
                        <div class="col-span-12 mb-3 flex items-center">
                            <input type="checkbox" id="cart__checkout-save-address">
                            <label for="cart__checkout-save-address" class="ml-1 block text-md">Lưu thông tin thanh toán?</label>
                        </div>
                        ` : ""}
                    </div>

                    <h3 class="uppercase text-gray-500 font-semibold my-2 text-lg">Thông tin bổ sung</h3>
                    <div class="grid grid-cols-12">
                        <div class="col-span-12 mb-3">
                            <label for="cart__checkout-form-msg" class="font-semibold mb-1 block">Ghi chú đơn hàng (tuỳ chọn)</label>
                            <textarea name="cart__checkout-form-msg" id="cart__checkout-form-msg" cols="30" rows="5" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border p-2 text-sm outline-none" placeholder="Ghi chú về đơn hàng"></textarea>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 lg:col-span-4 border-l p-4 border-2 border-[#D9A953] min-h-40">
                    <h3 class="uppercase text-gray-500 font-semibold mb-3 text-lg">Đơn hàng của bạn</h3>

                    <table class="w-full text-left">
                        <thead>
                            <tr>
                                <th class="uppercase text-gray-500 text-sm pb-1.5 border-b-2">Sản phẩm</th>
                                <th class="uppercase text-gray-500 text-sm pb-1.5 border-b-2 text-right">Tổng</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${cartList.map((item) => /* html */`
                                <tr class="border-b">
                                    <td class="text-sm leading-5 py-3 text-gray-500 pr-1">
                                        <p class="text-base">
                                            <span>${item.productName}</span>
                                            <strong>x ${item.quantity}</strong>
                                        </p>
                                        <p class="uppercase">Đá: ${item.ice}%</p>
                                        <p class="uppercase">Đường: ${item.sugar}%</p>
                                        <p class="uppercase">Size:  ${item.sizeName}</p>
                                        <p class="uppercase">Topping: ${item.toppingId ? item.toppingName : "Không chọn Topping"}</p>
                                    </td>

                                    <td class="py-3 font-semibold text-right pl-1">${formatCurrency((item.productPrice + item.sizePrice + item.toppingPrice) * item.quantity)}</td>
                                </tr>
                                `).join("")}
                        </tbody>

                        <tfoot>
                            <tr class="border-b">
                                <td class="font-semibold text-sm py-2">Tạm tính</td>
                                <td class="font-semibold text-right">${formatCurrency(getTotalPrice())}</td>
                            </tr>

                            ${voucherList.map((item) => /* html */`
                                <tr class="border-b">
                                    <td class="font-semibold text-sm py-2">
                                        Voucher
                                        <strong class="ml-1 mr-2">${item.code}</strong>
                                    </td>
                                    <td class="py-2 text-right font-semibold">- ${item.condition ? formatCurrency(item.conditionNumber) : `${item.conditionNumber}%`}</td>
                                </tr>
                            `)}

                            <tr class="border-b">
                                <td class="font-semibold text-sm py-2">Tổng</td>
                                <td class="font-semibold text-right">${formatCurrency(getTotalPrice() - totalPriceVoucher > 0 ? getTotalPrice() - totalPriceVoucher : 0)}</td>
                            </tr>
                        </tfoot>
                    </table>

                    <button class="mt-4 px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Đặt hàng</button>
                </div>
            </form>
        </main>
        <!-- end content -->

        <div id="modal" class="invisible fixed top-0 right-0 bottom-0 left-0 z-20 flex justify-center items-start">
            <div id="modal__overlay" class="opacity-0 transition-all duration-400 ease-linear absolute top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.6)]"></div>

            <div id="modal__body" class="min-w-[500px] transition-all ease-out duration-500 -translate-y-[calc(100%+56px)] bg-white rounded shadow mt-14 z-20">
                <header class="px-3 py-2 flex justify-between items-center text-lg font-semibold border-b">
                    <h1>Danh sách địa chỉ</h1>

                    <div class="cursor-pointer" id="modal-btn-close">
                        <i class="fas fa-times"></i>
                    </div>
                </header>

                <div class="px-3 py-2">
                    <table class="w-full text-left">
                        <tbody class="grid grid-cols-1 divide-y" id="list-address"></tbody>
                    </table>
                </div>
            </div>
        </div>

        ${Footer.render()}
        `;
    },
    afterRender() {
        Header.afterRender();
        Footer.afterRender();
        const userLogged = getUser();

        const provinceElement = document.querySelector("#cart__checkout-province");
        const districtElement = document.querySelector("#cart__checkout-district");
        const wardElement = document.querySelector("#cart__checkout-ward");
        const formCheckout = document.querySelector("#cart__checkout-form");
        const fullName = formCheckout.querySelector("#cart__checkout-form-name");
        const phone = formCheckout.querySelector("#cart__checkout-form-phone");
        const email = formCheckout.querySelector("#cart__checkout-form-email");
        const address = formCheckout.querySelector("#cart__checkout-form-add");
        const message = formCheckout.querySelector("#cart__checkout-form-msg");

        const validate = () => {
            let isValid = true;

            if (!fullName.value) {
                fullName.nextElementSibling.innerText = "Vui lòng nhập tên người nhận";
                isValid = false;
            } else {
                fullName.nextElementSibling.innerText = "";
            }

            const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
            if (!phone.value) {
                phone.nextElementSibling.innerText = "Vui lòng nhập số điện thoại";
                isValid = false;
            } else if (!regexPhone.test(phone.value)) {
                phone.nextElementSibling.innerText = "Số điện thoại không đúng định dạng";
                isValid = false;
            } else {
                phone.nextElementSibling.innerText = "";
            }

            const regexEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!email.value) {
                email.nextElementSibling.innerText = "Vui lòng nhập email";
                isValid = false;
            } else if (!regexEmail.test(email.value)) {
                email.nextElementSibling.innerText = "Email không đúng định dạng";
                isValid = false;
            } else {
                email.nextElementSibling.innerText = "";
            }

            if (!address.value) {
                address.nextElementSibling.innerText = "Vui lòng nhập địa chỉ";
                isValid = false;
            } else {
                address.nextElementSibling.innerText = "";
            }

            if (!provinceElement.value) {
                provinceElement.nextElementSibling.innerText = "Vui lòng chọn Tỉnh/TP";
                isValid = false;
            } else {
                provinceElement.nextElementSibling.innerText = "";
            }

            if (!districtElement.value) {
                districtElement.nextElementSibling.innerText = "Vui lòng chọn Quận/Huyện";
                isValid = false;
            } else {
                districtElement.nextElementSibling.innerText = "";
            }

            if (!wardElement.value) {
                wardElement.nextElementSibling.innerText = "Vui lòng chọn Xã/Phường";
                isValid = false;
            } else {
                wardElement.nextElementSibling.innerText = "";
            }

            return isValid;
        };

        formCheckout.addEventListener("submit", async (e) => {
            e.preventDefault();

            const isValid = validate();

            if (isValid) {
                const district = districtElement.options[districtElement.selectedIndex].text;
                const province = provinceElement.options[provinceElement.selectedIndex].text;
                const ward = wardElement.options[wardElement.selectedIndex].text;
                const customerAdd = `${address.value}, ${ward}, ${district}, ${province}`;

                const date = new Date();
                const currentUserId = getUser() ? getUser().id : 0;
                const listIdVoucher = getIdsVoucher();

                const orderData = {
                    userId: currentUserId,
                    customer_name: fullName.value,
                    address: customerAdd,
                    phone: phone.value,
                    email: email.value,
                    total_price: getTotalPrice(),
                    price_decrease: totalPriceDerease(),
                    message: message.value,
                    status: 0,
                    voucher: listIdVoucher,
                    createdAt: date.toISOString(),
                    updatedAt: date.toISOString(),
                };

                // lưu id user sử dụng voucher, giảm số lượng voucher
                listIdVoucher.forEach(async (id) => {
                    const { data: curentVoucher } = await get(id);

                    // add id user
                    const userUsed = curentVoucher.user_ids;
                    userUsed.push(currentUserId);
                    curentVoucher.user_ids = userUsed;

                    // giảm quantity
                    // eslint-disable-next-line no-plusplus
                    curentVoucher.quantity--;

                    await updateVoucher(id, curentVoucher);
                });

                // lưu thông tin cart
                const { data } = await add(orderData);
                const orderId = data.id;

                // lưu cart detail
                const cartList = JSON.parse(localStorage.getItem("cart")) || [];
                cartList.forEach(async (cart) => {
                    await addOrderDetail({
                        orderId,
                        productId: cart.productId,
                        productPrice: cart.productPrice,
                        sizeId: cart.sizeId,
                        sizePrice: cart.sizePrice,
                        quantity: cart.quantity,
                        ice: cart.ice,
                        sugar: cart.sugar,
                        toppingId: cart.toppingId,
                        toppingPrice: cart.toppingPrice,
                    });
                });

                // lưu thông tin thanh toán
                const isSaveAdd = document.querySelector("#cart__checkout-save-address:checked");
                if (isSaveAdd) {
                    const currentAddress = {
                        userId: userLogged.id,
                        fullName: fullName.value,
                        phone: phone.value,
                        email: email.value,
                        provinceCode: +provinceElement.value,
                        districtCode: +districtElement.value,
                        wardCode: +wardElement.value,
                        address: address.value,
                    };

                    // check duplicate
                    const isExits = await checkAddExits(currentAddress);
                    if (!isExits) await addAddress(currentAddress);
                }

                // xóa cart khỏi local storage
                finishOrder(() => {
                    toastr.success("Đặt hàng thành công");
                    window.location.href = "/#/cart-thanks";
                });
            }
        });

        // bắt sự kiện chọn tỉnh/tp
        provinceElement.addEventListener("change", async (e) => {
            const provinceCode = e.target.value;

            if (provinceCode) {
                const districtList = await getDistrict(provinceCode);
                let htmlDistrict = `<option value="">-- Chọn Tỉnh/TP --</option>`;
                districtList.forEach((item) => {
                    htmlDistrict += `<option value="${item.code}">${item.name}</option>`;
                });

                districtElement.innerHTML = htmlDistrict;
            }
        });

        // bắt sự kiện chọn quận/huyện
        districtElement.addEventListener("change", async (e) => {
            const districtCode = e.target.value;

            if (districtCode) {
                const wardList = await getWard(districtCode);
                let htmlWard = `<option value="">-- Chọn Xã/Phường --</option>`;
                wardList.forEach((item) => {
                    htmlWard += `<option value="${item.code}">${item.name}</option>`;
                });

                wardElement.innerHTML = htmlWard;
            }
        });

        // xử lý sự kiện chọn địa chỉ
        const renderAddress = async (wardCode, districtCode, provinceCode) => {
            const ward = await getWardById(wardCode);
            const district = await getDistrictById(districtCode);
            const province = await getProvinceById(provinceCode);
            return `${ward.name}, ${district.name}, ${province.name}`;
        };

        const btnAddress = document.querySelector("#btn-choose-address");
        const modal = document.querySelector("#modal");
        const listAddress = document.querySelector("#list-address");
        if (btnAddress) {
            btnAddress.addEventListener("click", async () => {
                const { data: listAdd } = await getByUserId(userLogged.id);
                if (listAdd.length) {
                    let html = "";

                    // eslint-disable-next-line no-restricted-syntax
                    for await (const addressItem of listAdd) {
                        html += `
                        <tr class="hover:bg-gray-100 cursor-pointer address-item" data-id="${addressItem.id}">
                            <td class="p-2">${addressItem.fullName}</td>
                            <td class="p-2">${addressItem.phone}</td>
                            <td class="p-2">${addressItem.address}, ${await renderAddress(addressItem.wardCode, addressItem.districtCode, addressItem.provinceCode)}</td>
                        </tr>
                        `;
                    }
                    listAddress.innerHTML = html;

                    // handle sự kiện click chọn địa chỉ
                    const addressItem = document.querySelectorAll(".address-item");
                    addressItem.forEach(async (row) => {
                        const { id } = row.dataset;

                        row.addEventListener("click", async () => {
                            const { data: addressData } = await getAdd(id);

                            // get ds quận/huyện
                            const listDistrict = await getDistrict(addressData.provinceCode);
                            districtElement.innerHTML = listDistrict.map((item) => `
                                <option value="${item.code}">${item.name}</option>
                                `).join("");

                            // get ds xã/phường
                            const listWard = await getWard(addressData.districtCode);
                            wardElement.innerHTML = listWard.map((item) => `
                                <option value="${item.code}">${item.name}</option>
                                `).join("");

                            fullName.value = addressData.fullName;
                            phone.value = addressData.phone;
                            email.value = addressData.email;
                            address.value = addressData.address;
                            provinceElement.value = addressData.provinceCode;
                            districtElement.value = addressData.districtCode;
                            wardElement.value = addressData.wardCode;

                            modal.classList.remove("active");
                        });
                    });
                }
                modal.classList.add("active");
            });
        }

        // đóng modal
        $("#modal__overlay").on("click", () => modal.classList.remove("active"));
        $("#modal-btn-close").on("click", () => modal.classList.remove("active"));
    },
};

export default CheckoutPage;