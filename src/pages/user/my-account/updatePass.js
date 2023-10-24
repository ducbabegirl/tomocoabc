import toastr from "toastr";
import bcrypt from "bcryptjs";
import Header from "../../../components/user/header";
import Footer from "../../../components/user/footer";
import MyAccNav from "../../../components/user/myAccNav";
import { get, update } from "../../../api/user";
import { getUser, reRender } from "../../../utils";

const MyAccUpdatePass = {
    getTitle() {
        return "Đổi mật khẩu - Trà Sữa Yotea";
    },
    async render() {
        return /* html */ `
        ${await Header.render()}

        <!-- content -->
        <main>
            <section class="py-7 bg-gray-100 border-b">
                <div class="container max-w-6xl mx-auto px-3 text-gray-500">
                    <h1 class="uppercase font-semibold text-2xl">My account</h1>
                    <p class="text-sm mt-1 uppercase">Cập nhật mật khẩu</p>
                </div>
            </section>
            

            <section class="container max-w-6xl mx-auto px-3 grid grid-cols-12 gap-5 my-8">
                ${MyAccNav.render("update-pass")}

                <div class="col-span-12 lg:col-span-9">
                    <h2 class="uppercase text-lg font-semibold text-gray-600 pb-1 border-b">Đổi mật khẩu</h2>

                    <form action="" class="mt-4" id="form__change-pass">
                        <div class="grid grid-cols-12 gap-3">
                            <div class="col-span-12">
                                <label for="form__change-pass-current-pass" class="mb-1 block font-semibold">Mật khẩu cũ *</label>
                                <input type="password" id="form__change-pass-current-pass" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Nhập họ mật khẩu hiện tại">
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>
                            <div class="col-span-12">
                                <label for="form__change-pass-new-pass" class="mb-1 block font-semibold">Mật khẩu mới *</label>
                                <input type="password" id="form__change-pass-new-pass" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Nhập mật khẩu mới">
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>
                            <div class="col-span-12">
                                <label for="form__change-pass-confirm" class="mb-1 block font-semibold">Xác nhận mật khẩu mới *</label>
                                <input type="password" id="form__change-pass-confirm" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Xác nhận mật khẩu mới">
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>
                        </div>

                        <button class="mt-4 px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Đổi mật khẩu</button>
                    </form>
                </div>
            </section>
        </main>
        <!-- end content -->

        ${Footer.render()}
        `;
    },
    async afterRender() {
        MyAccNav.afterRender();

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
                    .then(() => reRender(MyAccUpdatePass, "#app"));
            }
        });
    },
};

export default MyAccUpdatePass;