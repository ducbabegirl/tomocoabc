import Swal from "sweetalert2";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { remove } from "../../../api/size";
import { reRender } from "../../../utils";
import AdminSizeList from "../../../components/admin/sizeList";


const AdminSizeListPage = {
    getTitle() {
        return "Size List | Administrator";
    },
    async render() {
        return /* html */ `
        <section class="min-h-screen bg-gray-50 dashboard">
            ${AdminNav.render("size")}

            <div class="ml-0 transition md:ml-60">
            <header class="left-0 md:left-60 fixed right-0 top-0">
                ${HeaderTop.render()}

                <div class="px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
                    <div class="flex items-center text-sm text-gray-600">
                        <h5 class="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
                            Size
                        </h5>
                        <span>DS size</span>
                    </div>

                    <a href="/#/admin/size/add">
                        <button type="button" class="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Thêm size
                        </button>
                    </a>
                </div>
            </header>

        <div class="p-6 mt-24 overflow-hidden">
            <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200" id="cate__list-table">
                                ${await AdminSizeList.render()}
                            </table>
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

        const btnsDelete = document.querySelectorAll(".size__list-btn-delete");

        // xóa danh mục
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
                                reRender(AdminSizeListPage, "#app");
                            });
                    }
                });
            });

        });

    },
};
export default AdminSizeListPage;