import { getAll } from "../../../api/category";
import { getFavorites } from "../../../api/product";
import { formatCurrency } from "../../../utils";

const Sidebar = {
    async render(cateId) {
        const { data: cateList } = await getAll();

        // sp yêu thích
        const { data: productList } = await getFavorites();

        return /* html */`
        <aside class="hidden lg:block lg:col-span-3 pt-3">
            <div>
                <h2 class="uppercase font-bold pb-2 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300">Danh mục sản phẩm</h2>

                <ul class="grid grid-cols-1 divide-y mt-3">
                    ${cateList.map((item) => `
                        <li>
                            <a href="/#/category/${item.id}" class="${item.id === cateId ? "text-black font-semibold" : "text-[#D9A953]"} block uppercase py-2 transition duration-300 ease-linear hover:text-black">${item.name}</a>
                        </li>
                        `).join("")}
                </ul>
            </div>

            <div class="mt-3">
                <h2 class="uppercase font-bold pb-2 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300">Lọc theo giá</h2>

            </div>

            <div class="mt-5">
                <h2 class="uppercase font-bold pb-2 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300">Sản phẩm yêu thích</h2>

                <ul class="grid grid-cols-1 divide-y mt-2">
                    ${productList.map((item) => /* html */ `
                        <li class="py-3 flex">
                            <a href="/#/product/${item.id}" class="block bg-[#f7f7f7]">
                                <img class="w-16 h-16 object-cover block" src="${item.image}" alt="">
                            </a>

                            <div class="ml-3 flex-1">
                                <a href="/#/product/${item.id}" class="uppercase transition duration-300 ease-linear hover:text-black block text-[#D9A953] text-sm">${item.name}</a>
                                <span class="font-semibold">${formatCurrency(item.price)}</span>
                            </div>
                        </li>
                        `).join("")}
                </ul>
            </div>
        </aside>
        `;
    },
};

export default Sidebar;