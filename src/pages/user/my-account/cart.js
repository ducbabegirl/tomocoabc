/* eslint-disable no-nested-ternary */
import $ from "jquery";
import { getByUserId, search } from "../../../api/order";
import Footer from "../../../components/user/footer";
import Header from "../../../components/user/header";
import MyAccNav from "../../../components/user/myAccNav";
import { formatCurrency, formatDate, getUser } from "../../../utils";

const MyAccCartPage = {
    getTitle() {
        return "Đơn hàng của tôi - Trà Sữa Yotea";
    },
    async render(pageNumber) {
        const userLogged = getUser();
        const { data } = await getByUserId(userLogged.id);

        const total = data.length; // tổng số order
        const limit = 10;
        const currentPage = pageNumber ?? 1; // lấy số trang hiện tại

        // ds theo limit
        const { data: cartList } = await getByUserId(userLogged.id, currentPage, limit);

        // tính tổng số trang
        const totalPage = Math.ceil(total / limit);
        let htmlPagination = "";

        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= totalPage; i++) {
            htmlPagination += `
            <li class="">
                <a href="/#/my-account/cart/page/${i}"class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white ${+currentPage === i ? "border-[#D9A953] bg-[#D9A953] text-white" : "border-gray-500 text-gray-500"}">${i}</a>
            </li>
            `;
        }

        return /* html */ `
        ${await Header.render()}

        <!-- content -->
        <main>
            <section class="py-7 bg-gray-100 border-b">
                <div class="container max-w-6xl mx-auto px-3 text-gray-500">
                    <h1 class="uppercase font-semibold text-2xl">My account</h1>
                    <p class="text-sm mt-1 uppercase">Lịch sử đặt hàng</p>
                </div>
            </section>

            <section class="container max-w-6xl mx-auto px-3 grid grid-cols-12 gap-5 my-8">
                ${MyAccNav.render("cart")}

                <div class="col-span-12 lg:col-span-9">
                    <!-- search -->
                    <form action="" class="flex" id="cart__form-search">
                        <input type="text" id="cart__form-search-key" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] flex-1 border px-2 h-10 text-sm outline-none" placeholder="Nhập mã đơn hàng hoặc tên khách hàng">
                        <select name="" id="cart__form-search-stt" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] border px-2 h-10 text-sm outline-none">
                            <option value="">-- Trạng thái --</option>
                            <option value="0">Chờ xác nhận </option>
                            <option value="1">Đã xác nhận</option>
                            <option value="2">Đang giao hàng</option>
                            <option value="3">Đã giao hoàng</option>
                            <option value="4">Đã hủy</option>
                        </select>
                    </form>
                    <!-- end search -->

                    <!-- table -->
                    <table class="mt-3 text-gray-600 w-full text-left">
                        <thead>
                            <tr>
                                <th class="pb-1 border-b-2 uppercase text-sm">Mã ĐH</th>
                                <th class="pb-1 border-b-2 uppercase text-sm">Tên người nhận</th>
                                <th class="pb-1 border-b-2 uppercase text-sm">Ngày đặt</th>
                                <th class="pb-1 border-b-2 uppercase text-sm">Tổng giá trị</th>
                                <th class="pb-1 border-b-2 uppercase text-sm">Trạng thái</th>
                                <th class="pb-1 border-b-2 uppercase text-sm text-right">Hành động</th>
                            </tr>
                        </thead>

                        <tbody id="cart__list">
                            ${cartList.map((item) => /* html */`
                                <tr class="border-b">
                                    <td>#${item.id}</td>
                                    <td class="py-2">${item.customer_name}</td>
                                    <td class="py-2">${formatDate(item.createdAt)}</td>
                                    <td class="py-2">${formatCurrency(item.total_price - item.price_decrease)}</td>
                                    <td class="py-2">
                                        <label for="" class="px-1 py-0.5 text-sm rounded-[4px] font-medium  ${item.status === 4 ? "bg-[#FFE2E5] text-[#F64E60]" : "bg-[#E1F0FF] text-[#3699FF]"}">${item.status === 0 ? "Chờ xác nhận" : item.status === 1 ? "Đã xác nhận" : item.status === 2 ? "Đang giao hàng" : item.status === 3 ? "Đã giao hàng" : item.status === 4 ? "Đã hủy" : ""}</label>
                                    </td>
                                    <td class="py-2 text-right">
                                        <a href="/#/my-account/cart/${item.id}/detail">
                                            <button class="px-3 py-1.5 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">View</button>
                                        </a>
                                    </td>
                                </tr>
                                `).join("")}
                        </tbody>
                    </table>
                    <!-- end table -->

                    <!-- pagination -->
                    <ul class="flex justify-center mt-5" id="cart__list-pagination">
                        ${currentPage > 1 ? `
                        <li>
                            <a href="/#/my-account/cart/page/${currentPage - 1}" class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold border-gray-500 text-gray-500 mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white">
                                <button>
                                    <i class="fas fa-angle-left"></i>
                                </button>
                            </a>
                        </li>
                        ` : ""}
                        ${htmlPagination}
                        
                        ${currentPage <= totalPage - 1 ? `
                        <li>
                            <a href="/#/my-account/cart/page/${+currentPage + 1}" class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold border-gray-500 text-gray-500 mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white">
                                <button>
                                    <i class="fas fa-angle-right"></i>
                                </button>
                            </a>
                        </li>
                        ` : ""}
                    </ul>
                </div>
            </section>
        </main>
        <!-- end content -->

        ${Footer.render()}
        `;
    },
    afterRender() {
        Header.afterRender();
        Footer.afterRender();
        MyAccNav.afterRender();

        const userLogged = getUser();

        $("#cart__form-search").on("input", async () => {
            const keyword = $("#cart__form-search-key").val();
            const stt = $("#cart__form-search-stt").val();

            const { data: cartList } = await search(keyword, stt, userLogged.id);
            $("#cart__list").html(cartList.map((item) => `
                <tr class="border-b">
                    <td>#${item.id}</td>
                    <td class="py-2">${item.customer_name}</td>
                    <td class="py-2">${formatDate(item.createdAt)}</td>
                    <td class="py-2">${formatCurrency(item.total_price - item.price_decrease)}</td>
                    <td class="py-2">
                        <label for="" class="px-1 py-0.5 text-sm rounded-[4px] font-medium  ${item.status === 4 ? "bg-[#FFE2E5] text-[#F64E60]" : "bg-[#E1F0FF] text-[#3699FF]"}">${item.status === 0 ? "Chờ xác nhận" : item.status === 1 ? "Đã xác nhận" : item.status === 2 ? "Đang giao hàng" : item.status === 3 ? "Đã giao hàng" : item.status === 4 ? "Đã hủy" : ""}</label>
                    </td>
                    <td class="py-2 text-right">
                        <a href="/#/my-account/cart/${item.id}/detail">
                            <button class="px-3 py-1.5 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">View</button>
                        </a>
                    </td>
                </tr>
                `).join(""));

            // ẩn phân trang
            $("#cart__list-pagination").hide();
        });
    },
};

export default MyAccCartPage;