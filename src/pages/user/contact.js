import toastr from "toastr";
import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import validate from "jquery-validation";
import Footer from "../../components/user/footer";
import Header from "../../components/user/header";
import { getAll } from "../../api/store";
import { add } from "../../api/contact";
import { reRender } from "../../utils";

const ContactPage = {
    getTitle() {
        return "Liên hệ - Trà Sữa Yotea";
    },
    async render() {
        const { data: storeList } = await getAll();

        return /* html */ `
        ${await Header.render("contact")}

        <!-- content -->
        <main>
            <section class="container max-w-6xl mx-auto px-3 py-8 text-center">
                <h1 class="text-2xl font-semibold text-[#D9A953] mb-2">Liên hệ với Yotea</h1>
                <p>Từng ngày Yotea trở nên hoàn thiện hơn về diện mạo, chất lượng sản phẩm dịch vụ là nhờ sự đóng góp ý kiến của quý khách hàng. Để cảm nhận được sự thay đổi ấy, đừng ngần ngại nói với Yotea nhé.</p>
            </section>

            <section class="bg-[#EEE8DF] py-16">
                <form action="" class="container max-w-6xl mx-auto px-3" id="contact__form">
                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-12 md:col-span-6">
                            <input type="text" placeholder="Họ và tên" name="contact__form-name" id="contact__form-name" class="w-full rounded-full outline-none h-10 px-4 shadow-sm">
                        </div>

                        <div class="col-span-12 md:col-span-6">
                            <input type="text" placeholder="Email" id="contact__form-email" name="contact__form-email" class="w-full rounded-full outline-none h-10 px-4 shadow-sm">
                        </div>

                        <div class="col-span-12 md:col-span-6">
                            <input type="text" placeholder="Số điện thoại" id="contact__form-phone" name="contact__form-phone" class="w-full rounded-full outline-none h-10 px-4 shadow-sm">
                        </div>

                        <div class="col-span-12 md:col-span-6">
                            <select name="contact__form-store" id="contact__form-store" class="outline-none w-full rounded-full h-10 px-4 shadow-sm">
                                <option value="">Cửa hàng phản hồi</option>
                                ${storeList.map((store) => `<option value="${store.id}">${store.name}</option>`).join("")}
                            </select>
                        </div>

                        <div class="col-span-12">
                            <label for="contact__form-content" class="text-[#D9A953] font-semibold mb-1 text-lg block">Nội dung phản hồi</label>
                            <textarea name="contact__form-content" id="contact__form-content" cols="30" rows="10" placeholder="Nội dung phản hồi" class="w-full rounded-xl outline-none py-2 px-3 shadow-sm"></textarea>
                        </div>

                        <div class="col-span-12">
                            <div class="flex items-center">
                                <input type="checkbox" data-error=".error-checkbox" name="contact__form-checkbox" id="contact__form-checkbox">
                                <label for="contact__form-checkbox" class="ml-2">Tôi xác nhận các thông tin cá nhân cung cấp ở trên là hoàn toàn chính xác và đồng ý để Yotea sử dụng các thông tin đó cho mục đích giải quyết phản hồi.</label>
                            </div>
                            <div class="error-checkbox pl-3 text-sm mt-0.5 text-red-500"></div>
                        </div>
                    </div>

                    <button class="block mx-auto mt-8 h-10 rounded-full bg-[#D9A953] text-white font-semibold px-4 transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Gửi phản hồi</button>
                </form>
            </section>

            <section class="container max-w-6xl mx-auto px-3 py-10 leading-relaxed">
                <h2 class="text-xl font-semibold text-[#D9A953] mb-1">Thỏa thuận bảo mật thông tin</h2>
                <p>
                    Yotea cam kết giữ bí mật hoàn toàn thông tin của Quý khách hàng theo đúng quy định 
                    pháp luật nước sở tại về quyền bảo mật thông tin có liên quan. Trường hợp xảy ra 
                    khiếu nại, than phiền, Yotea có thể sẽ sử dụng thông tin khách hàng để chuyển giao 
                    đến bộ phận liên quan giải quyết:
                </p>
                <ul class="mb-5">
                    <li>1. Nội bộ các bộ phận trực thuộc Yotea</li>
                    <li>
                        2. Bên thứ ba được ủy quyền chính thức từ Yotea cho việc giải quyết các than phiền, 
                        khiếu nại mang tính chất nghiêm trọng
                    </li>
                </ul>

                <p>Thời gian giải quyết khiếu nại than phiền được tính dựa trên các ngày làm việc trong tuần 
                    từ thứ 2 đến thứ 6, thao giờ hành chính.
                </p>
                <ul class="mb-5">
                    <li>1. Yotea cam kết bảo mật các thông tin mà khách hàng cung cấp và tuân thủ quy định 
                        pháp luật về bảo mật những thông tin liên quan.
                    </li>
                    <li>
                        2. Thông tin cá nhân của khách hàng được sử dụng nhằm mục đích:
                        <ul>
                            <li>- Giải quyết khiếu nại, than phiền</li>
                            <li>- Tiếp nhận ý kiến để cải thiện chất lượng sản phẩm dịch vụ</li>
                            <li>- Cung cấp thông tin các chương trình khuyến mãi.</li>
                        </ul>
                    </li>
                    <li>
                        3. Yotea có thể tiết lộ thông tin của khách hàng cho mục đích giải quyết khiếu nại, 
                        than phiền của khách hàng cho:
                        <ul>
                            <li>- Các bộ phận trực thuộc Cty cổ phần TMDV Chào ngày mới - Trà sữa Yotea</li>
                            <li>
                                - Bên thứ ba được ủy quyền chính thức từ Trà sữa Yotea cho việc giải quyết 
                                các than phiền, khiếu nại mang tính chất nghiêm trọng
                            </li>
                        </ul>
                    </li>
                </ul>

                <h2 class="text-xl font-semibold text-[#D9A953] mb-1">LƯU Ý</h2>
                <p>
                    Quý khách hàng vui lòng cung cấp đầy đủ chính xác các thông tin cá nhân 
                    để Yotea có thể liên hệ giải quyết vấn đề hoặc tiếp nhận ý kiến của khách 
                    hàng một cách nhanh nhất.
                </p>
                <p>
                    Quá trình giải quyết và xử lý phản hồi của quý khách hàng sẽ chậm hơn vào 
                    các ngày Thứ bảy, Chủ nhật, ngày lễ.
                </p>
            </section>
        </main>
        <!-- end content -->

        ${Footer.render()}
        `;
    },
    afterRender() {
        Header.afterRender();
        Footer.afterRender();

        const fullName = $("#contact__form-name");
        const phone = $("#contact__form-phone");
        const email = $("#contact__form-email");
        const storeId = $("#contact__form-store");
        const content = $("#contact__form-content");

        $("#contact__form").validate({
            rules: {
                "contact__form-name": "required",
                "contact__form-phone": {
                    required: true,
                    valid_phone: true,
                },
                "contact__form-email": {
                    required: true,
                    email: true,
                },
                "contact__form-store": "required",
                "contact__form-content": "required",
                "contact__form-checkbox": "required",
            },
            messages: {
                "contact__form-name": "Vui lòng nhập họ tên",
                "contact__form-phone": {
                    required: "Vui lòng nhập số điện thoại",
                    valid_phone: "Không đúng định dạng, vui lòng nhập lại",
                },
                "contact__form-email": {
                    required: "Vui lòng nhập địa chỉ email",
                    email: "Không đúng định dạng, vui lòng nhập lại",
                },
                "contact__form-store": "Vui lòng chọn chi nhánh feedback",
                "contact__form-content": "Vui lòng nhập nội dung feedback",
                "contact__form-checkbox": "Vui lòng đồng ý với các điều khoản của chúng tôi",
            },
            errorPlacement: (error, element) => {
                const placement = $(element).data("error");
                if (placement) {
                    $(placement).html(error);
                } else {
                    $(error).insertAfter(element);
                }
            },
            submitHandler() {
                (async () => {
                    const date = new Date();

                    add({
                        content: content.val(),
                        name: fullName.val(),
                        email: email.val(),
                        phone: phone.val(),
                        storeId: +storeId.val(),
                        createdAt: date.toISOString(),
                    })
                        .then(() => toastr.success("Gửi thành công"))
                        .then(() => reRender(ContactPage, "#app"));
                })();
            },
        });

        $.validator.addMethod("valid_phone", (value) => {
            const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
            return regexPhone.test(value);
        });
    },
};

export default ContactPage;