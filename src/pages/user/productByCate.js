import { getProductByCate } from "../../api/product";
import { get as getCate } from "../../api/category";
import Footer from "../../components/user/footer";
import Header from "../../components/user/header";
import Sidebar from "../../components/user/products/sidebar";
import ProductContent from "../../components/user/products/productContent";

const ProductByCatePage = {
    async getTitle(cateId) {
        const { data: categoryData } = await getCate(cateId);
        return `${categoryData.name} - Trà sữa Yotea`;
    },
    async render(cateId, pageNumber) {
        // thông tin danh mục
        const { data: categoryData } = await getCate(cateId);

        // tất cả ds sản phẩm theo danh mục
        const { data } = await getProductByCate(cateId);

        // phân trang
        const limit = 9; // limit
        const total = data.length; // tổng số sp
        const totalPage = Math.ceil(total / limit); // tổng số page
        let currentPage = pageNumber ?? 1; // lấy số trang hiện tại
        if (currentPage >= totalPage) {
            currentPage = totalPage;
        } else if (currentPage < 0) {
            currentPage = 1;
        }
        const start = (currentPage - 1) * limit;

        // ds sp theo limit
        const { data: productList } = await getProductByCate(cateId, start, limit);

        return /* html */ `
        ${await Header.render("products")}

        <!-- content -->
        <main>
            <section class="container max-w-6xl mx-auto px-3 pt-8 mb-5 text-center">
                <div class="flex justify-center">
                    <a href="/#/" class="transition duration-300 ease-linear hover:text-[#D9A953] block pr-6 font-semibold relative after:content-[''] after:absolute after:right-3 after:bg-gray-500 after:w-[1px] after:h-4 after:rotate-12 after:top-1/2 after:-translate-y-1/2">Trang chủ</a>
                    <a href="/#/products" class="transition duration-300 ease-linear hover:text-[#D9A953] font-semibold">Sản phẩm</a>
                </div>
                <h1 class="text-[#D9A953] font-semibold text-3xl mt-1">${categoryData.name}</h1>
            </section>

            <section class="container max-w-6xl mx-auto px-3 grid grid-cols-12 gap-6 mb-8">
                ${await Sidebar.render(categoryData.id)}

                ${ProductContent.render(productList, currentPage, total, totalPage, start, limit, `category/${cateId}`)}
            </section>
        </main>
        <!-- end content -->

        ${Footer.render()}
        `;
    },
    afterRender() {
        Header.afterRender();
        Footer.afterRender();
        ProductContent.afterRender();
    },
};

export default ProductByCatePage;