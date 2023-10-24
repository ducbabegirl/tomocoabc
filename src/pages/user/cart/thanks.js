import CartNav from "../../../components/user/cartNav";
import Footer from "../../../components/user/footer";
import Header from "../../../components/user/header";

const ThanksPage = {
    getTitle() {
        return "Thank you - Trà Sữa Yotea";
    },
    async render() {
        return /* html */ `
        ${await Header.render()}

        <!-- content -->
        <main class="min-h-[calc(100vh-518px)]">
            <section class="container max-w-6xl mx-auto px-3 mt-10">
                ${CartNav.render("cart-thanks")}
            </section>

            <section class="container max-w-6xl mx-auto">
                <h1 class="text-center mt-4 font-semibold text-2xl uppercase">Đặt hàng thành công</h1>

                <p class="text-center mt-2">
                    Cảm ơn bạn đã đặt hàng của Tea House.
                    Nhân viên sẽ gọi điện từ số điện thoại bạn đã cung cấp
                    để Confirm (Xác nhận) lại với bạn trong thời gian sớm nhất để xác nhận đơn hàng.
                </p>

                <div class="flex items-center justify-center mt-2">
                    <a href="/#/products">
                        <button class="uppercase h-8 text-[#D9A953] font-semibold text-sm border-[#D9A953] border-2 px-3 transition ease-linear duration-300 hover:bg-[#D9A953] hover:text-white">
                            <i class="fas fa-long-arrow-alt-left"></i>
                            Tiếp tục mua hàng
                        </button>
                    </a>
                    <a href="/#/my-account/cart" class="ml-2">
                        <button class="uppercase h-8 text-[#D9A953] font-semibold text-sm border-[#D9A953] border-2 px-3 transition ease-linear duration-300 hover:bg-[#D9A953] hover:text-white">
                            Kiểm tra đơn hàng
                            <i class="fas fa-long-arrow-alt-right"></i>
                        </button>
                    </a>
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

export default ThanksPage;