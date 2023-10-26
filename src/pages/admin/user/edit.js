import toastr from "toastr";
import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import validate from "jquery-validation";
import AdminUserListPage from ".";
import { getAllProvince, getDistrict, getWard } from "../../../api/location";
import { update, get } from "../../../api/user";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { reRender, uploadFile } from "../../../utils";

const AdminEditUserPage = {
    getTitle() {
        return "Update Voucher | Administrator";
    },
    async render(id) {
        const { data: userDetail } = await get(id);
        const { data: listProvince } = await getAllProvince();

        let listDistrict;
        let listWard;
        if (userDetail.provinceCode) {
            listDistrict = await getDistrict(userDetail.provinceCode);
            listWard = await getWard(userDetail.districtCode);
        }
        return /* html */ `
        <section class="min-h-screen bg-gray-50 dashboard">
            ${AdminNav.render("user")}
            
            <div class="ml-0 transition md:ml-60">
                <header class="left-0 md:left-60 fixed right-0 top-0 z-20">
                    ${HeaderTop.render()}

                    <div class="px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
                        <div class="flex items-center text-sm text-gray-600">
                            <h5 class="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
                            User
                            </h5>
                            <span>Update user</span>
                        </div>

                        <a href="/#/admin/user">
                            <button type="button" class="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                DS user
                            </button>
                        </a>
                    </div>
                </header>
                <div class="p-6 mt-24">
                    <form action="" method="POST" id="form__edit-user" data-id="">
                        <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <span class="font-semibold mb-4 block text-xl">Thông tin chi tiết user:</span>

                                <div class="grid grid-cols-6 gap-3">
                                    <div class="col-span-6">
                                        <label for="form__edit-user-fullname" class="block text-sm font-medium text-gray-700">Họ và tên</label>
                                        <input type="text" name="form__edit-user-fullname" id="form__edit-user-fullname" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập tên đầy đủ" value="${userDetail.fullName}">
                                        <div class="text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="form__edit-user-username" class="block text-sm font-medium text-gray-700">Username</label>
                                        <input type="text" name="form__edit-user-username" id="form__edit-user-username" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập username" value="${userDetail.username}">
                                        <div class="text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="form__edit-user-phone" class="block text-sm font-medium text-gray-700">Số điện thoại</label>
                                        <input type="text" name="form__edit-user-phone" id="form__edit-user-phone" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập sdt" value="${userDetail.phone}">
                                        <div class="text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="form__edit-user-role" class="block text-sm font-medium text-gray-700">Vai trò</label>
                                        <select id="form__edit-user-role" name="form__edit-user-role" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn vai trò --</option>
                                            <option value="0" ${!userDetail.role ? "selected" : ""}>Khách hàng</option>
                                            <option value="1" ${userDetail.role ? "selected" : ""}>Admin</option>
                                        </select>
                                        <div class="form__edit-cate-error-img text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="form__edit-user-stt" class="block text-sm font-medium text-gray-700">Trạng thái</label>
                                        <select id="form__edit-user-stt" name="form__edit-user-stt" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn trạng thái tài khoản --</option>
                                            <option value="0" ${!userDetail.active ? "selected" : ""}>Khóa</option>
                                            <option value="1" ${userDetail.active ? "selected" : ""}>Kích hoạt</option>
                                        </select>
                                        <div class="form__edit-cate-error-img text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6">
                                        <label for="form__edit-user-email" class="block text-sm font-medium text-gray-700">Email</label>
                                        <input type="text" name="form__edit-user-email" id="form__edit-user-email" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập email" value="${userDetail.email}">
                                        <div class="text-sm mt-0.5 text-red-500"></div>
                                    </div>
                                    
                                    ${userDetail.provinceCode ? /* html */`
                                    <div class="col-span-6 md:col-span-2">
                                        <label for="form__edit-user-province" class="block text-sm font-medium text-gray-700">Tỉnh/TP</label>
                                        <select id="form__edit-user-province" name="form__edit-user-province" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn Tỉnh/TP --</option>
                                            ${listProvince.map((item) => `<option value="${item.code}" ${userDetail.provinceCode === item.code ? "selected" : ""}>${item.name}</option>`).join("")}
                                        </select>
                                        <div class="form__edit-cate-error-img text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6 md:col-span-2">
                                        <label for="form__edit-user-district" class="block text-sm font-medium text-gray-700">Quận/Huyện</label>
                                        <select id="form__edit-user-district" name="form__edit-user-district" class="form-control mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn Quận/Huyện --</option>
                                            ${listDistrict.map((item) => `<option value="${item.code}" ${userDetail.districtCode === item.code ? "selected" : ""}>${item.name}</option>`).join("")}
                                        </select>
                                        <div class="form__edit-cate-error-img text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6 md:col-span-2">
                                        <label for="form__edit-user-ward" class="block text-sm font-medium text-gray-700">Xã/Phường</label>
                                        <select id="form__edit-user-ward" name="form__edit-user-ward" class="form-control mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn Xã/Phường --</option>
                                            ${listWard.map((item) => `<option value="${item.code}" ${userDetail.wardsCode === item.code ? "selected" : ""}>${item.name}</option>`).join("")}
                                        </select>
                                        <div class="form__edit-cate-error-img text-sm mt-0.5 text-red-500"></div>
                                    </div>
                                    ` : /* html */`
                                    <div class="col-span-6 md:col-span-2">
                                        <label for="form__edit-user-province" class="block text-sm font-medium text-gray-700">Tỉnh/TP</label>
                                        <select id="form__edit-user-province" name="form__edit-user-province" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn Tỉnh/TP --</option>
                                            ${listProvince.map((item) => `<option value="${item.code}">${item.name}</option>`).join("")}
                                        </select>
                                        <div class="form__edit-cate-error-img text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6 md:col-span-2">
                                        <label for="form__edit-user-district" class="block text-sm font-medium text-gray-700">Quận/Huyện</label>
                                        <select id="form__edit-user-district" name="form__edit-user-district" class="form-control mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn Quận/Huyện --</option>
                                        </select>
                                        <div class="form__edit-cate-error-img text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6 md:col-span-2">
                                        <label for="form__edit-user-ward" class="block text-sm font-medium text-gray-700">Xã/Phường</label>
                                        <select id="form__edit-user-ward" name="form__edit-user-ward" class="form-control mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn Xã/Phường --</option>
                                        </select>
                                        <div class="form__edit-cate-error-img text-sm mt-0.5 text-red-500"></div>
                                    </div>
                                    `}

                                    <div class="col-span-6">
                                        <label for="form__edit-user-address" class="block text-sm font-medium text-gray-700">Địa chỉ hiện tại</label>
                                        <input type="text" name="form__edit-user-address" id="form__edit-user-address" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập thôn/xóm/TDP" value="${userDetail.address}">
                                        <div class="text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6">
                                        <label for="form__edit-user-password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
                                        <input type="password" name="form__edit-user-password" id="form__edit-user-password" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập mật khẩu" value="${userDetail.password}">
                                        <div class="text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6">
                                        <label for="form__edit-user-confirm" class="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                                        <input type="password" name="form__edit-user-confirm" id="form__edit-user-confirm" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Xác nhận mật khẩu" value="${userDetail.password}">
                                        <div class="text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-3">
                                        <label class="block text-sm font-medium text-gray-700">Xem trước ảnh</label>
                                        <div class="mt-1">
                                            <img src="${userDetail.avatar}" alt="Preview Image" id="form__edit-user-preview" class="h-40 w-40 rounded-full object-cover">
                                        </div>
                                    </div>

                                    <div class="col-span-6">
                                        <label class="block text-sm font-medium text-gray-700">Ảnh đại diện</label>
                                        <div class="w-full mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div class="space-y-1 text-center">
                                                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                                <div class="flex text-sm text-gray-600">
                                                    <label for="form__edit-user-avatar" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input id="form__edit-user-avatar" name="form__edit-user-avatar" type="file" class="sr-only">
                                                    </label>
                                                    <p class="pl-1">or drag and drop</p>
                                                </div>
                                                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                        <div class="form__edit-cate-error-img text-sm mt-0.5 text-red-500"></div>
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
    async afterRender(id) {
        HeaderTop.afterRender();
        AdminNav.afterRender();

        const fullName = $("#form__edit-user-fullname");
        const username = $("#form__edit-user-username");
        const phone = $("#form__edit-user-phone");
        const email = $("#form__edit-user-email");
        const role = $("#form__edit-user-role");
        const status = $("#form__edit-user-stt");
        const password = $("#form__edit-user-password");
        const avatar = document.querySelector("#form__edit-user-avatar");
        const avatarPreview = $("#form__edit-user-preview");
        const provinceElement = $("#form__edit-user-province");
        const districtElement = $("#form__edit-user-district");
        const wardElement = $("#form__edit-user-ward");
        const address = $("#form__edit-user-address");

        const { data: userDetail } = await get(id);

        // validate
        $("#form__edit-user").validate({
            rules: {
                "form__edit-user-fullname": "required",
                "form__edit-user-username": {
                    required: true,
                },
                "form__edit-user-phone": {
                    required: true,
                    valid_phone: true,
                },
                "form__edit-user-email": {
                    required: true,
                    email: true,
                },
                "form__edit-user-role": "required",
                "form__edit-user-stt": "required",
                "form__edit-user-password": {
                    required: true,
                    minlength: 4,
                },
                "form__edit-user-confirm": {
                    required: true,
                    equalTo: "#form__edit-user-password",
                },
                "form__edit-user-province": "required",
                "form__edit-user-district": "required",
                "form__edit-user-ward": "required",
                "form__edit-user-address": "required",
            },
            messages: {
                "form__edit-user-fullname": "Vui lòng nhập họ tên",
                "form__edit-user-username": {
                    required: "Vui lòng nhập tên đăng nhập",
                },
                "form__edit-user-phone": {
                    required: "Vui lòng nhập số điện thoại",
                    valid_phone: "Số điện thoại không đúng định dạng",
                },
                "form__edit-user-email": {
                    required: "Vui lòng nhập email",
                    email: "Email không đúng định dạng",
                },
                "form__edit-user-role": "Vui lòng chọn vai trò",
                "form__edit-user-stt": "Vui lòng chọn trạng thái tài khoản",
                "form__edit-user-password": {
                    required: "Vui lòng nhập mật khẩu",
                    minlength: "Mật khẩu tối thiểu 4 ký tự",
                },
                "form__edit-user-confirm": {
                    required: "Vui lòng nhập mật khẩu xác nhận",
                    equalTo: "Mật khẩu xác nhận không chính xác",
                },
                "form__edit-user-province": "Vui lòng chọn Tỉnh/TP",
                "form__edit-user-district": "Vui lòng chọn Quận/Huyện",
                "form__edit-user-ward": "Vui lòng chọn Xã/Phường",
                "form__edit-user-address": "Trường này không thể bỏ trống",
            },
            submitHandler() {
                (async () => {
                    const userData = {
                        email: email.val(),
                        username: username.val(),
                        fullName: fullName.val(),
                        phone: phone.val(),
                        wardsCode: +wardElement.val(),
                        districtCode: +districtElement.val(),
                        provinceCode: +provinceElement.val(),
                        address: address.val(),
                        role: +role.val(),
                        active: +status.val(),
                    };

                    // nếu cập nhật avatar
                    if (avatar.files.length) {
                        const { data } = await uploadFile(avatar.files[0]);
                        userData.avatar = data.url;
                    }

                    // nếu cập nhật mật khẩu
                    if (password.val() !== userDetail.password) {
                        userData.password = password.val();
                    }

                    update(id, userData)
                        .then(() => toastr.success("Cập nhật thành công"))
                        .then(() => { window.location.href = "/#/admin/user"; })
                        .then(() => reRender(AdminUserListPage, "#app"));
                })();
            },
        });

        $.validator.addMethod("valid_phone", (value) => {
            const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
            return regexPhone.test(value);
        });
