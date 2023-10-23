import toastr from "toastr";
import { register } from "../../api/user";
import Footer from "../../components/user/footer";
import Header from "../../components/user/header";

const RegisterPage = {
    getTitle() {
        return "Đăng ký - Trà Sữa Yotea";
    },
    async render() {
        return /* html */ `
        ${await Header.render()}

        <!-- content -->
        <main>
            <section class="container max-w-6xl mx-auto px-3">
                <h1 class="uppercase mt-8 font-semibold text-2xl text-gray-600">Đăng ký</h1>

                <form action="" class="mb-14" method="POST" id="form__reg">
                    <div class="mt-3">
                        <label for="form__reg-username" class="font-semibold block mb-1">Tên tài khoản *</label>
                        <input type="text" id="form__reg-username" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="VD: demo...">
                        <div class="form__reg-message text-sm text-red-500 mt-0.5"></div>
                    </div>

                    <div class="mt-3">
                        <label for="form__reg-fullname" class="font-semibold block mb-1">Họ và tên *</label>
                        <input type="text" id="form__reg-fullname" name="form__reg-fullname" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="VD: Lê Văn Tuân...">
                        <div class="form__reg-message text-sm text-red-500 mt-0.5"></div>
                    </div>

                    <div class="mt-3">
                        <label for="form__reg-email" class="font-semibold block mb-1">Email *</label>
                        <input type="text" id="form__reg-email" name="form__reg-email" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="VD: user@gmail.com...">
                        <div class="form__reg-message text-sm text-red-500 mt-0.5"></div>
                    </div>

                    <div class="mt-3">
                        <label for="form__reg-phone" class="font-semibold block mb-1">Số điện thoại *</label>
                        <input type="text" id="form__reg-phone" name="form__reg-phone" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="VD: 0347526xxx...">
                        <div class="form__reg-message text-sm text-red-500 mt-0.5"></div>
                    </div>

                    <div class="mt-3">
                        <label for="form__reg-password" class="font-semibold block mb-1">Mật khẩu *</label>
                        <input type="password" id="form__reg-password" name="form__reg-password" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Mật khẩu">
                        <div class="form__reg-message text-sm text-red-500 mt-0.5"></div>
                    </div>

                    <div class="mt-3">
                        <label for="form__reg-confirm" class="font-semibold block mb-1">Xác nhận mật khẩu *</label>
                        <input type="password" id="form__reg-confirm" name="form__reg-confirm" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Nhập lại mật khẩu">
                        <div class="form__reg-message text-sm text-red-500 mt-0.5"></div>
                    </div>

                    <button class="select-none mt-8 px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Đăng ký</button>

                    <p class="mt-1">
                        Đã có tài khoản?
                        <a href="/#/login">Đăng nhập ngay</a>
                    </p>
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

        const formRegister = document.querySelector("#form__reg");
        const username = formRegister.querySelector("#form__reg-username");
        const fullName = formRegister.querySelector("#form__reg-fullname");
        const email = formRegister.querySelector("#form__reg-email");
        const phone = formRegister.querySelector("#form__reg-phone");
        const password = formRegister.querySelector("#form__reg-password");
        const confirmPassword = formRegister.querySelector("#form__reg-confirm");

        // validate
        const validate = () => {
            let isValid = true;

            const regexUsername = /[\s*]/;
            if (!username.value) {
                username.nextElementSibling.innerText = "Vui lòng nhập tên đăng nhập";
                isValid = false;
            } else if (regexUsername.test(username.value)) {
                username.nextElementSibling.innerText = "Vui lòng nhập lại, tên đăng nhập không được chứa khoảng trắng";
                isValid = false;
            } else {
                username.nextElementSibling.innerText = "";
            }

            if (!fullName.value) {
                fullName.nextElementSibling.innerText = "Vui lòng nhập họ tên";
                isValid = false;
            } else {
                fullName.nextElementSibling.innerText = "";
            }

            const regexEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!email.value) {
                email.nextElementSibling.innerText = "Vui lòng nhập email";
                isValid = false;
            } else if (!regexEmail.test(email.value)) {
                email.nextElementSibling.innerText = "Email không đúng định dạng";
                isValid = false;
            } else {
                email.nextElementSibling.innerText = "";
            }

            const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
            if (!phone.value) {
                phone.nextElementSibling.innerText = "Vui lòng nhập số điện thoại";
                isValid = false;
            } else if (!regexPhone.test(phone.value)) {
                phone.nextElementSibling.innerText = "Số điện thoại không đúng định dạng";
                isValid = false;
            } else {
                phone.nextElementSibling.innerText = "";
            }

            if (!password.value) {
                password.nextElementSibling.innerText = "Vui lòng nhập mật khẩu";
                isValid = false;
            } else {
                password.nextElementSibling.innerText = "";
            }

            if (!confirmPassword.value) {
                confirmPassword.nextElementSibling.innerText = "Vui lòng xác nhận mật khẩu";
                isValid = false;
            } else if (password.value !== confirmPassword.value) {
                confirmPassword.nextElementSibling.innerText = "Mật khẩu xác nhận không khớp";
                isValid = false;
            } else {
                confirmPassword.nextElementSibling.innerText = "";
            }

            return isValid;
        };

        formRegister.addEventListener("submit", (e) => {
            e.preventDefault();

            const isValid = validate();
            if (isValid) {
                register({
                    username: username.value,
                    fullName: fullName.value,
                    email: email.value,
                    phone: phone.value,
                    password: password.value,
                    wardsCode: 0,
                    districtCode: 0,
                    provinceCode: 0,
                    address: "",
                    avatar: "https://res.cloudinary.com/levantuan/image/upload/v1644302455/assignment-js/thumbnail-image-vector-graphic-vector-id1147544807_ochvyr.jpg",
                    role: 0,
                    active: 1,
                    createdAt: new Date().toISOString(),
                })
                    .then(() => toastr.success("Đăng ký thành công"))
                    .then(() => { window.location.href = "/#/login"; });
            }
        });
    },
};

export default RegisterPage;