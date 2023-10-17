const Footer = {
    render() {
        return /* html */ `
        <!-- footer -->
        <footer style="background-image: url(https://res.cloudinary.com/dizzurnqo/image/upload/v1697382333/banner_oritqt.jpg)" class="bg-cover bg-center bg-no-repeat py-14">
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
                                <a href="https://www.facebook.com/profile.php?id=100024122764151" target="_blank">
                                    <i class="fab fa-facebook-f"></i>
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
                                Trịnh Văn Bô, Nam Từ Liêm, Hà Nội
                            </li>
                            <li class="flex">
                                <div class="min-w-[25px]">
                                    <i class="fas fa-phone-alt"></i>
                                </div>
                                Hotline:
                                <a href="tel:0842027665">&nbsp 0842027665</a>
                            </li>
                            <li class="flex">
                                <div class="min-w-[25px]">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                Email:
                                <a href="mailto:hongdtph14095">&nbsp hongdtph14095@fpt.edu.vn</a>
                            </li>
                            <li class="flex">
                                <div class="min-w-[25px]">
                                    <i class="fab fa-facebook-f"></i>
                                </div>
                                Facebook:
                                <a href="https://www.facebook.com/profile.php?id=100024122764151" target="_blank">&nbsp Dang Thi Hong</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </footer>
        `;
    },
};
export default Footer;