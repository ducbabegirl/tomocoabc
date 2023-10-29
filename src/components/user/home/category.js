import { getAllJoinProduct } from "../../../api/category";

const Category = {
    async render() {
        const { data: cateList } = await getAllJoinProduct(0, 4);

        return `
        <section class="container max-w-6xl mx-auto py-7 px-3">
            <h2 class="uppercase text-center block text-[#D9A953] text-2xl font-semibold">DANH MỤC SẢN PHẨM</h2>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                ${cateList.map((cate) => `
                    <div>
                        <a href="/#/category/${cate.id}" style="background-image: url(${cate.image});" class="block bg-cover bg-center pt-[100%]"></a>
                        <div class="text-center py-2 leading-3">
                            <h3>
                                <a href="/#/category/${cate.id}" class="block uppercase text-lg font-semibold">${cate.name}</a>
                            </h3>
                            <span class="uppercase text-xs">${cate.products.length} sản phẩm</span>
                        </div>
                    </div>
                    `).join("")}
            </div>
        </section>
        `;
    },
};

export default Category;