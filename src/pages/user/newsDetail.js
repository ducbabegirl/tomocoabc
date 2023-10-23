import { get } from "../../api/news";
import Footer from "../../components/user/footer";
import Header from "../../components/user/header";
import Nav from "../../components/user/news/nav";
import Related from "../../components/user/news/related";

const NewsDetailsPage = {
    async getTitle(newsId) {
        const { data: newsDetails } = await get(newsId);
        return `${newsDetails.title} - Trà sữa Yotea`;
    },
    async render(newsId) {
        const { data: newsDetails } = await get(newsId);
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        };

        return /* html */ `
        ${await Header.render()}

        <!-- content -->
        <main>
            <section class="container max-w-6xl mx-auto px-3 text-center pt-7">
                <div class="border-b border-dashed pb-7">
                    <a href="/#/category-news/${newsDetails.cateNewId}" class="uppercase text-sm">${newsDetails.cateNew.name}</a>
                    <h1 class="uppercase font-bold text-xl py-1">${newsDetails.title}</h1>
                    <p class="text-sm">POSTED ON ${formatDate(newsDetails.createdAt)} BY ADMIN</p>
                </div>
            </section>

            <section class="container max-w-6xl mx-auto px-3 grid grid-cols-12 pb-8 pt-4">
                <div class="col-span-12 lg:col-span-9 lg:pr-6">
                    <div class="leading-relaxed text-justify">${newsDetails.content}</div>

                    <ul class="flex justify-center py-7">
                        <li class="mx-0.5">
                            <a href="https://www.facebook.com/sharer/sharer.php?u=${window.location.href}/" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;" class="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                        </li>
                        <li class="mx-0.5">
                            <a href="https://twitter.com/share?url=${window.location.href}/" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;" class="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500">
                                <i class="fab fa-twitter"></i>
                            </a>
                        </li>
                        <li class="mx-0.5">
                            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}/" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"  class="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500">
                                <i class="fab fa-linkedin"></i>
                            </a>
                        </li>
                    </ul>

                    <div class="border-t border-dashed">
                        <h2 class="uppercase text-lg font-bold my-3">Bài viết liên quan</h2>

                        ${await Related.render(newsId, newsDetails.cateNew.id)}
                    </div>
                </div>

                ${await Nav.render(newsDetails.cateNew.id)}
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

export default NewsDetailsPage;