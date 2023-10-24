/* eslint-disable no-nested-ternary */
import Swal from "sweetalert2";
import { get, update } from "../../../api/order";
import Footer from "../../../components/user/footer";
import Header from "../../../components/user/header";
import MyAccNav from "../../../components/user/myAccNav";
import { formatCurrency, formatDate } from "../../../utils";
import { get as getCartDetail } from "../../../api/orderDetail";
import { get as getVoucher } from "../../../api/voucher";

const MyAccCartDetailsPage = {
    getTitle(id) {
        return `Chi tiết đơn hàng #${id} - Trà Sữa Yotea`;
    },
    async render(id) {
        const { data: cartData } = await get(id);
        const { data: cartDetails } = await getCartDetail(id);

        let voucherText = "";
        const renderVoucher = async () => {
            if (cartData.voucher.length) {
                // eslint-disable-next-line no-restricted-syntax
                for await (const voucherItem of cartData.voucher) {
                    const { data: voucher } = await getVoucher(voucherItem);

                    voucherText += `${voucher.code} (Giảm ${voucher.condition ? formatCurrency(voucher.conditionNumber) : `${voucher.conditionNumber}%`}), `;
                }
            }

            voucherText = voucherText.slice(0, -2);
        };
        await renderVoucher();

        return /* html */ `
        ${await Header.render()}

        <!-- content -->
        <main>
            <section class="py-7 bg-gray-100 border-b">
                <div class="container max-w-6xl mx-auto px-3 text-gray-500">
                    <h1 class="uppercase font-semibold text-2xl">My account</h1>
                    <p class="text-sm mt-1 uppercase">CHI TIẾT ĐƠN HÀNG</p>
                </div>
            </section>

            <section class="container max-w-6xl mx-auto px-3 grid grid-cols-12 gap-5 my-8">
                ${MyAccNav.render("cart")}

                <div class="col-span-12 lg:col-span-9">
                    <section class="flex justify-between items-center">
                        <div>
                            Đơn hàng #<mark>${cartData.id}</mark> đặt lúc <mark>${formatDate(cartData.createdAt)}</mark> hiện tại <mark>${cartData.status === 0 ? "Đang chờ xác nhận" : cartData.status === 1 ? `Đã xác nhận lúc ${formatDate(cartData.updatedAt)}` : cartData.status === 2 ? `Đang giao hàng lúc ${formatDate(cartData.updatedAt)}` : cartData.status === 3 ? `Đã giao thành công lúc ${formatDate(cartData.updatedAt)}` : cartData.status === 4 ? `Đã bị hủy lúc ${formatDate(cartData.updatedAt)}` : ""}</mark>
                        </div>

                        <div>
                        ${cartData.status === 0 || cartData.status === 1 ? /* html */`
                        <button id="btn-cancel" class="px-3 py-1.5 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Hủy ĐH</button>
                        ` : ""}
                        <button class="px-3 py-1.5 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Lịch sử ĐH</button>
                       </div>
                    </section>

                    <section>
                        <h2 class="font-semibold text-gray-600 text-2xl">Chi tiết đơn hàng</h2>

                        <table class="mt-3 text-gray-600 w-full text-left">
                            <thead>
                                <tr>
                                    <th class="pb-1 border-b-2 uppercase text-sm">STT</th>
                                    <th class="pb-1 border-b-2 uppercase text-sm">Sản phẩm</th>
                                    <th class="pb-1 border-b-2 uppercase text-sm">Đơn giá</th>
                                    <th class="pb-1 border-b-2 uppercase text-sm">Số lượng</th>
                                    <th class="pb-1 border-b-2 uppercase text-sm text-right">Thành tiền</th>
                                </tr>
                            </thead>

                            <tbody>
                                ${cartDetails.map((item, index) => /* html */`
                                    <tr class="border-b">
                                        <td>${index + 1}</td>
                                        <td class="py-2 flex items-center">
                                            <img src="${item.product.image}" class="w-10 h-10 object-cover" alt="">
                                            <div class="pl-3">
                                                <a href="/#/product/${item.productId}" class="text-blue-500">${item.product.name}</a>
                                                <div class="text-sm">
                                                    <p>Đá: ${item.ice}%</p>
                                                    <p>Đường: ${item.sugar}%</p>
                                                    <p>Size: ${item.sizeId ? item.size.name : "S"}</p>
                                                    <p>Topping: ${item.toppingId ? item.topping.name : "Không chọn Topping"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="py-2">${formatCurrency(item.productPrice + item.sizePrice + item.toppingPrice)}</td>
                                        <td class="py-2">${item.quantity}</td>
                                        <td class="py-2 text-right text-black font-medium">${formatCurrency((item.productPrice + item.sizePrice + item.toppingPrice) * item.quantity)}</td>
                                    </tr>
                                    `).join("")}
                            </tbody>
                        </table>
                    </section>

                    <section class="mt-4">
                        <h2 class="font-semibold text-gray-600 text-2xl">Tổng thanh toán</h2>

                        <table class="mt-1 text-gray-600 w-full text-left">
                            <tbody>
                                <tr class="border-b">
                                    <td class="py-1.5 font-medium">Tiền tạm tính:</td>
                                    <td class="py-1.5 text-right">${formatCurrency(cartData.total_price)}</td>
                                </tr>

                                ${voucherText ? /* html */`
                                <tr class="border-b">
                                    <td class="py-1.5 font-medium">Voucher đã sử dụng</td>
                                    <td class="py-1.5 text-right">${voucherText}</td>
                                </tr>
                                ` : ""}
                                
                                <tr class="border-b">
                                    <td class="py-1.5 font-medium">Tổng giảm:</td>
                                    <td class="py-1.5 text-right">${formatCurrency(cartData.price_decrease)}</td>
                                </tr>
                                <tr>
                                    <td class="py-1.5 font-medium">Tổng tiền:</td>
                                    <td class="py-1.5 text-right">${formatCurrency((cartData.total_price - cartData.price_decrease) > 0 ? (cartData.total_price - cartData.price_decrease) : 0)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section class="mt-4">
                        <h2 class="font-semibold text-gray-600 text-2xl">Thông tin vận chuyển</h2>

                        <table class="mt-1 text-gray-600 w-full text-left">
                            <tbody>
                                <tr class="border-b">
                                    <td class="py-1.5 font-medium">Họ và tên:</td>
                                    <td class="py-1.5 text-right">${cartData.customer_name}</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-1.5 font-medium">Địa chỉ:</td>
                                    <td class="py-1.5 text-right">${cartData.address}</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-1.5 font-medium">Số điện thoại:</td>
                                    <td class="py-1.5 text-right">${cartData.phone}</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-1.5 font-medium">Email:</td>
                                    <td class="py-1.5 text-right">${cartData.email}</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-1.5 font-medium">Thời gian đặt:</td>
                                    <td class="py-1.5 text-right">${formatDate(cartData.createdAt)}</td>
                                </tr>
                                <tr>
                                    <td class="py-1.5 font-medium">Ghi chú:</td>
                                    <td class="py-1.5 text-right">${cartData.message ? cartData.message : "Không có"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </div>
            </section>
        </main>
        <!-- end content -->

        ${Footer.render()}
        `;
    },
    afterRender(id) {
        Header.afterRender();
        Footer.afterRender();

        const btnCartCancel = document.querySelector("#btn-cancel");

        if (btnCartCancel) {
            btnCartCancel.addEventListener("click", () => {
                Swal.fire({
                    title: "Xác nhận cập nhật trạng thái đơn hàng?",
                    text: "Bạn không thể hoàn tác sau khi cập nhật!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        update(id, {
                            status: 4,
                            updatedAt: new Date().toISOString(),
                        })
                            .then(() => {
                                Swal.fire(
                                    "Thành công!",
                                    "Cập nhật trạng thái đơn hàng thành công.",
                                    "success",
                                );
                            })
                            .then(() => { window.location.href = `/#/my-account/cart/${id}/detail`; });
                    }
                });
            });
        }
    },
};

export default MyAccCartDetailsPage;