import { getAllShow } from "../../../api/news";

const News = {
    async render() {
        const { data: newsList } = await getAllShow(0, 4);
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return `${date.getDate()} Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
        };

        return /* html */ `
        <section class="bg-[#EFE8DE] py-9">
            <div class="container max-w-6xl mx-auto px-3">
                <h3>
                    <a href="" class="uppercase text-center block text-[#D9A953] text-2xl font-semibold">TIN TỨC - KHUYẾN MÃI</a>
                </h3>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
                    ${newsList.map((post) => `
                        <div>
                            <a href="/#/news/${post.id}" style="background-image: url(${post.thumbnail});" class="block bg-cover bg-center pt-[70%] rounded-t-xl"></a>
                            <div class="bg-white rounded-b-xl shadow px-3 py-2">
                                <p class="text-sm text-gray-500">${formatDate(post.createdAt)}</p>
                                <h3>
                                    <a href="/#/news/${post.id}" class="limit-line-2 block py-1 font-semibold text-justify leading-tight transition duration-300 text-gray-600 hover:text-black">${post.title}</a>
                                </h3>
                                <div class="limit-line-3 text-gray-500 text-sm text-justify">${post.description}</div>

                                <a href="/#/news/${post.id}">
                                    <button class="block mx-auto w-9 h-9 rounded-full border-2 border-[#D9A953] text-[#D9A953] transition duration-300 hover:bg-[#D9A953] hover:text-white mt-5 mb-2">
                                        <i class="fas fa-arrow-right"></i>
                                    </button>
                                </a>
                            </div>
                        </div>
                        `).join("")}
                </div>
            </div>
        </section>
        `;
    },
};

export default News;