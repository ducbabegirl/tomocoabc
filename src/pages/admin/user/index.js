import Swal from "sweetalert2";
import $ from "jquery";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { getAll, remove, search,getTopBuyingUsers} from "../../../api/user";
import { formatDate, reRender } from "../../../utils";
import AdminUserList from "../../../components/admin/userList";
import Pagination from "../../../components/admin/pagination";

const AdminUserListPage = {
    getTitle() {
        return "User List | Administrator";
    },
    async render(pageNumber) {
        const { data } = await getAll();
        const total = data.length; // tổng số user
        const limit = 10;
        const currentPage = pageNumber ?? 1; // lấy số trang hiện tại

        // ds user theo limit
        const { data: userList } = await getAll(currentPage, limit);
        return /* html */ `
        <section class="min-h-screen bg-gray-50 dashboard">
            ${AdminNav.render("user")}
            
            <div class="ml-0 transition md:ml-60">
                <header class="left-0 md:left-60 fixed right-0 top-0">
                    ${HeaderTop.render()}

                    <div class="px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
                        <div class="flex items-center text-sm text-gray-600">
                            <h5 class="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
                            User
                            </h5>
                            <span>DS user</span>
                        </div>

                        <a href="/#/admin/user/add">
                            <button type="button" class="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Thêm user
                            </button>
                        </a>
                    </div>
                </header>

                <div class="p-6 mt-24 overflow-hidden">
                <div class="row" style="display:flex">
                        <div class="col-md-5" style="flex: 0 0 41.666667%;max-width: 41.666667%;padding-right: 15px;padding-left: 15px;">
                            <form action="" class="flex rounded-md shadow-sm mb-5" method="POST" id="user__search-form">
                                <input type="text" name="company-website" id="user__search-form-key" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 px-4 py-2 border outline-none" placeholder="Nhập tên user">
                                <select class="border-gray-300 border outline-none px-2 text-sm" id="user__search-form-stt">
                                    <option value="">-- Trạng thái --</option>
                                    <option value="1">Kích hoạt</option>
                                    <option value="0">Khóa</option>
                                </select>
                                <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm cursor-pointer hover:bg-gray-200">
                                    <i class="fas fa-search"></i>
                                </span>
                            </form>
                        </div>
                        <div class="col-md-3 style="flex: 0 0 25%;max-width: 25%;padding-right: 15px;padding-left: 15px;">
                        <select class="border-gray-300 border outline-none px-2 text-sm" id="user_thong_ke"style="width: 200px;height: 35px;margin-top: 2px;border-radius: 8px;">
                            <option value="">-- Lọc --</option>
                            <option value="0">Người dùng mua tiêu thụ nhiều nhất</option>
                        </select>
                        </div>
                    </div>
                  
                    

                    <div class="flex flex-col">
                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200" id="cate__list-table">
                                    ${await AdminUserList.render(userList)}
                                </table>

                                <!-- pagination -->
                                ${Pagination.render(total, limit, +currentPage, "user")}
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
    afterRender(pageNumber) {
        HeaderTop.afterRender();
        AdminNav.afterRender();

        const btnsDelete = document.querySelectorAll(".user__list-btn-delete");

        // xóa user
        btnsDelete.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const { id } = e.target.dataset;

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
                        remove(id)
                            .then(() => {
                                Swal.fire(
                                    "Thành công",
                                    "Đã xóa danh mục.",
                                    "success",
                                );
                            })
                            .then(() => {
                                reRender(AdminUserListPage, "#app");
                            });
                    }
                });
            });
        });

        // search
        $("#user__search-form").on("input", async () => {
            const keyword = $("#user__search-form-key").val();
            const stt = $("#user__search-form-stt").val();

            const { data: userList } = await search(keyword, stt);

            $("#user__list").html(userList.map((user) => `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${user.id}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                                <img class="h-10 w-10 rounded-full object-cover" src="${user.avatar}" alt="">
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${user.fullName}</div>
                                <div class="text-sm text-gray-500">${user.email}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${user.role ? "Admin" : "Khách hàng"}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}">
                        ${user.active ? "Kích hoạt" : "Khóa"}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                        ${formatDate(user.createdAt)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="/#/admin/user/${user.id}/edit" class="h-8 inline-flex items-center px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit</a>
                        <button data-id="${user.id}" class="user__list-btn-delete h-8 inline-flex items-center px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3">Delete</button>
                    </td>
                </tr>
                `).join(""));

            // ẩn phân trang
            $("#pagination").hide();
        });


        $("#user_thong_ke").on("change", async () => {
            const selectedOption = $("#user_thong_ke").val();
    
            if (selectedOption === "0") {
                const topBuyingUsers = await getTopBuyingUsers(pageNumber, 10);
    
                $("#user__list").html(topBuyingUsers.map((user) => `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${user.id}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                                <img class="h-10 w-10 rounded-full object-cover" src="${user.avatar}" alt="">
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${user.fullName}</div>
                                <div class="text-sm text-gray-500">${user.email}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${user.role ? "Admin" : "Khách hàng"}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}">
                        ${user.active ? "Kích hoạt" : "Khóa"}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                        ${formatDate(user.createdAt)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="/#/admin/user/${user.id}/edit" class="h-8 inline-flex items-center px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit</a>
                        <button data-id="${user.id}" class="user__list-btn-delete h-8 inline-flex items-center px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3">Delete</button>
                    </td>
                </tr>
                `).join(""));

            // ẩn phân trang
            $("#pagination").hide();
            }
        });
    },
};

export default AdminUserListPage;
