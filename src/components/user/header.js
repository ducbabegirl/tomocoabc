import toastr from "toastr";
import { search } from "../../api/product";
import { formatCurrency, getUser, reRender } from "../../utils";
import CartLabel from "./cartLabel";
import Nav from "./nav";
import WishList from "./wishlist";
import WishListLabel from "./wishlistLabel";

const Header = {
    async render(pageName) {
        const userLogged = getUser();

        return /* html */ `
        <header>
            <!-- header top -->
            <div class="bg-[#D9A953] hidden md:block">
                <div class="container max-w-6xl px-3 mx-auto flex justify-between items-center h-10">
                    <ul class="flex items-center">
                        <li class="relative after:content-[''] after:absolute after:w-[1px] after:h-3.5 after:bg-gray-50 after:right-3 after:top-1/2 after:-translate-y-1/2 text-sm uppercase pr-6 text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100">
                            <a href="mailto:tuanlvph14271@fpt.edu.vn">
                                <i class="far fa-envelope"></i>
                                <span class="pl-1">Contact</span>
                            </a>
                        </li>
                        <li class="relative after:content-[''] after:absolute after:w-[1px] after:h-3.5 after:bg-gray-50 after:right-3 after:top-1/2 after:-translate-y-1/2 text-sm uppercase pr-6 text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100">
                            <i class="far fa-clock"></i>
                            <span class="pl-1">08:00 - 17:00</span>
                        </li>
                        <li class="text-sm uppercase text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100">
                            <a href="tel:0347247244">
                                <i class="fas fa-phone-alt"></i>
                                <span class="pl-1">0347 247 244</span>
                            </a>
                        </li>
                    </ul>

                    <ul class="flex items-center">
                        <li class="group relative uppercase text-sm pl-6 text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100">
                            <button class="rounded-full border border-gray-50 w-7 h-7">
                                <i class="fas fa-search"></i>
                            </button>

                            <div class="hidden min-w-[280px] z-20 group-hover:block absolute top-full -right-[100px] bg-white shadow p-3 opacity-100">
                                <form action="" class="flex" id="form-search-product">
                                    <input type="text" id="form-search-control" class="text-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] flex-1 border px-2 h-8 text-sm outline-none" placeholder="Nhập tên sản phẩm">
                                    <button class="px-3 bg-red-500 transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </form>

                                <ul class="mt-3 grid grid-cols-1 divide-y max-h-[70vh] overflow-y-auto" id="search-product-result"></ul>
                            </div>
                        </li>
                        ${userLogged ? `
                        <li class="relative after:content-[''] after:absolute after:w-[1px] after:h-3.5 after:bg-gray-50 after:left-3 after:top-1/2 after:-translate-y-1/2 uppercase text-sm pl-6 text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100">
                            Xin chào, <a href="${userLogged.role ? "/#/admin" : "/#/my-account"}">${userLogged.fullName}</a>
                        </li>
                        ` : `
                        <li class="relative after:content-[''] after:absolute after:w-[1px] after:h-3.5 after:bg-gray-50 after:left-3 after:top-1/2 after:-translate-y-1/2 uppercase text-sm pl-6 text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100">
                            <a href="/#/login">Đăng nhập</a>
                        </li>
                        <li class="relative after:content-[''] after:absolute after:w-[1px] after:h-3.5 after:bg-gray-50 after:left-3 after:top-1/2 after:-translate-y-1/2 uppercase text-sm pl-6 text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100">
                            <a href="/#/register">Đăng ký</a>
                        </li>
                        `}
                        
                        <li class="header-icon-heart relative after:content-[''] after:absolute after:w-[1px] after:h-3.5 after:bg-gray-50 after:left-3 after:top-1/2 after:-translate-y-1/2 uppercase text-base cursor-pointer pl-6 text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100">
                            ${await WishListLabel.render()}
                        </li>
                        <li id="header-cart-label" class="uppercase text-base pl-4 text-gray-50 font-light opacity-80 transition ease-linear duration-200 hover:text-white hover:opacity-100">
                            ${CartLabel.render()}
                        </li>
                    </ul>
                </div>
            </div>
            <!-- end header top -->

            <!-- header bottom -->
            <div class="md:h-24 h-[70px] bg-white" id="header-bottom">
                ${await Nav.render(pageName)}
            </div>
            <!-- end header bottom -->

            <!-- nav on mobile -->
            <section class="nav__mobile invisible transition-all duration-500 ease-linear fixed top-0 right-0 bottom-0 left-0 z-20">
                <!-- overlay -->
                <div class="nav__mobile-overlay invisible transition-all duration-400 ease-linear relative w-screen h-screen bg-[rgba(0,0,0,0.6)]"></div>

                <nav class="nav__mobile-content -translate-x-full transition duration-500 ease absolute top-0 left-0 bottom-0 min-w-[260px] bg-[rgba(255,255,255,0.95)] shadow py-10">
                    <form action="" class="flex px-3" id="nav__mobile-search">
                        <input type="text" class="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] min-w-[80px] border px-2 h-8 text-sm outline-none" placeholder="Nhập tên sản phẩm tìm kiếm">
                        <button class="px-3 text-white bg-red-500 transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
                    <ul class="grid grid-cols-1 divide-y mt-5">
                        <li>
                            <a href="/#/" class="px-3 py-3.5 transition ease-linear duration-200 hover:bg-gray-200 text-sm font-semibold text-gray-500 hover:text-black uppercase block">Trang chủ</a>
                        </li>
                        <li>
                            <a href="/#/intro" class="px-3 py-3.5 transition ease-linear duration-200 hover:bg-gray-200 text-sm font-semibold text-gray-500 hover:text-black uppercase block">Giới thiệu</a>
                        </li>
                        <li>
                            <a href="/#/products" class="px-3 py-3.5 transition ease-linear duration-200 hover:bg-gray-200 text-sm font-semibold text-gray-500 hover:text-black uppercase block">Sản phẩm</a>
                        </li>
                        <li>
                            <a href="/#/news" class="px-3 py-3.5 transition ease-linear duration-200 hover:bg-gray-200 text-sm font-semibold text-gray-500 hover:text-black uppercase block">Tin tức</a>
                        </li>
                        <li>
                            <a href="/#/contact" class="px-3 py-3.5 transition ease-linear duration-200 hover:bg-gray-200 text-sm font-semibold text-gray-500 hover:text-black uppercase block">Liên hệ</a>
                        </li>
                        <li>
                            <a href="/#/store" class="px-3 py-3.5 transition ease-linear duration-200 hover:bg-gray-200 text-sm font-semibold text-gray-500 hover:text-black uppercase block">Cửa hàng</a>
                        </li>
                    </ul>
                </nav>

                <button class="nav__mobile-close fixed top-3 right-3 text-3xl text-gray-300 transition duration-200 ease-linear hover:text-white">
                    <i class="fas fa-times"></i>
                </button>
            </section>
            <!-- nav on mobile -->
            
            <!-- wishlist -->
            <section id="wishlist" class="wishlist"></section>
        </header>
        `;
    },
    async afterRender() {
        WishListLabel.afterRender();
        Nav.afterRender();

        const headerElement = document.querySelector("#header-bottom");
        window.addEventListener("scroll", () => {
            const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;

            if (scrollHeight >= 600) {
                headerElement.classList.add("active");
            } else {
                headerElement.classList.remove("active");
            }
        });

        // tìm kiếm sp
        const formSearch = document.querySelector("#form-search-product");
        const formSearchMobile = document.querySelector("#nav__mobile-search");
        const formControlSearch = document.querySelector("#form-search-control");
        const searchResult = document.querySelector("#search-product-result");

        formControlSearch.addEventListener("input", async (e) => {
            const keyword = e.target.value;

            const { data: listProduct } = await search(keyword);
            searchResult.innerHTML = listProduct.map((item) => `
                <li>
                    <a href="/#/product/${item.id}" class="flex py-2 transition duration-200 hover:bg-gray-50 hover:text-[#D9A953] text-black items-center px-2">
                        <img src="${item.image}" class="w-10 h-10 object-cover rounded-full bg-[#f7f7f7]" alt="">
                        <p class="pl-1 pr-2 normal-case font-normal">${item.name}</p>
                        <p class="font-medium ml-auto">${formatCurrency(item.price)}</p>
                    </a>
                </li>
                `).join("");
        });

        formSearch.addEventListener("submit", (e) => {
            e.preventDefault();
            const keyword = formControlSearch.value;

            if (!keyword) {
                toastr.info("Vui lòng nhập tên sản phẩm");
            } else {
                document.location.href = `/#/product/search/${keyword}`;
            }
        });

        formSearchMobile.addEventListener("submit", (e) => {
            e.preventDefault();

            const keyword = formSearchMobile.querySelector("input").value;

            if (!keyword) {
                toastr.info("Vui lòng nhập tên sản phẩm");
            } else {
                document.location.href = `/#/product/search/${keyword}`;
            }
        });

        // click button ds sp yêu thích
        const userLogged = getUser();
        const btnHeart = document.querySelector(".header-icon-heart");
        btnHeart.addEventListener("click", () => {
            if (!userLogged) {
                toastr.info("Vui lòng đăng nhập để xem danh sách yêu thích");
            } else {
                reRender(WishList, "#wishlist")
                    .then(() => document.querySelector("#wishlist").classList.add("active"));
            }
        });
    },
};

export default Header;