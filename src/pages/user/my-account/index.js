import toastr from "toastr";
import Header from "../../../components/user/header";
import Footer from "../../../components/user/footer";
import MyAccNav from "../../../components/user/myAccNav";
import {
    getUser, reRender, saveUser, uploadFile,
} from "../../../utils";
import { getAllProvince, getDistrict, getWard } from "../../../api/location";
import { update } from "../../../api/user";

const UpdateInfoPage = {
    getTitle() {
        return "Cập nhật tài khoản - Trà Sữa Yotea";
    },
    async render() {
        const userInfo = getUser();
        const { data: listProvince } = await getAllProvince();

        let listDistrict;
        let listWard;
        if (userInfo && userInfo.provinceCode) {
            listDistrict = await getDistrict(userInfo.provinceCode);
            listWard = await getWard(userInfo.districtCode);
        }

        return /* html */ `
        ${await Header.render()}

        <!-- content -->
        <main>
            <section class="py-7 bg-gray-100 border-b">
                <div class="container max-w-6xl mx-auto px-3 text-gray-500">
                    <h1 class="uppercase font-semibold text-2xl">My account</h1>
                    <p class="text-sm mt-1">THÔNG TIN TÀI KHOẢN</p>
                </div>
            </section>

            <section class="container max-w-6xl mx-auto px-3 grid grid-cols-12 gap-5 my-8">
                ${MyAccNav.render("update-info")}
                
                <div class="col-span-12 lg:col-span-9">
                    <h2 class="uppercase text-lg font-semibold text-gray-600 pb-1 border-b">Cập nhật thông tin tài khoản</h2>

                    <form action="" class="mt-4" id="form__update-account">
                        <div class="grid grid-cols-12 gap-3">
                            <div class="col-span-12 md:col-span-6">
                                <label for="form__update-account-fullname" class="mb-1 block font-semibold">Họ tên *</label>
                                <input type="text" id="form__update-account-fullname" value="${userInfo.fullName}" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Nhập họ tên">
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>
                            <div class="col-span-12 md:col-span-6">
                                <label for="form__update-account-phone" class="mb-1 block font-semibold">Số điện thoại *</label>
                                <input type="text" id="form__update-account-phone" value="${userInfo.phone}" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Nhập họ tên">
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>
                            <div class="col-span-12">
                                <label for="form__update-account-avatar" class="mb-1 block font-semibold">Ảnh đại diện *</label>
                                <input type="file" id="form__update-account-avatar" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 py-1 text-sm outline-none">
                            </div>
                            
                            <div class="col-span-12">
                                <label for="" class="mb-1 block font-semibold">Xem trước ảnh đại diện</label>
                                <div>
                                    <img src="${userInfo.avatar}" id="form__update-account-preview" class="w-40 h-40 object-cover rounded-md" alt="">
                                </div>
                            </div>

                            <div class="col-span-12 mb-3">
                                <label for="form__update-account-email" class="font-semibold mb-1 block">Email *</label>
                                <input type="text" id="form__update-account-email" value="${userInfo.email}" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Nhập địa chỉ email">
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>
                            
                            ${userInfo && userInfo.provinceCode ? /* html */`
                            <div class="col-span-12 md:col-span-4 mb-3 relative">
                                <label for="form__update-account-province" class="font-semibold mb-1 block">Tỉnh/Thành phố *</label>
                                <select id="form__update-account-province" class="shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)] hover:shadow-none hover:cursor-default focus:shadow-none focus:cursor-text w-full border px-2 h-10 text-sm outline-none">
                                    <option value="">-- Chọn Tỉnh/TP --</option>
                                    ${listProvince.map((item) => `<option value="${item.code}" ${userInfo.provinceCode === item.code ? "selected" : ""}>${item.name}</option>`).join("")}
                                </select>
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>
                            <div class="col-span-12 md:col-span-4 mb-3 relative">
                                <label for="form__update-account-district" class="font-semibold mb-1 block">Quận/Huyện *</label>
                                <select id="form__update-account-district" class="shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)] hover:shadow-none hover:cursor-default focus:shadow-none focus:cursor-text w-full border px-2 h-10 text-sm outline-none">
                                    <option value="">-- Chọn Quận/Huyện --</option>
                                    ${listDistrict.map((item) => `<option value="${item.code}" ${userInfo.districtCode === item.code ? "selected" : ""}>${item.name}</option>`).join("")}
                                </select>
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>
                            <div class="col-span-12 md:col-span-4 mb-3 relative">
                                <label for="form__update-account-ward" class="font-semibold mb-1 block">Xã/Phường *</label>
                                <select id="form__update-account-ward" class="shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)] hover:shadow-none hover:cursor-default focus:shadow-none focus:cursor-text w-full border px-2 h-10 text-sm outline-none">
                                    <option value="">-- Chọn Xã/Phường --</option>
                                    ${listWard.map((item) => `<option value="${item.code}" ${userInfo.wardsCode === item.code ? "selected" : ""}>${item.name}</option>`).join("")}
                                </select>
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>
                            ` : /* html */`
                            <div class="col-span-12 md:col-span-4 mb-3 relative">
                                <label for="form__update-account-province" class="font-semibold mb-1 block">Tỉnh/Thành phố *</label>
                                <select id="form__update-account-province" class="shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)] hover:shadow-none hover:cursor-default focus:shadow-none focus:cursor-text w-full border px-2 h-10 text-sm outline-none">
                                    <option value="">-- Chọn Tỉnh/TP --</option>
                                    ${listProvince.map((item) => `<option value="${item.code}">${item.name}</option>`).join("")}
                                </select>
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>
                            <div class="col-span-12 md:col-span-4 mb-3 relative">
                                <label for="form__update-account-district" class="font-semibold mb-1 block">Quận/Huyện *</label>
                                <select id="form__update-account-district" class="shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)] hover:shadow-none hover:cursor-default focus:shadow-none focus:cursor-text w-full border px-2 h-10 text-sm outline-none">
                                    <option value="">-- Chọn Quận/Huyện --</option>
                                </select>
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>
                            <div class="col-span-12 md:col-span-4 mb-3 relative">
                                <label for="form__update-account-ward" class="font-semibold mb-1 block">Xã/Phường *</label>
                                <select id="form__update-account-ward" class="shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)] hover:shadow-none hover:cursor-default focus:shadow-none focus:cursor-text w-full border px-2 h-10 text-sm outline-none">
                                    <option value="">-- Chọn Xã/Phường --</option>
                                </select>
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>
                            `}

                            <div class="col-span-12 mb-3">
                                <label for="form__update-account-add" class="font-semibold mb-1 block">Địa chỉ cụ thể *</label>
                                <input type="text" id="form__update-account-add" value="${userInfo.address}" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Nhập Thôn/Xóm/TDP">
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>
                        </div>

                        <button class="mt-4 px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Cập nhật</button>
                    </form>
                </div>
            </section>
        </main>
        <!-- end content -->

        ${Footer.render()}
        `;
    },
    afterRender() {
        Header.afterRender();
        Footer.afterRender();
        MyAccNav.afterRender();

        const formUpdate = document.querySelector("#form__update-account");
        const provinceElement = formUpdate.querySelector("#form__update-account-province");
        const districtElement = formUpdate.querySelector("#form__update-account-district");
        const wardElement = formUpdate.querySelector("#form__update-account-ward");
        const fullName = formUpdate.querySelector("#form__update-account-fullname");
        const email = formUpdate.querySelector("#form__update-account-email");
        const phone = formUpdate.querySelector("#form__update-account-phone");
        const address = formUpdate.querySelector("#form__update-account-add");
        const avatar = formUpdate.querySelector("#form__update-account-avatar");
        const avatarPreview = formUpdate.querySelector("#form__update-account-preview");

        const validate = () => {
            let isValid = true;

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

            if (!address.value) {
                address.nextElementSibling.innerText = "Vui lòng nhập địa chỉ";
                isValid = false;
            } else {
                address.nextElementSibling.innerText = "";
            }

            if (!provinceElement.value) {
                provinceElement.nextElementSibling.innerText = "Vui lòng chọn Tỉnh/TP";
                isValid = false;
            } else {
                provinceElement.nextElementSibling.innerText = "";
            }

            if (!districtElement.value) {
                districtElement.nextElementSibling.innerText = "Vui lòng chọn Quận/Huyện";
                isValid = false;
            } else {
                districtElement.nextElementSibling.innerText = "";
            }

            if (!wardElement.value) {
                wardElement.nextElementSibling.innerText = "Vui lòng chọn Xã/Phường";
                isValid = false;
            } else {
                wardElement.nextElementSibling.innerText = "";
            }

            return isValid;
        };

        formUpdate.addEventListener("submit", async (e) => {
            e.preventDefault();

            const isValid = validate();
            if (isValid) {
                // get user info
                const userInfo = getUser();
                let userAvatar = userInfo.avatar;

                // nếu cập nhật avatar
                if (avatar.files.length) {
                    const { data } = await uploadFile(avatar.files[0]);
                    userAvatar = data.url;
                }

                userInfo.email = email.value;
                userInfo.fullName = fullName.value;
                userInfo.phone = phone.value;
                userInfo.avatar = userAvatar;
                userInfo.wardsCode = +wardElement.value;
                userInfo.districtCode = +districtElement.value;
                userInfo.provinceCode = +provinceElement.value;
                userInfo.address = address.value;

                update(userInfo.id, userInfo)
                    .then(() => saveUser(userInfo))
                    .then(() => toastr.success("Cập nhật thành công"))
                    .then(() => reRender(UpdateInfoPage, "#app"));
            }
        });

        // bắt sự kiện chọn tỉnh/tp
        provinceElement.addEventListener("change", async (e) => {
            const provinceCode = e.target.value;
            const districtList = await getDistrict(provinceCode);
            let htmlDistrict = `<option value="">-- Chọn Tỉnh/TP --</option>`;
            districtList.forEach((item) => {
                htmlDistrict += `<option value="${item.code}">${item.name}</option>`;
            });

            districtElement.innerHTML = htmlDistrict;
        });

        // bắt sự kiện chọn quận/huyện
        districtElement.addEventListener("change", async (e) => {
            const districtCode = e.target.value;
            const wardList = await getWard(districtCode);
            let htmlWard = `<option value="">-- Chọn Xã/Phường --</option>`;
            wardList.forEach((item) => {
                htmlWard += `<option value="${item.code}">${item.name}</option>`;
            });

            wardElement.innerHTML = htmlWard;
        });

        // bắt sự kiện đổi avatar
        avatar.addEventListener("change", (e) => {
            avatarPreview.src = URL.createObjectURL(e.target.files[0]);
        });
    },
};

export default UpdateInfoPage;