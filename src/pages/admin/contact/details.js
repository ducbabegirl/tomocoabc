import { get } from "../../../api/contact";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { formatDate } from "../../../utils";

const AdminDetailContactPage = {
    getTitle() {
        return "Contact Detail | Administrator";
    },
    async render(id) {
        const { data: contactDetail } = await get(id);

        return /* html */ `
        <section class="min-h-screen bg-gray-50 dashboard">
            ${AdminNav.render("contact")}
            
            <div class="ml-0 transition md:ml-60">
                <header class="left-0 md:left-60 fixed right-0 top-0">
                    ${HeaderTop.render()}

                    <div class="px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
                        <div class="flex items-center text-sm text-gray-600">
                            <h5 class="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
                            Contact
                            </h5>
                            <span>Chi tiết feedback</span>
                        </div>

                        <a href="/#/admin/contact">
                            <button type="button" class="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                DS feedback
                            </button>
                        </a>
                    </div>
                </header>
                <div class="p-6 mt-24">
                    <form action="" method="POST">
                        <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <span class="font-semibold mb-4 block text-xl">Thông tin chi tiết feedback:</span>

                                <div class="grid grid-cols-6 gap-3">
                                    <div class="col-span-6 md:col-span-3">
                                        <label for="customer-name" class="block text-sm font-medium text-gray-700">Tên khách hàng</label>
                                        <input type="text" disabled name="customer-name" class="py-2 px-3 mt-1 border block w-full outline-none shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50 text-gray-500 text-sm" value="${contactDetail.name}">
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="customer-phone" class="block text-sm font-medium text-gray-700">Sdt khách hàng</label>
                                        <input type="text" disabled name="customer-phone" class="py-2 px-3 mt-1 border block w-full outline-none shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50 text-gray-500 text-sm" value="${contactDetail.phone}">
                                    </div>

                                    <div class="col-span-6">
                                        <label for="customer-phone" class="block text-sm font-medium text-gray-700">Email khách hàng</label>
                                        <input type="text" disabled name="customer-phone" class="py-2 px-3 mt-1 border block w-full outline-none shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50 text-gray-500 text-sm" value="${contactDetail.email}">
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="customer-name" class="block text-sm font-medium text-gray-700">Chi nhánh feedback</label>
                                        <input type="text" disabled name="customer-name" class="py-2 px-3 mt-1 border block w-full outline-none shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50 text-gray-500 text-sm" value="${contactDetail.store.name}">
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="customer-phone" class="block text-sm font-medium text-gray-700">Ngày gửi</label>
                                        <input type="text" disabled name="customer-phone" class="py-2 px-3 mt-1 border block w-full outline-none shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50 text-gray-500 text-sm" value="${formatDate(contactDetail.createdAt)}">
                                    </div>

                                    <div class="col-span-6">
                                        <label for="feedback-content" class="block text-sm font-medium text-gray-700">Nội dung</label>
                                        <textarea id="feedback-content" disabled name="feedback-content" rows="10" class="py-2 px-3 outline-none shadow-sm mt-1 block w-full sm:text-sm border border-gray-300 rounded-md bg-gray-50 text-gray-500 text-sm">${contactDetail.content}</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
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

export default AdminDetailContactPage;