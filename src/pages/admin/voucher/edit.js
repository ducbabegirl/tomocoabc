import toastr from "toastr";
import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import validate from "jquery-validation";
import AdminSizeListPage from ".";
import { get, update,getVoucherByNameEdit } from "../../../api/voucher";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { reRender } from "../../../utils";

const AdminEditVoucherPage = {
    getTitle() {
        return "Update Voucher | Administrator";
    },
    async render(id) {
        const { data: voucherDetail } = await get(id);

        return /* html */ `
        <section class="min-h-screen bg-gray-50 dashboard">
            ${AdminNav.render("voucher")}
            
            <div class="ml-0 transition md:ml-60">
                <header class="left-0 md:left-60 fixed right-0 top-0">
                    ${HeaderTop.render()}

                    <div class="px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
                        <div class="flex items-center text-sm text-gray-600">
                            <h5 class="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
                            Voucher
                            </h5>
                            <span>Thêm voucher</span>
                        </div>

                        <a href="/#/admin/voucher">
                            <button type="button" class="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                DS voucher
                            </button>
                        </a>
                    </div>
                </header>
                <div class="p-6 mt-24">
                    <form action="" method="POST" id="form__edit-voucher" data-id="${voucherDetail.id}">
                        <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <span class="font-semibold mb-4 block text-xl">Thông tin chi tiết voucher:</span>

                                <div class="grid grid-cols-6 gap-3">
                                    <div class="col-span-6">
                                        <label for="form__edit-voucher-code" class="block text-sm font-medium text-gray-700">Mã voucher</label>
                                        <input type="text" name="form__edit-voucher-code" id="form__edit-voucher-code" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập mã voucher" value="${voucherDetail.code}">
                                    </div>

                                    <div class="col-span-6">
                                        <label for="form__edit-voucher-quantity" class="block text-sm font-medium text-gray-700">Số lượng voucher</label>
                                        <input type="number" name="form__edit-voucher-quantity" id="form__edit-voucher-quantity" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập số lượng voucher" value="${voucherDetail.quantity}">
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="form__edit-voucher-condition" class="block text-sm font-medium text-gray-700">Giảm theo</label>
                                        <select id="form__edit-voucher-condition" name="form__edit-voucher-condition" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn loại giảm --</option>
                                            <option value="0" ${!voucherDetail.condition ? "selected" : ""}>Phần trăm</option>
                                            <option value="1" ${voucherDetail.condition ? "selected" : ""}>Tiền</option>
                                        </select>
                                        <div class="form__add-cate-error-img text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="form__edit-voucher-stt" class="block text-sm font-medium text-gray-700">Trạng thái</label>
                                        <select id="form__edit-voucher-stt" name="form__edit-voucher-stt" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn trạng thái voucher --</option>
                                            <option value="0" ${!voucherDetail.status ? "selected" : ""}>Khóa</option>
                                            <option value="1" ${voucherDetail.status ? "selected" : ""}>Kích hoạt</option>
                                        </select>
                                        <div class="form__add-cate-error-img text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6">
                                        <label for="form__edit-voucher-number" class="block text-sm font-medium text-gray-700">Số lượng giảm</label>
                                        <input type="number" name="form__edit-voucher-number" id="form__edit-voucher-number" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập % giảm/tiền giảm" value="${voucherDetail.conditionNumber}">
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="form__edit-voucher-start" class="block text-sm font-medium text-gray-700">Bắt đầu lúc</label>
                                        <input type="datetime-local" name="form__edit-voucher-start" id="form__edit-voucher-start" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value="${voucherDetail.timeStart}">
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="form__edit-voucher-end" class="block text-sm font-medium text-gray-700">Kết thúc lúc</label>
                                        <input type="datetime-local" name="form__edit-voucher-end" id="form__edit-voucher-end" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value="${voucherDetail.timeEnd}">
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
    afterRender(id) {
        HeaderTop.afterRender();
        AdminNav.afterRender();

        const voucherCode = $("#form__edit-voucher-code");
        const voucherQuantity = $("#form__edit-voucher-quantity");
        const voucherCondition = $("#form__edit-voucher-condition");
        const voucherStt = $("#form__edit-voucher-stt");
        const voucherNumber = $("#form__edit-voucher-number");
        const voucherTimeStart = $("#form__edit-voucher-start");
        const voucherTimeEnd = $("#form__edit-voucher-end");

        $("#form__edit-voucher").validate({
            rules: {
                "form__edit-voucher-code": {
                    required: true,
                },
                "form__edit-voucher-quantity": {
                    required: true,
                },
                "form__edit-voucher-condition": "required",
                "form__edit-voucher-stt": "required",
                "form__edit-voucher-number": {
                    required: true,
                    number: true,
                    valid_percent: true,
                },
                "form__edit-voucher-start": "required",
                "form__edit-voucher-end": {
                    required: true,
                    valid_time: true,
                },
            },
            messages: {
                "form__edit-voucher-code": {
                    required: "Vui lòng nhập mã Voucher",
                },
                "form__edit-voucher-quantity": {
                    required: "Vui lòng nhập số lượng Voucher",
                },
                "form__edit-voucher-condition": "Vui lòng chọn loại giảm",
                "form__edit-voucher-stt": "Vui lòng chọn trạng thái Voucher",
                "form__edit-voucher-number": {
                    required: "Vui lòng nhập số lượng giảm",
                    number: "Không đúng định dạng, vui lòng nhập lại",
                    valid_percent: "Vui lòng nhập lại % giảm giá",
                },
                "form__edit-voucher-start": "Vui lòng nhập thời gian hiệu lực voucher",
                "form__edit-voucher-end": {
                    required: "Vui lòng nhập thời gian hết hiệu lực voucher",
                    valid_time: "Vui lòng nhập lại",
                },
            },
            submitHandler() {
                (async () => {
                    const { data } = await getVoucherByNameEdit(voucherCode.val().toUpperCase(),id);
                    console.log(data);
                    if(data.length > 0){
                        toastr.error("Tên danh mục đã tồn tại");
                        return;
                    }
                    const date = new Date();
                    const cateData = {
                        code: voucherCode.val().toUpperCase(),
                        quantity: +voucherQuantity.val(),
                        condition: +voucherCondition.val(),
                        conditionNumber: +voucherNumber.val(),
                        status: +voucherStt.val(),
                        timeStart: voucherTimeStart.val(),
                        timeEnd: voucherTimeEnd.val(),
                        updatedAt: date.toISOString(),
                    };

                    update(id, cateData)
                        .then(() => toastr.success("Cập nhật thành công"))
                        .then(() => { window.location.href = "/#/admin/voucher"; })
                        .then(() => reRender(AdminSizeListPage, "#app"));
                })();
            },
        });

        $.validator.addMethod("valid_time", () => voucherTimeEnd.val() > voucherTimeStart.val());
        $.validator.addMethod("valid_percent", () => {
            if (voucherCondition.val() === "0" && voucherNumber.val() > 99) return false;
            return true;
        });
    },
};

export default AdminEditVoucherPage;