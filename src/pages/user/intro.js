import Header from "../../components/user/header";
import Footer from "../../components/user/footer";

const IntroPage = {
    getTitle() {
        return "Về chúng tôi - Trà Sữa Yotea";
    },
    async render() {
        return /* html */ `
        ${await Header.render("intro")}

        <!-- content -->
        <main>
            <section class="container max-w-6xl mx-auto px-3 py-9">
                <h2 class="uppercase text-[#D9A953] text-2xl font-semibold">Về Yotea</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                    <div class="text-justify leading-relaxed">
                        <p class="mb-3">
                            Thương hiệu trà và cà phê YoTea được thành lập vào năm 2014
                            với cửa hàng đầu tiên tại Royal City. Với triết lý kinh doanh
                            không ngừng phát triển và đưa thương hiệu YoTea ngày càng lớn
                            mạnh bằng hương vị trà và cà phê hảo hạng, quy trình phục vụ
                            chuyên nghiệp mà còn là không gian đẳng cấp sang trọng. Trong
                            suốt thời gian qua, YoTea luôn khẳng định vị thế của mình trên
                            thị trường và không ngừng mở rộng thương hiệu với 15 cửa hàng
                            mang thương hiệu YoTea tại các thành phố lớn: Hà Nội, Hồ Chí Minh,
                            Hải Phòng và Bình Dương.
                        </p>

                        <p class="mb-3">
                            YoTea mang đến cho khách hàng sự trải nghiệm tuyệt vời chất lượng
                            đồ uống hảo hạng với những hạt cà phê rang xay được chọn lọc kỹ
                            càng từ những vùng đất trồng nổi tiếng, khi pha cà phê vẫn giữ
                            được hương vị đậm đà, thơm ngon và nguyên chất. Hương vị trà của
                            YoTea luôn làm khách hàng xao xuyến bởi vị chan chát đầu lưỡi,
                            và vị chua ngọt tự nhiên từ hoa quả hòa quyện làm nên ly đồ uống
                            thanh thanh mà thực hấp dẫn.
                        </p>

                        <p>
                            Với sứ mệnh góp phần tạo nên một thị trường trà – cafe cao cấp từ
                            sản phẩm cho tới dịch vụ. Trong suốt 5 năm hoạt động và phát triển,
                            YoTea đã đem tới cho hơn 1.000.000 thực khách những giây phút trải
                            nghiệm thực sự trong không gian sang trọng và đồ uống hảo hạng
                        </p>
                    </div>

                    <div class="my-auto text-center">
                        <img src="https://res.cloudinary.com/levantuan/image/upload/v1642663052/fpoly/asm-js/tea_odcxma.png" alt="">
                    </div>
                </div>
            </section>

            <section class="bg-[#EFE8DE] py-20">
                <div class="container max-w-6xl mx-auto">
                    <h2 class="uppercase text-[#D9A953] text-2xl font-semibold text-center">Tầm nhìn chiến lược</h2>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-14 mt-9 px-16">
                        <div class="text-center">
                            <div class="w-24 h-24 inline-flex text-5xl text-[#D9A953] shadow-sm items-center justify-center rounded-full bg-white">
                                <i class="fas fa-star"></i>
                            </div>
                            <p class="mt-3">Trở thành thương hiệu F&B yêu thích của mọi đối tượng khách hàng.</p>
                        </div>
                        <div class="text-center">
                            <div class="w-24 h-24 inline-flex text-5xl text-[#D9A953] shadow-sm items-center justify-center rounded-full bg-white">
                                <i class="fas fa-medal"></i>
                            </div>
                            <p class="mt-3">Đưa thương hiệu Yotea ra nước ngoài và mở rộng thị trường quốc tế.</p>
                        </div>
                        <div class="text-center">
                            <div class="w-24 h-24 inline-flex text-5xl text-[#D9A953] shadow-sm items-center justify-center rounded-full bg-white">
                                <i class="fas fa-handshake"></i>
                            </div>
                            <p class="mt-3">Mang lại giá trị hữu ích cho cộng đồng Việt Nam và Quốc tế.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-14">
                <div class="container max-w-6xl mx-auto flex flex-wrap">
                    <div class="w-full min-h-60 md:w-1/2 bg-cover bg-center bg-no-repeat md:rounded-l-xl" style="background-image: url(https://res.cloudinary.com/levantuan/image/upload/v1642664388/fpoly/asm-js/108162714_1930571577080015_6762857609409971295_n_upoyhj.jpg)"></div>
                    <div class="w-full md:w-1/2 px-10 py-16 bg-[#D9A953] text-white md:rounded-r-xl">
                        <h2 class="text-2xl font-semibold uppercase">SỨ MỆNH</h2>
                        <p class="text-justify mt-3">
                            Với châm ngôn tuyệt đối không sử dụng nguyên liệu
                            không rõ nguồn gốc xuất xứ, trà sữa Yotea tự hào mang
                            lại cho khách hàng những sản phẩm chất lượng nhất và Yotea
                            luôn cảm kích vì sự tin dùng và yêu thương của quý khách hàng.
                        </p>
                    </div>
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
    },
};

export default IntroPage;