import Footer from "../../components/user/footer";
import Header from "../../components/user/header";

const FortgotPage = {
    async render() {
        return /* html */ `
        ${await Header.render()}

        <!-- content -->
        <main>
            <section class="container max-w-6xl mx-auto px-3 min-h-[calc(100vh-478px)]">
                <p class="mt-8 text-gray-600">Quên mật khẩu? Vui lòng nhập tên đăng nhập hoặc địa chỉ email. Bạn sẽ nhận được một liên kết tạo mật khẩu mới qua email.</p>

                <form action="" class="mb-14">
                    <div class="mt-3">
                        <label for="" class="font-semibold block mb-1">Tên đăng nhập hoặc email *</label>
                        <input type="text" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none" placeholder="VD: demo...">
                    </div>

                    <button class="select-none mt-8 px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Đặt lại mật khẩu</button>
                </form>
            </section>
        </main>
        <!-- end content -->

        ${Footer.render()}
        `;
    },
};

export default FortgotPage;