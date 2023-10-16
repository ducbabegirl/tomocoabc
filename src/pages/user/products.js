
import Header from "../../components/user/header";


const ProductsPage = {
    getTitle() {
        return "Thực đơn - Trà Sữa ";
    },
    async render(pageNumber) {
       

        return /* html */ `
        ${await Header.render("products")}

        <!-- content -->
        <main>
            <section class="container max-w-6xl mx-auto px-3 pt-8 mb-5 text-center">
                <div class="flex justify-center">
                    <a href="/#/" class="transition duration-300 ease-linear hover:text-[#D9A953] block pr-6 font-semibold relative after:content-[''] after:absolute after:right-3 after:bg-gray-500 after:w-[1px] after:h-4 after:rotate-12 after:top-1/2 after:-translate-y-1/2">Trang chủ</a>
                    <a href="/#/products" class="transition duration-300 ease-linear hover:text-[#D9A953] font-semibold">Sản phẩm</a>
                </div>
                <h1 class="text-[#D9A953] font-semibold text-3xl mt-1">Danh sách</h1>
            </section>

            <section class="container max-w-6xl mx-auto px-3 grid grid-cols-12 gap-6 mb-8">
               
            </section>
        </main>
        <!-- end content -->

       
        `;
    },
    afterRender() {
        Header.afterRender();
        
    },
};

export default ProductsPage;