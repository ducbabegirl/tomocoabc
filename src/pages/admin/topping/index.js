import Swal from "sweetalert2";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { getAll, remove } from "../../../api/topping";
import { reRender } from "../../../utils";
import AdminToppingList from "../../../components/admin/toppingList";
import Pagination from "../../../components/admin/pagination";

const AdminToppingListPage = {
    getTitle() {
        return "Topping List | Administrator";
    },
    async render(pageNumber) {
        const { data } = await getAll();
        const total = data.length; // tổng số
        const limit = 10;
        const currentPage = pageNumber ?? 1; // lấy số trang hiện tại

        // ds theo limit
        const { data: toppingList } = await getAll(currentPage, limit);
        return /* html */ `
        <section class="min-h-screen bg-gray-50 dashboard">
            ${AdminNav.render("topping")}
            
            <div class="ml-0 transition md:ml-60">
                <header class="left-0 md:left-60 fixed right-0 top-0">
                    ${HeaderTop.render()}

                    <div class="px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
                        <div class="flex items-center text-sm text-gray-600">
                            <h5 class="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
                            Toppings
                            </h5>
                            <span>DS topping</span>
                        </div>

                        <a href="/#/admin/topping/add">
                            <button type="button" class="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Thêm topping
                            </button>
                        </a>
                    </div>
                </header>

                <div class="p-6 mt-24 overflow-hidden">
                <!-- search -->
                    <form action="" class="flex rounded-md shadow-sm mb-5" method="POST">
                        <input type="text" name="company-website" id="company-website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 px-4 py-2 border outline-none" placeholder="Nhập tiêu đề bài viết...">
                        <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm cursor-pointer hover:bg-gray-200">
                            <i class="fas fa-search"></i>
                        </span>
                    </form>

                    <div class="flex flex-col">
                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200" id="cate__list-table">
                                    ${await AdminToppingList.render(toppingList)}
                                </table>

                                <!-- pagination -->
                                ${Pagination.render(total, limit, +currentPage, "topping")}
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