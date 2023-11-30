/* eslint-disable no-nested-ternary */
import Swal from "sweetalert2";
import { get } from "../../../api/orderDetail";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { formatCurrency, formatDate } from "../../../utils";
import { get as getCart, update } from "../../../api/order";
import { get as getVoucher } from "../../../api/voucher";
import $ from "jquery";
import easyinvoice from 'easyinvoice';
const AdminCartDetailPage = {
    getTitle() {
        return "Cart Detail | Administrator";
    },
    async render(id) {
        const { data: cartDetails } = await get(id);
        const { data: cartData } = await getCart(id);

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

        return /* html */`
        <section class="min-h-screen bg-gray-50 dashboard">
            ${AdminNav.render("cart")}
            
            <div class="ml-0 transition md:ml-60">
                <header class="left-0 md:left-60 fixed right-0 top-0">
                    ${HeaderTop.render()}

                    <div class="px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
                        <div class="flex items-center text-sm text-gray-600">
                            <h5 class="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
                            Cart
                            </h5>
                            <span>Chi tiết đơn hàng</span>
                        </div>

                        <div data-id="${cartData.id}" id="update-status">
                            ${cartData.status === 0 ? /* html */`
                            <button type="button" data-status="1" class="btn-update-stt btn-update-stt-confirm inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Xác nhận ĐH
                            </button>
                            ` : cartData.status === 1 ? /* html */`
                            <button type="button" data-status="2" class="btn-update-stt btn-update-stt-process inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Đang giao hàng
                            </button>
                            ` : cartData.status === 2 ? /* html */`
                            <button type="button" data-status="3" class="btn-update-stt btn-update-stt-success inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Đã giao hàng
                            </button>
                            ` : ""}

                            ${cartData.status !== 4 && cartData.status !== 3 ? /* html */`
                            <button type="button" data-status="4" class="btn-update-stt btn-update-stt-cancel inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Hủy ĐH
                            </button>
                            ` : ""}
                            <a href="/#/admin/cart">
                                <button type="button" class="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    DS đơn hàng
                                </button>
                            </a>
                            <a href="javascript:void(0)" class="mt-4 px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]" id="invoice">In Bill</a>
                        </div>
                    </div>
                </header>
                <div class="p-6 mt-24">
                    <div class="shadow sm:rounded-md bg-white p-5">
                        <div>
                            Đơn hàng #<mark>${cartData.id}</mark> đặt lúc <mark>${formatDate(cartData.createdAt)}</mark> hiện tại <mark>${cartData.status === 0 ? "Đang chờ xác nhận" : cartData.status === 1 ? `Đã xác nhận lúc ${formatDate(cartData.updatedAt)}` : cartData.status === 2 ? `Đang giao hàng lúc ${formatDate(cartData.updatedAt)}` : cartData.status === 3 ? `Đã giao thành công lúc ${formatDate(cartData.updatedAt)}` : cartData.status === 4 ? `Đã bị hủy lúc ${formatDate(cartData.updatedAt)}` : ""}</mark>
                        </div>

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
                </div>
            </div>
            <div class="fixed inset-0 z-10 w-screen h-screen bg-black bg-opacity-25 hidden dashboard__overlay"></div>
        </section>
        `;
    },
    async afterRender(id) {
        HeaderTop.afterRender();
        AdminNav.afterRender();

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

        const btnsUpdateStt = document.querySelectorAll(".btn-update-stt");
        btnsUpdateStt.forEach((btn) => {
            const { id } = getParent(btn, "#update-status").dataset;
            const { status } = btn.dataset;

            btn.addEventListener("click", () => {
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
                            status: +status,
                            updatedAt: new Date().toISOString(),
                        })
                            .then(() => {
                                Swal.fire(
                                    "Thành công!",
                                    "Cập nhật trạng thái đơn hàng thành công.",
                                    "success",
                                );
                            })
                            .then(() => { window.location.href = `/#/admin/cart/${id}/detail`; });
                    }
                });
            });
        });


        // const { data: cartList } = await getCart(id);
        const { data: cartList } = await get(id);
        $("#invoice").click(async function () {
            try {
                const products = cartList.map(item => ({
                    "quantity": item.quantity,
                    "description": item.product.name,
                    "price": item.productPrice,
                    "tax-rate": 0,
                }));
                const baseFile = await handleInvoice(products);
    
                const blob = b64toBlob(baseFile);
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'invoice.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error(error);
            }
        });
    },
};



function b64toBlob(base64) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'application/pdf' });
}


function handleInvoice(products) {
    return new Promise(async (resolve, reject) => {
        try {
            // Create the invoice data
            const invoiceData = {
                currency: 'USD',
                taxNotation: 'vat', // or gst
                marginTop: 25,
                marginRight: 25,
                marginLeft: 25,
                marginBottom: 25,
                "images": {
                    "logo": "https://res.cloudinary.com/dizzurnqo/image/upload/v1697560429/plogo_oqv4xa.jpg",
                },
                sender: {
                    company: 'CÔNG TY CP TM & DV COCOMOCO',
                    address: 'Trịnh Văn Bô, Nam Từ Liêm, Hà Nội',
                    city: 'Hà Nội',
                    country: 'VietNam',
                    phone: '0842027665',
                    email: 'hongdtph14095@fpt.edu.vn',
                },
                products: products,
                bottomNotice: 'Thank you for your business!',
            };
            

            // Create the invoice using easyinvoice
            easyinvoice.createInvoice(invoiceData, (result) => {
                const pdfBase64 = result.pdf;
                resolve(pdfBase64);
            });
        } catch (error) {
            reject(error);
        }
    });
}

export default AdminCartDetailPage;