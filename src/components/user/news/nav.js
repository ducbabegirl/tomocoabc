import { getAll } from "../../../api/cateNews";
import { getAllShow } from "../../../api/news";

const Nav = {
    async render(cateId) {
        // ds danh mục
        const { data: cateNewsList } = await getAll();

        // bài viết mới nhất
        const { data: newsList } = await getAllShow(0, 10);

        return `
        <aside class="hidden lg:block lg:col-span-3 pl-6 border-l">
            <section>
                <h2 class="uppercase font-bold pb-2 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300">CHUYÊN MỤC</h2>

                <ul class="mt-4 grid grid-cols-1 divide-y">
                    ${cateNewsList.map((cate) => `
                        <li>
                            <a href="/#/category-news/${cate.id}" class="${cate.id === +cateId ? "text-black font-semibold" : ""} block py-1 leading-7 text-gray-500 transition duration-200 hover:text-black">${cate.name}</a>
                        </li>
                        `).join("")}
                </ul>
            </section>

            <section class="mt-5">
                <h2 class="uppercase font-bold pb-2 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300">Bài viết mới</h2>

                <ul class="mt-4 grid grid-cols-1 divide-y">
                    ${newsList.map((post) => `
                        <li>
                            <a href="/#/news/${post.id}" class="limit-line-2 block py-1 leading-7 text-gray-500 transition duration-200 hover:text-black">${post.title}</a>
                        </li>
                        `).join("")}
                </ul>
            </section>
        </aside>
        `;
    },
};

export default Nav;