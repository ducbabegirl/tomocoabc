import Footer from "../../components/user/footer";
import Header from "../../components/user/header";
import { getAllByCate } from "../../api/news";
import NewsHeader from "../../components/user/news/newsHeader";
import { get } from "../../api/cateNews";

const NewsByCatePage = {
    async getTitle(cateId) {
        const { data: cateData } = await get(cateId);

        return `${cateData.name} - Trà sữa Yotea`;
    },
    async render(cateId, pageNumber) {
        // format date
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return `${date.getDate()}, Tháng ${date.getMonth() + 1} ${date.getFullYear()}`;
        };

        // ds tất cả bài viết
        const { data } = await getAllByCate(cateId);

        // phân trang
        const limit = 8; // limit
        const total = data.length; // tổng số sp
        const totalPage = Math.ceil(total / limit); // tổng số page
        let currentPage = pageNumber ?? 1; // lấy số trang hiện tại
        if (currentPage >= totalPage) {
            currentPage = totalPage;
        } else if (currentPage < 0) {
            currentPage = 1;
        }
        const start = (currentPage - 1) * limit;

        // get sp dựa trên limit
        const { data: newsList } = await getAllByCate(cateId, start, limit);

        let htmlPagination = "";
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= totalPage; i++) {
            htmlPagination += `
            <li class="">
                <a href="/#/category-news/${cateId}/page/${i}"class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white ${+currentPage === i ? "border-[#D9A953] bg-[#D9A953] text-white" : "border-gray-500 text-gray-500"}">${i}</a>
            </li>
            `;
        }

        return /* html */ `
        ${await Header.render("news")}

        <!-- content -->
        <main>
            ${await NewsHeader.render(+cateId)}

            <section class="py-16 bg-[#EFE8DE] mt-6 min-h-[500px]">
                <div class="container max-w-6xl mx-auto px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" id="news__list">
                    ${newsList.map((item) => /* html */`
                        <div>
                            <a href="/#/news/${item.id}" style="background-image: url(${item.thumbnail});" class="block bg-cover bg-center pt-[70%] rounded-t-xl relative">
                                <button class="absolute top-2 left-2 bg-[#D9A953] rounded-full w-10 h-10 text-white text-lg">
                                    <i class="fas fa-newspaper"></i>
                                </button>
                            </a>
                            <div class="bg-white rounded-b-xl shadow px-3 py-2">
                                <p class="text-sm text-gray-500">${formatDate(item.createdAt)}</p>
                                <h3>
                                    <a href="/#/news/${item.id}" class="limit-line-2 block py-1 font-semibold text-justify leading-tight transition duration-300 text-gray-600 hover:text-black">${item.title}</a>
                                </h3>
                                <div class="limit-line-3 text-gray-500 text-sm text-justify">${item.description}</div>

                                <a href="/#/news/${item.id}">
                                    <button class="block mx-auto w-9 h-9 rounded-full border-2 border-[#D9A953] text-[#D9A953] transition duration-300 hover:bg-[#D9A953] hover:text-white mt-5 mb-2">
                                        <i class="fas fa-arrow-right"></i>
                                    </button>
                                </a>
                            </div>
                        </div>
                        `).join("")}
                </div>

                <!-- pagination -->
                <ul class="flex justify-center mt-10">
                    ${currentPage > 1 ? `
                    <li>
                        <a href="/#/category-news/${cateId}/page/${currentPage - 1}" class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold border-gray-500 text-gray-500 mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white">
                            <button>
                                <i class="fas fa-angle-left"></i>
                            </button>
                        </a>
                    </li>
                    ` : ""}
                    ${htmlPagination}

                    ${currentPage <= totalPage - 1 ? `
                        <li>
                            <a href="/#/category-news/${cateId}/page/${+currentPage + 1}" class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold border-gray-500 text-gray-500 mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white">
                                <button>
                                    <i class="fas fa-angle-right"></i>
                                </button>
                            </a>
                        </li>
                        ` : ""}
                    </ul>
                </ul>
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

export default NewsByCatePage;