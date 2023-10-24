import toastr from "toastr";
import { get, update } from "../../../api/address";
import { getAllProvince, getDistrict, getWard } from "../../../api/location";
import Footer from "../../../components/user/footer";
import Header from "../../../components/user/header";
import MyAccNav from "../../../components/user/myAccNav";

const MyAccEditAddressPage = {
    getTitle() {
        return `Cập nhật thông tin thanh toán - Trà Sữa Yotea`;
    },
    async render(id) {
        // get address detail
        const { data: addressDetail } = await get(id);

        const { data: listProvince } = await getAllProvince();
        const listDistrict = await getDistrict(addressDetail.provinceCode);
        const listWard = await getWard(addressDetail.districtCode);

        return /* html */`
        ${await Header.render()}

        <!-- content -->
        <main>
            <section class="py-7 bg-gray-100 border-b">
                <div class="container max-w-6xl mx-auto px-3 text-gray-500">
                    <h1 class="uppercase font-semibold text-2xl">My account</h1>
                    <p class="text-sm mt-1">THÔNG TIN THANH TOÁN</p>
                </div>
            </section>

            <section class="container max-w-6xl mx-auto px-3 grid grid-cols-12 gap-5 my-8">
                ${MyAccNav.render("address")}
                
                <div class="col-span-12 lg:col-span-9">
                    <h2 class="uppercase text-lg font-semibold text-gray-600 pb-1 border-b">Cập nhật thông tin thanh toán</h2>

                    <form action="" class="mt-4" id="form__update-address">
                        <div class="grid grid-cols-12 gap-3">
                            <div class="col-span-12 md:col-span-6">
                                <label for="form__update-address-fullname" class="mb-1 block font-semibold">Họ tên *</label>
                                <input type="text" id="form__update-address-fullname" value="${addressDetail.fullName}" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Nhập họ tên">
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>
                            <div class="col-span-12 md:col-span-6">
                                <label for="form__update-address-phone" class="mb-1 block font-semibold">Số điện thoại *</label>
                                <input type="text" id="form__update-address-phone" value="${addressDetail.phone}" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Nhập họ tên">
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>

                            <div class="col-span-12 mb-3">
                                <label for="form__update-address-email" class="font-semibold mb-1 block">Email *</label>
                                <input type="text" id="form__update-address-email" value="${addressDetail.email}" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Nhập địa chỉ email">
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>
                            
                            <div class="col-span-12 md:col-span-4 mb-3 relative">
                                <label for="form__update-address-province" class="font-semibold mb-1 block">Tỉnh/Thành phố *</label>
                                <select id="form__update-address-province" class="shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)] hover:shadow-none hover:cursor-default focus:shadow-none focus:cursor-text w-full border px-2 h-10 text-sm outline-none">
                                    <option value="">-- Chọn Tỉnh/TP --</option>
                                    ${listProvince.map((item) => `<option value="${item.code}" ${addressDetail.provinceCode === item.code ? "selected" : ""}>${item.name}</option>`).join("")}
                                </select>
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>
                            <div class="col-span-12 md:col-span-4 mb-3 relative">
                                <label for="form__update-address-district" class="font-semibold mb-1 block">Quận/Huyện *</label>
                                <select id="form__update-address-district" class="shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)] hover:shadow-none hover:cursor-default focus:shadow-none focus:cursor-text w-full border px-2 h-10 text-sm outline-none">
                                    <option value="">-- Chọn Quận/Huyện --</option>
                                    ${listDistrict.map((item) => `<option value="${item.code}" ${addressDetail.districtCode === item.code ? "selected" : ""}>${item.name}</option>`).join("")}
                                </select>
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>
                            <div class="col-span-12 md:col-span-4 mb-3 relative">
                                <label for="form__update-address-ward" class="font-semibold mb-1 block">Xã/Phường *</label>
                                <select id="form__update-address-ward" class="shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)] hover:shadow-none hover:cursor-default focus:shadow-none focus:cursor-text w-full border px-2 h-10 text-sm outline-none">
                                    <option value="">-- Chọn Xã/Phường --</option>
                                    ${listWard.map((item) => `<option value="${item.code}" ${addressDetail.wardCode === item.code ? "selected" : ""}>${item.name}</option>`).join("")}
                                </select>
                                <div class="text-sm mt-0.5 text-red-500"></div>
                            </div>

                            <div class="col-span-12 mb-3">
                                <label for="form__update-address-add" class="font-semibold mb-1 block">Địa chỉ cụ thể *</label>
                                <input type="text" id="form__update-address-add" value="${addressDetail.address}" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="Nhập Thôn/Xóm/TDP">
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
    afterRender(id) {
        Header.afterRender();
        Footer.afterRender();
        MyAccNav.afterRender();

        const formUpdate = document.querySelector("#form__update-address");
        const provinceElement = formUpdate.querySelector("#form__update-address-province");
        const districtElement = formUpdate.querySelector("#form__update-address-district");
        const wardElement = formUpdate.querySelector("#form__update-address-ward");
        const fullName = formUpdate.querySelector("#form__update-address-fullname");
        const email = formUpdate.querySelector("#form__update-address-email");
        const phone = formUpdate.querySelector("#form__update-address-phone");
        const address = formUpdate.querySelector("#form__update-address-add");

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

        formUpdate.addEventListener("submit", (e) => {
            e.preventDefault();

            const isValid = validate();

            if (isValid) {
                update(id, {
                    fullName: fullName.value,
                    phone: phone.value,
                    email: email.value,
                    provinceCode: +provinceElement.value,
                    districtCode: +districtElement.value,
                    wardCode: +wardElement.value,
                    address: address.value,
                })
                    .then(() => toastr.success("Cập nhật thành công"))
                    .then(() => { window.location.href = "/#/my-account/address"; });
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
    },
};

export default MyAccEditAddressPage;