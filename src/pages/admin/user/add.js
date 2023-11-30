import toastr from "toastr";
import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import validate from "jquery-validation";
import { getAllProvince, getDistrict, getWard } from "../../../api/location";
import { add,getUserByEmail } from "../../../api/user";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { reRender, uploadFile } from "../../../utils";

const AdminAddUserPage = {
    getTitle() {
        return "Add User | Administrator";
    },
    async render() {
        const { data: listProvince } = await getAllProvince();
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
                            <span>Thêm user</span>
                        </div>

                        <a href="/#/admin/user">
                            <button type="button" class="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                DS user
                            </button>
                        </a>
                    </div>
                </header>
                <div class="p-6 mt-24">
                    <form action="" method="POST" id="form__add-user">
                        <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <span class="font-semibold mb-4 block text-xl">Thông tin chi tiết user:</span>

                                <div class="grid grid-cols-6 gap-3">
                                    <div class="col-span-6">
                                        <label for="form__add-user-fullname" class="block text-sm font-medium text-gray-700">Họ và tên</label>
                                        <input type="text" name="form__add-user-fullname" id="form__add-user-fullname" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập tên đầy đủ">
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="form__add-user-username" class="block text-sm font-medium text-gray-700">Username</label>
                                        <input type="text" name="form__add-user-username" id="form__add-user-username" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập username">
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="form__add-user-phone" class="block text-sm font-medium text-gray-700">Số điện thoại</label>
                                        <input type="text" name="form__add-user-phone" id="form__add-user-phone" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập sdt">
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="form__add-user-role" class="block text-sm font-medium text-gray-700">Vai trò</label>
                                        <select id="form__add-user-role" name="form__add-user-role" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn vai trò --</option>
                                            <option value="0" selected>Khách hàng</option>
                                            <option value="1">Admin</option>
                                        </select>
                                        <div class="form__add-cate-error-img text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="form__add-user-stt" class="block text-sm font-medium text-gray-700">Trạng thái</label>
                                        <select id="form__add-user-stt" name="form__add-user-stt" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn trạng thái tài khoản --</option>
                                            <option value="0" selected>Khóa</option>
                                            <option value="1">Kích hoạt</option>
                                        </select>
                                        <div class="form__add-cate-error-img text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6">
                                        <label for="form__add-user-email" class="block text-sm font-medium text-gray-700">Email</label>
                                        <input type="text" name="form__add-user-email" id="form__add-user-email" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập email">
                                    </div>
                                    
                                    <div class="col-span-6 md:col-span-2">
                                        <label for="form__add-user-province" class="block text-sm font-medium text-gray-700">Tỉnh/TP</label>
                                        <select id="form__add-user-province" name="form__add-user-province" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn Tỉnh/TP --</option>
                                            ${listProvince.map((item) => `<option value="${item.code}">${item.name}</option>`).join("")}
                                        </select>
                                        <div class="form__add-cate-error-img text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6 md:col-span-2">
                                        <label for="form__add-user-district" class="block text-sm font-medium text-gray-700">Quận/Huyện</label>
                                        <select id="form__add-user-district" name="form__add-user-district" disabled class="form-control mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn Quận/Huyện --</option>
                                        </select>
                                        <div class="form__add-cate-error-img text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6 md:col-span-2">
                                        <label for="form__add-user-ward" class="block text-sm font-medium text-gray-700">Xã/Phường</label>
                                        <select id="form__add-user-ward" name="form__add-user-ward" disabled class="form-control mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn Xã/Phường --</option>
                                        </select>
                                        <div class="form__add-cate-error-img text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6">
                                        <label for="form__add-user-address" class="block text-sm font-medium text-gray-700">Địa chỉ hiện tại</label>
                                        <input type="text" name="form__add-user-address" id="form__add-user-address" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập thôn/xóm/TDP">
                                    </div>

                                    <div class="col-span-6">
                                        <label for="form__add-user-password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
                                        <input type="password" name="form__add-user-password" id="form__add-user-password" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập mật khẩu">
                                    </div>

                                    <div class="col-span-6">
                                        <label for="form__add-user-confirm" class="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                                        <input type="password" name="form__add-user-confirm" id="form__add-user-confirm" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Xác nhận mật khẩu">
                                    </div>

                                    <div class="col-span-3">
                                        <label class="block text-sm font-medium text-gray-700">Xem trước ảnh</label>
                                        <div class="mt-1">
                                            <img src=">
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
                                                    <label for="form__add-user-avatar" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input id="form__add-user-avatar" name="form__add-user-avatar" type="file" class="sr-only">
                                                    </label>
                                                    <p class="pl-1">or drag and drop</p>
                                                </div>
                                                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                        <div class="form__add-cate-error-img text-sm mt-0.5 text-red-500"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Thêm tài khoản
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
    afterRender() {
        HeaderTop.afterRender();
        AdminNav.afterRender();

        const fullName = $("#form__add-user-fullname");
        const username = $("#form__add-user-username");
        const phone = $("#form__add-user-phone");
        const email = $("#form__add-user-email");
        const role = $("#form__add-user-role");
        const status = $("#form__add-user-stt");
        const password = $("#form__add-user-password");
        const avatar = document.querySelector("#form__add-user-avatar");
        const avatarPreview = $("#form__add-user-preview");
        const provinceElement = $("#form__add-user-province");
        const districtElement = $("#form__add-user-district");
        const wardElement = $("#form__add-user-ward");
        const address = $("#form__add-user-address");

        // validate
        $("#form__add-user").validate({
            rules: {
                "form__add-user-fullname": "required",
                "form__add-user-username": {
                    required: true,
                },
                "form__add-user-phone": {
                    required: true,
                    valid_phone: true,
                },
                "form__add-user-email": {
                    required: true,
                    email: true,
                },
                "form__add-user-role": "required",
                "form__add-user-stt": "required",
                "form__add-user-password": {
                    required: true,
                    minlength: 4,
                },
                "form__add-user-confirm": {
                    required: true,
                    equalTo: "#form__add-user-password",
                },
                "form__add-user-province": "required",
                "form__add-user-district": "required",
                "form__add-user-ward": "required",
                "form__add-user-address": "required",
            },
            messages: {
                "form__add-user-fullname": "Vui lòng nhập họ tên",
                "form__add-user-username": {
                    required: "Vui lòng nhập tên đăng nhập",
                },
                "form__add-user-phone": {
                    required: "Vui lòng nhập số điện thoại",
                    valid_phone: "Số điện thoại không đúng định dạng",
                },
                "form__add-user-email": {
                    required: "Vui lòng nhập email",
                    email: "Email không đúng định dạng",
                },
                "form__add-user-role": "Vui lòng chọn vai trò",
                "form__add-user-stt": "Vui lòng chọn trạng thái tài khoản",
                "form__add-user-password": {
                    required: "Vui lòng nhập mật khẩu",
                    minlength: "Mật khẩu tối thiểu 4 ký tự",
                },
                "form__add-user-confirm": {
                    required: "Vui lòng nhập mật khẩu xác nhận",
                    equalTo: "Mật khẩu xác nhận không chính xác",
                },
                "form__add-user-province": "Vui lòng chọn Tỉnh/TP",
                "form__add-user-district": "Vui lòng chọn Quận/Huyện",
                "form__add-user-ward": "Vui lòng chọn Xã/Phường",
                "form__add-user-address": "Trường này không thể bỏ trống",
            },
            submitHandler() {
                (async () => {
                    const { data } = await getUserByEmail(email.val());
                    if(data.length > 0){
                        toastr.error("Email này đã được đăng ký");
                        return;
                    }
                    let avatarUrl = "";
                    if (avatar.files.length) {
                        const { data } = await uploadFile(avatar.files[0]);
                        avatarUrl = data.url;
                    }
                    const date = new Date();

                    const userData = {
                        email: email.val(),
                        password: password.val(),
                        username: username.val(),
                        fullName: fullName.val(),
                        phone: phone.val(),
                        wardsCode: +wardElement.val(),
                        districtCode: +districtElement.val(),
                        provinceCode: +provinceElement.val(),
                        address: address.val(),
                        avatar: avatarUrl,
                        role: +role.val(),
                        active: +status.val(),
                        createdAt: date.toISOString(),
                    };

                    add(userData)
                        .then(() => toastr.success("Thêm thành công"))
                        .then(() => reRender(AdminAddUserPage, "#app"));
                })();
            },
        });

        $.validator.addMethod("valid_phone", (value) => {
            const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
            return regexPhone.test(value);
        });
           // bắt sự kiện đổi avatar
           avatar.addEventListener("change", (e) => {
            avatarPreview.attr("src", URL.createObjectURL(e.target.files[0]));
        });

        // bắt sự kiện chọn tỉnh/tp
        provinceElement.on("change", async (e) => {
            const provinceCode = e.target.value;
            const districtList = await getDistrict(provinceCode);
            let htmlDistrict = `<option value="">-- Chọn Tỉnh/TP --</option>`;
            districtList.forEach((item) => {
                htmlDistrict += `<option value="${item.code}">${item.name}</option>`;
            });

            districtElement.removeAttr("disabled");
            districtElement.html(htmlDistrict);
        });

        // bắt sự kiện chọn quận/huyện
        districtElement.on("change", async (e) => {
            const districtCode = e.target.value;
            const wardList = await getWard(districtCode);
            let htmlWard = `<option value="">-- Chọn Xã/Phường --</option>`;
            wardList.forEach((item) => {
                htmlWard += `<option value="${item.code}">${item.name}</option>`;
            });

            wardElement.removeAttr("disabled");
            wardElement.html(htmlWard);
        });
    },
};

export default AdminAddUserPage;