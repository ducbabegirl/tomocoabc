import HeaderTop from "../../components/admin/headerTop";
import AdminNav from "../../components/admin/nav";
import { getAll as getAllPost } from "../../api/news";
import { getAll as getAllUser } from "../../api/user";
import { getAll as getAllProduct } from "../../api/product";
import { getAll as getAllOrder } from "../../api/order";
import { formatCurrency } from "../../utils";

const DashboardPage = {
    getTitle() {
        return "Dashboard | Administrator";
    },
    async render() {
        const { data: posts } = await getAllPost();
        const { data: users } = await getAllUser();
        const { data: products } = await getAllProduct();

        // thống kê doanh thu
        const { data: orderList } = await getAllOrder();
        const orderSuccess = orderList.filter((order) => order.status === 3);
        // eslint-disable-next-line max-len
        const totalPrice = orderSuccess.reduce((total, order) => total + (order.total_price - order.price_decrease), 0);

        return /* html */ `
        <section class="min-h-screen bg-gray-50 dashboard">
            ${AdminNav.render("dashboard")}

            <div class="ml-0 transition md:ml-60">
                <header>
                    ${HeaderTop.render()}

                    <div class="px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
                        <div class="flex items-center text-sm text-gray-600">
                            <h5>Dashboard</h5>
                        </div>

                        <button type="button" class="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Dashboard
                        </button>
                    </div>
                </header>
                <div class="p-6">
                    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div class="flex bg-white">
                            <div class="bg-red-500 flex items-center px-3 text-white rounded-l-md">BV</div>
                            <div class="rounded-r-md flex shadow-sm items-center flex-1 justify-between px-3 py-2 leading-snug border-y border-r">
                                <div>
                                    <span class="block font-semibold">Bài viết</span>
                                    <span class="block text-gray-500">${posts.length} Posts</span>
                                </div>
                                <div class="text-gray-500">
                                    <i class="fas fa-ellipsis-v"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex bg-white">
                            <div class="bg-indigo-500 flex items-center px-3 text-white rounded-l-md">TK</div>
                            <div class="rounded-r-md flex shadow-sm items-center flex-1 justify-between px-3 py-2 leading-snug border-y border-r">
                                <div>
                                    <span class="block font-semibold">Tài khoản</span>
                                    <span class="block text-gray-500">${users.length} Members</span>
                                </div>
                                <div class="text-gray-500">
                                    <i class="fas fa-ellipsis-v"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex bg-white">
                            <div class="bg-yellow-500 flex items-center px-3 text-white rounded-l-md">SP</div>
                            <div class="rounded-r-md flex shadow-sm items-center flex-1 justify-between px-3 py-2 leading-snug border-y border-r">
                                <div>
                                    <span class="block font-semibold">Sản phẩm</span>
                                    <span class="block text-gray-500">${products.length} Sản phẩm</span>
                                </div>
                                <div class="text-gray-500">
                                    <i class="fas fa-ellipsis-v"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex bg-white">
                            <div class="bg-green-500 flex items-center px-3 text-white rounded-l-md">DT</div>
                            <div class="rounded-r-md flex shadow-sm items-center flex-1 justify-between px-3 py-2 leading-snug border-y border-r">
                                <div>
                                    <span class="block font-semibold">Doanh thu</span>
                                    <span class="block text-gray-500">${formatCurrency(totalPrice)}</span>
                                </div>
                                <div class="text-gray-500">
                                    <i class="fas fa-ellipsis-v"></i>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div class="fixed inset-0 z-10 w-screen h-screen bg-black bg-opacity-25 hidden dashboard__overlay"></div>
        </section>
        `;
    },
    afterRender() {
        HeaderTop.afterRender();
        AdminNav.afterRender();
    },
};

export default DashboardPage;