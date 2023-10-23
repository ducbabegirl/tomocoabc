const Footer = {
    render() {
        return /* html */ `
        <!-- footer -->
        <footer style="background-image: url(https://res.cloudinary.com/levantuan/image/upload/v1642602939/fpoly/asm-js/bg_footer_r0omu5.jpg)" class="bg-cover bg-center bg-no-repeat py-14">
            <div class="container max-w-6xl mx-auto px-3">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <h3 class="text-white text-xl uppercase font-semibold mb-3">KẾT NỐI VỚI CHÚNG TÔI</h3>
                        <p class="text-gray-300 text-justify">
                            Chúng tôi mong muốn tạo nên hương vị thức uống tuyệt vời nhất.
                            Là điểm đến đầu tiên dành cho bạn khi muốn thưởng thức trọn vẹn của tách Coffee
                        </p>
                        <ul class="flex text-white">
                            <li class="mr-3 mt-3">
                                <a href="https://www.facebook.com/LeVanTuan.Info/" target="_blank">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li class="mr-3 mt-3">
                                <a href="https://www.youtube.com/c/L%C3%AAV%C4%83nTu%C3%A2n02/" target="_blank">
                                    <i class="fab fa-youtube"></i>
                                </a>
                            </li>
                            <li class="mr-3 mt-3">
                                <a href="https://www.instagram.com/_tuan02/" target="_blank">
                                    <i class="fab fa-instagram"></i>
                                </a>
                            </li>
                            <li class="mr-3 mt-3">
                                <a href="https://www.tiktok.com/@tuandemo" target="_blank">
                                    <i class="fab fa-tiktok"></i>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="text-white text-xl uppercase font-semibold mb-3">Liên hệ</h3>

                        <ul class="text-white leading-relaxed">
                            <li class="flex">
                                <div class="min-w-[25px]">
                                    <i class="fas fa-home"></i>
                                </div>
                                Lạng Giang, Bắc Giang
                            </li>
                            <li class="flex">
                                <div class="min-w-[25px]">
                                    <i class="fas fa-phone-alt"></i>
                                </div>
                                Hotline:
                                <a href="tel:0347247244">&nbsp 0347247244</a>
                            </li>
                            <li class="flex">
                                <div class="min-w-[25px]">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                Email:
                                <a href="mailto:tuanlvph14271@fpt.edu.vn">&nbsp tuanlvph14271@fpt.edu.vn</a>
                            </li>
                            <li class="flex">
                                <div class="min-w-[25px]">
                                    <i class="fab fa-facebook-f"></i>
                                </div>
                                Facebook:
                                <a href="https://www.facebook.com/LeVanTuan.Info/" target="_blank">&nbsp Lê Văn Tuân</a>
                            </li>
                        </ul>
                    </div>

                    <div class="overflow-hidden">
                        <h3 class="text-white text-xl uppercase font-semibold mb-3">Kết nối với chúng tôi</h3>
                        <div class="fb-page" data-href="https://www.facebook.com/PolyQuiz/" data-tabs="" data-width="" data-height="" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
                            <blockquote cite="https://www.facebook.com/PolyQuiz/" class="fb-xfbml-parse-ignore">
                                <a href="https://www.facebook.com/PolyQuiz/">Ở Đây Có Đáp Án Quiz - Fpoly</a>
                            </blockquote>
                        </div>
                    </div>
                </div>

                <div class="text-center text-gray-300 mt-9">
                    Copyright 2022 ©
                    <strong>
                        Bản quyền thuộc về
                        <a href="https://www.facebook.com/LeVanTuan.Info/" target="_blank">TuanDemo</a>
                    </strong>
                </div>
            </div>

            <!-- btn scroll top -->
            <button class="btn__scroll-top invisible w-9 h-9 rounded-full border-2 border-gray-400 text-gray-400 fixed right-5 bottom-3 transition-all ease-linear duration-400 hover:text-white hover:bg-[#D9A953] hover:border-[#D9A953]">
                <i class="fas fa-chevron-up"></i>
            </button>
        </footer>
        <!-- end footer -->
        `;
    },
    afterRender() {
        const btnScrollTop = document.querySelector(".btn__scroll-top");
        window.addEventListener("scroll", () => {
            const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;

            if (scrollHeight >= 1000) {
                btnScrollTop.classList.add("active");
            } else {
                btnScrollTop.classList.remove("active");
            }
        });

        btnScrollTop.addEventListener("click", () => {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });
    },
};

export default Footer;