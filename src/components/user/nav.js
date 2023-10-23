import { getAll } from "../../api/category";

const Nav = {
    async render(pageName) {
        const { data: cateList } = await getAll();

        return /* html */`
        <div class="container max-w-6xl mx-auto px-3 h-full">
            <div class="border-b flex items-center h-full">
                <!-- icon mobile -->
                <div class="flex-1 md:hidden">
                    <button class="btn-toggle-nav cursor-pointer pr-3 py-3 text-lg transition duration-200 ease-linear text-gray-400 hover:text-black">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>

                <ul class="flex-1 items-center hidden md:flex">
                    <li class="${pageName === "home" ? "text-black" : ""} pr-4 font-semibold text-gray-500 transition ease-linear duration-200 hover:text-black">
                        <a href="/#/">Trang chủ</a>
                    </li>
                    <li class="${pageName === "intro" ? "text-black" : ""} pr-4 font-semibold text-gray-500 transition ease-linear duration-200 hover:text-black">
                        <a href="/#/intro">Giới thiệu</a>
                    </li>
                    <li class="${pageName === "products" ? "text-black" : ""} relative pr-4 font-semibold text-gray-500 transition ease-linear duration-200 hover:text-black group">
                        <a href="/#/products" class="flex items-center">
                            Sản phẩm
                            <div class="pl-1 -mt-1">
                                <i class="fas fa-sort-down"></i>
                            </div>

                        </a>
                        <ul class="z-20 invisible group-hover:visible absolute top-full left-0 bg-white shadow min-w-[150px] grid grid-cols-1 divide-y px-2 rounded-sm">
                            ${cateList.map((cate) => `
                                <li>
                                    <a href="/#/category/${cate.id}" class="block py-1.5 text-gray-500 transition ease-linear duration-200 hover:text-[#D9A953]">${cate.name}</a>
                                </li>
                                `).join("")}
                        </ul>
                    </li>
                </ul>

                <div class="h-full">
                    <a href="/#/" class="block h-full py-2">
                        <img class="block h-full" src="https://res.cloudinary.com/levantuan/image/upload/v1642588847/fpoly/asm-js/logo_oeo8uq.png" alt="">
                    </a>
                </div>

                <ul class="flex-1 justify-end hidden md:flex">
                    <li class="${pageName === "news" ? "text-black" : ""} pl-4 font-semibold text-gray-500 transition ease-linear duration-200 hover:text-black">
                        <a href="/#/news">Tin tức</a>
                    </li>
                    <li class="${pageName === "contact" ? "text-black" : ""} pl-4 font-semibold text-gray-500 transition ease-linear duration-200 hover:text-black">
                        <a href="/#/contact">Liên hệ</a>
                    </li>
                    <li class="${pageName === "store" ? "text-black" : ""} pl-4 font-semibold text-gray-500 transition ease-linear duration-200 hover:text-black">
                        <a href="/#/store">Cửa hàng</a>
                    </li>
                </ul>

                <!-- icon mobile -->
                <ul class="flex flex-1 justify-end md:hidden">
                    <li class="uppercase text-base cursor-pointer pl-6 text-gray-600 font-light opacity-80 transition ease-linear duration-200 hover:text-black hover:opacity-100">
                        <div class="relative">
                            <label for="" class="text-white absolute w-4 h-4 bg-green-700 text-xs text-center rounded-full -right-3 -top-1">10</label>
                            <i class="fas fa-heart"></i>
                        </div>
                    </li>
                    <li class="uppercase text-base pl-4 text-gray-600 font-light opacity-80 transition ease-linear duration-200 hover:text-black hover:opacity-100">
                        <a href="/#/cart" class="relative">
                            <label for="" class="text-white absolute w-4 h-4 bg-green-700 text-xs text-center rounded-full -right-3 -top-1">10</label>
                            <i class="fas fa-shopping-cart"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        `;
    },
    afterRender() {
        const btnBar = document.querySelector(".btn-toggle-nav");
        const navMobile = document.querySelector(".nav__mobile");
        const navMobileOverlay = navMobile.querySelector(".nav__mobile-overlay");
        const navMobileClose = navMobile.querySelector(".nav__mobile-close");

        btnBar.addEventListener("click", () => navMobile.classList.toggle("active"));
        navMobileOverlay.addEventListener("click", () => navMobile.classList.toggle("active"));
        navMobileClose.addEventListener("click", () => navMobile.classList.toggle("active"));
    },
};

export default Nav;