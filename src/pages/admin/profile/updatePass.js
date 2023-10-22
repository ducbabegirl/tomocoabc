import toastr from "toastr";
import bcrypt from "bcryptjs";
import { get, update } from "../../../api/user";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { getUser, reRender } from "../../../utils";

const AdminUpdatePassPage = {
    getTitle() {
        return "Update Password | Administrator";
    },
    async render() {
        return /* html */ `
        <section class="min-h-screen bg-gray-50 dashboard">
            ${AdminNav.render()}
            
            <div class="ml-0 transition md:ml-60">
                <header class="left-0 md:left-60 fixed right-0 top-0">
                    ${HeaderTop.render()}

                    <div class="px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
                        <div class="flex items-center text-sm text-gray-600">
                            <h5 class="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
                            Profile
                            </h5>
                            <span>Cập nhật mật khẩu</span>
                        </div>

                        <a href="/#/admin/profile">
                            <button type="button" class="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Cập nhật thông tin
                            </button>
                        </a>
                    </div>
                </header>
                <div class="p-6 mt-24">
                    <form action="" method="POST" id="form__change-pass">
                        <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <span class="font-semibold mb-4 block text-xl">Thông tin chi tiết tài khoản:</span>

                                <div class="grid grid-cols-6 gap-3">
                                    <div class="col-span-6">
                                        <label for="form__change-pass-current-pass" class="block text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
                                        <input type="password" name="form__change-pass-current-pass" id="form__change-pass-current-pass" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập mật khẩu hiện tại">
                                        <div class="text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6">
                                        <label for="form__change-pass-new-pass" class="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                                        <input type="password" name="form__change-pass-new-pass" id="form__change-pass-new-pass" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập mật khẩu mới">
                                        <div class="text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6">
                                        <label for="form__change-pass-confirm" class="block text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</label>
                                        <input type="password" name="form__change-pass-confirm" id="form__change-pass-confirm" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Xác nhận mật khẩu mới">
                                        <div class="text-sm mt-0.5 text-red-500"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Lưu thay đổi
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="fixed inset-0 z-10 w-screen h-screen bg-black bg-opacity-25 hidden dashboard__overlay"></div>
        </section>
        `;
    },
    async afterRender() {
        HeaderTop.afterRender();
        AdminNav.afterRender();

        const formEdit = document.querySelector("#form__change-pass");
        const currentPass = formEdit.querySelector("#form__change-pass-current-pass");
        const newPass = formEdit.querySelector("#form__change-pass-new-pass");
        const confirmPass = formEdit.querySelector("#form__change-pass-confirm");

        const userLogin = getUser();
        const { data: userInfo } = await get(userLogin.id);

        // validate
        const validate = async () => {
            let isValid = true;

            if (!currentPass.value) {
                currentPass.nextElementSibling.innerText = "Vui lòng nhập mật khẩu hiện tại";
                isValid = false;
            } else {
                // kiểm tra mật khẩu có đúng không
                const isConfirmed = await bcrypt.compare(currentPass.value, userInfo.password);

                if (!isConfirmed) {
                    currentPass.nextElementSibling.innerText = "Mật khẩu hiện tại không chính xác";
                    isValid = false;
                } else {
                    currentPass.nextElementSibling.innerText = "";
                }
            }

            if (!newPass.value) {
                newPass.nextElementSibling.innerText = "Vui lòng nhập mật khẩu mới";
                isValid = false;
            } else {
                newPass.nextElementSibling.innerText = "";
            }

            if (!confirmPass.value) {
                confirmPass.nextElementSibling.innerText = "Vui lòng nhập lại mật khẩu";
                isValid = false;
            } else if (confirmPass.value !== newPass.value) {
                confirmPass.nextElementSibling.innerText = "Mật khẩu xác nhận không chính xác";
                isValid = false;
            } else {
                confirmPass.nextElementSibling.innerText = "";
            }

            return isValid;
        };

        // bắt sự kiện submit form
        formEdit.addEventListener("submit", async (e) => {
            e.preventDefault();
            const isValid = await validate();

            if (isValid) {
                const passwordData = {
                    password: newPass.value,
                };

                update(userInfo.id, passwordData)
                    .then(() => toastr.success("Cập nhật thành công"))
                    .then(() => reRender(AdminUpdatePassPage, "#app"));
            }
        });
    },
};

export default AdminUpdatePassPage;