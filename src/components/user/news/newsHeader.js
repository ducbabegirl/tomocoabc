import { getAll } from "../../../api/cateNews";

const NewsHeader = {
    async render(cateId) {
        const { data: newsCateList } = await getAll();

        return /* html */`
        <section class="container max-w-6xl px-3 mx-auto flex mt-8 justify-center">
            <a href="/#/news" class="text-center px-4 group cate-news-item ${!cateId ? "active" : ""}">
                <div class="cate-news-icon w-[75px] h-[75px] text-3xl rounded-full flex items-center justify-center bg-[#EEE8DF] transition duration-300 group-hover:bg-[#D9A953] group-hover:text-white cursor-pointer">
                    <i class="fas fa-border-all"></i>
                </div>
                <p class="cate-news-name font-semibold mt-1 group-hover:text-[#D9A953] transition duration-300">Tất cả</p>
            </a>
            ${newsCateList.map((cate) => /* html */`
                <a href="/#/category-news/${cate.id}" data-id="${cate.id}" class="${cateId && cateId === cate.id ? "active" : ""} text-center px-4 group cate-news-item">
                    <div class="cate-news-icon w-[75px] h-[75px] text-3xl rounded-full flex items-center justify-center bg-[#EEE8DF] transition duration-300 group-hover:bg-[#D9A953] group-hover:text-white cursor-pointer">
                        <svg class="svg-inline--fa fa-newspaper fa-w-18" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="newspaper" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z"></path></svg>
                    </div>
                    <p class="cate-news-name font-semibold mt-1 group-hover:text-[#D9A953] transition duration-300">${cate.name}</p>
                </a>
                `).join("")}
        </section>
        `;
    },
};

export default NewsHeader;