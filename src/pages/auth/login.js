import toastr from "toastr";
import { login } from "../../api/user";
import Footer from "../../components/user/footer";
import Header from "../../components/user/header";
import { checkLogin, saveUser } from "../../utils";

const LoginPage = {
    getTitle() {
        return "Đăng nhập - Trà Sữa Yotea";
    },
    async render() {
        return /* html */ `
        ${await Header.render()}

        <!-- content -->
        <main>
            <section class="container max-w-6xl mx-auto px-3">
                <h1 class="uppercase mt-8 font-semibold text-2xl text-gray-600">Đăng nhập</h1>

                <form action="" class="mb-14" method="POST" id="form__login">
                    <div class="mt-3">
                        <label for="form__login-user" class="font-semibold block mb-1">Địa chỉ email *</label>
                        <input type="text" id="form__login-user" name="form__login-user" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Nhập địa chỉ email">
                        <div class="form__reg-message text-sm text-red-500 mt-0.5"></div>
                    </div>

                    <div class="mt-3">
                        <label for="form__login-password" class="font-semibold block mb-1">Mật khẩu *</label>
                        <input type="password" id="form__login-password" name="form__login-password" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Mật khẩu">
                        <div class="form__reg-message text-sm text-red-500 mt-0.5"></div>
                    </div>

                    <div class="flex mt-3 items-center">
                        <input type="checkbox" name="" id="login_remember">
                        <label for="login_remember" class="ml-2 font-semibold select-none">Ghi nhớ mật khẩu</label>
                    </div>

                    <button class="select-none mt-4 px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Đăng nhập</button>

                    <a href="/#/forgot" class="block mt-1">Quên mật khẩu?</a>
                </form>
            </section>
        </main>
        <!-- end content -->

        ${Footer.render()}
        `;
    },
    afterRender() {
        Header.afterRender();
        Footer.afterRender();

        const formLogin = document.querySelector("#form__login");
        const username = formLogin.querySelector("#form__login-user");
        const password = formLogin.querySelector("#form__login-password");

        // validate
        const validate = () => {
            let isValid = true;

            if (!username.value) {
                username.nextElementSibling.innerText = "Vui lòng nhập tài khoản";
                isValid = false;
            } else {
                username.nextElementSibling.innerText = "";
            }

            if (!password.value) {
                password.nextElementSibling.innerText = "Vui lòng nhập mật khẩu";
                isValid = false;
            } else {
                password.nextElementSibling.innerText = "";
            }

            return isValid;
        };

        // bắt sự kiện submit form
        formLogin.addEventListener("submit", async (e) => {
            e.preventDefault();

            const isValid = validate();
            if (isValid) {
                try {
                    const { data } = await login({
                        email: username.value,
                        password: password.value,
                    });

                    // nếu tài khoản bị khóa
                    if (!data.user.active) {
                        toastr.error("Tài khoản của bạn đang bị khóa, liên hệ QTV");
                    } else {
                        // lưu thông tin vào localStorage
                        saveUser(data.user);

                        // show message
                        toastr.success("Đăng nhập thành công, hệ thống tự động chuyển hướng sau 3s");

                        setTimeout(() => checkLogin(data.user.role), 3000);
                    }
                } catch (error) {
                    toastr.error(error.response.data);
                }
            }
        });
    },
};

export default LoginPage;