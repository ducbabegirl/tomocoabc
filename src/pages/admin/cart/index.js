import $ from "jquery";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import AdminCartList from "../../../components/admin/cartList";
import { getAll, search } from "../../../api/order";
import Pagination from "../../../components/admin/pagination";
import { formatCurrency, formatDate } from "../../../utils";

const AdminCartListPage = {
    getTitle() {
        return "Cart List | Administrator";
    },
    async render(pageNumber) {
        const { data } = await getAll();
        const total = data.length; // tổng số
        const limit = 10;
        const currentPage = pageNumber ?? 1; // lấy số trang hiện tại

        // ds theo limit
        const { data: cartList } = await getAll(currentPage, limit);

        return /* html */ `
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
                            <span>DS đơn hàng</span>
                        </div>

                        <button type="button" class="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            DS đơn hàng
                        </button>
                    </div>
                </header>

                <div class="p-6 mt-24 overflow-hidden">
                    <!-- search -->
                    <form action="" class="flex rounded-md shadow-sm mb-5" method="POST" id="cart__form-search">
                        <input type="text" name="company-website" id="cart__form-search-keyword" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 px-4 py-2 border outline-none" placeholder="Nhập tên khách hàng hoặc số điện thoại">
                        <select class="border-gray-300 border outline-none px-2 text-sm" id="cart__form-search-stt">
                            <option value="">-- Trạng thái --</option>
                            <option value="0">Đơn hàng mới</option>
                            <option value="1">Đã xác nhận</option>
                            <option value="2">Đang giao hàng</option>
                            <option value="3">Đã giao hoàng</option>
                            <option value="4">Đã hủy</option>
                        </select>
                        <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm cursor-pointer hover:bg-gray-200">
                            <i class="fas fa-search"></i>
                        </span>
                    </form>

                    <div class="flex flex-col">
                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-200" id="cate__list-table">
                                        ${await AdminCartList.render(cartList)}
                                    </table>

                                    <!-- pagination -->
                                    ${Pagination.render(total, limit, +currentPage, "cart")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
            <div class="fixed inset-0 z-10 w-screen h-screen bg-black bg-opacity-25 hidden dashboard__overlay"></div>
        </section>
        `;
    },
    afterRender() {
        HeaderTop.afterRender();
        AdminNav.afterRender();

        // search
        $("#cart__form-search").on("input", async () => {
            const key = $("#cart__form-search-keyword").val();
            const status = $("#cart__form-search-stt").val();

            const renderStatus = (stt) => {
                let statusText = "";
                if (!stt) {
                    statusText = "Đơn hàng mới";
                } else if (stt === 1) {
                    statusText = "Đã xác nhận";
                } else if (stt === 2) {
                    statusText = "Đang giao hàng";
                } else if (stt === 3) {
                    statusText = "Đã giao hàng";
                } else {
                    statusText = "Đã hủy";
                }

                return statusText;
            };

            // get data
            const { data: cartList } = await search(key, status);
            $("#cart__list").html(cartList.map((item) => /* html */`
                <tr class="item__list-item-${item.id}">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${item.id}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div class="text-sm font-medium text-gray-900">
                        ${item.customer_name}
                        </div>
                        <div class="text-sm text-gray-500">
                        ${item.phone}
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${formatCurrency(item.total_price - item.price_decrease)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status !== 4 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}">
                        ${renderStatus(item.status)}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                        ${formatDate(item.createdAt)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="/#/admin/cart/${item.id}/detail" class="h-8 inline-flex items-center px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Detail</a>
                    </td>
                </tr>
                `).join(""));

            // ẩn phân trang
            $("#pagination").hide();
        });
    },
};

export default AdminCartListPage;