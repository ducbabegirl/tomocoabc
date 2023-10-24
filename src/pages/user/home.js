import $ from "jquery";
import "slick-carousel";
import Banner from "../../components/user/home/banner";
import Footer from "../../components/user/footer";
import Header from "../../components/user/header";
import Category from "../../components/user/home/category";
import Feedback from "../../components/user/home/feedback";
import News from "../../components/user/home/news";
import Products from "../../components/user/home/products";
import Show from "../../components/user/home/show";
import Why from "../../components/user/home/why";

const HomePage = {
    getTitle() {
        return "Trang chủ - Trà Sữa Yotea";
    },
    async render() {
        return /* html */ `
        ${await Header.render("home")}

        <!-- content -->
        <main>
            <!-- banner -->
            ${await Banner.render()}
            <!-- end banner -->

            <!-- category -->
            ${await Category.render()}
            <!-- end category -->

            <!-- why -->
            ${Why.render()}
            <!-- end why -->

            <!-- product -->
            ${await Products.render()}
            <!-- end product -->

            <!-- news -->
            ${await News.render()}
            <!-- end news -->

            <!-- feedback -->
            ${Feedback.render()}
            <!-- end feedback -->

            <!-- show -->
            ${Show.render()}
            <!-- end show -->
        </main>
        <!-- end content -->

        ${Footer.render()}
        `;
    },
    afterRender() {
        Header.afterRender();
        Footer.afterRender();
        Products.afterRender();

        // slider
        $(document).ready(() => {
            $("#banner").slick({
                autoplay: true,
                prevArrow: /* html */ `<button class="invisible group-hover:visible w-9 h-9 absolute top-1/2 -translate-y-1/2 z-10 left-6 group-hover:left-4 transition-all ease-linear duration-200 hover:bg-[#D9A953] hover:text-white hover:border-[#D9A953] rounded-full border-2 border-gray-400 text-gray-400"><i class="fas fa-chevron-left"></i></button>`,
                nextArrow: /* html */ `<button class="invisible group-hover:visible w-9 h-9 absolute top-1/2 -translate-y-1/2 z-10 right-6 group-hover:right-4 transition-all ease-linear duration-200 hover:bg-[#D9A953] hover:text-white hover:border-[#D9A953] rounded-full border-2 border-gray-400 text-gray-400"><i class="fas fa-chevron-right"></i></button>`,
            });

            $("#home__show").slick({
                slidesToShow: 6,
                autoplay: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 5,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                        },
                    },
                ],
                prevArrow: /* html */ `<button class="invisible group-hover:visible w-9 h-9 absolute top-1/2 -translate-y-1/2 z-10 left-6 group-hover:left-4 transition-all ease-linear duration-200 hover:bg-[#D9A953] hover:text-white hover:border-[#D9A953] rounded-full border-2 border-gray-400 text-gray-400"><i class="fas fa-chevron-left"></i></button>`,
                nextArrow: /* html */ `<button class="invisible group-hover:visible w-9 h-9 absolute top-1/2 -translate-y-1/2 z-10 right-6 group-hover:right-4 transition-all ease-linear duration-200 hover:bg-[#D9A953] hover:text-white hover:border-[#D9A953] rounded-full border-2 border-gray-400 text-gray-400"><i class="fas fa-chevron-right"></i></button>`,
            });

            $("#home__feedback").slick({
                autoplay: true,
                prevArrow: /* html */ `<button class="invisible group-hover:visible w-9 h-9 absolute top-1/2 -translate-y-1/2 z-10 left-6 group-hover:left-4 transition-all ease-linear duration-200 hover:bg-[#D9A953] hover:text-white hover:border-[#D9A953] rounded-full border-2 border-gray-400 text-gray-400"><i class="fas fa-chevron-left"></i></button>`,
                nextArrow: /* html */ `<button class="invisible group-hover:visible w-9 h-9 absolute top-1/2 -translate-y-1/2 z-10 right-6 group-hover:right-4 transition-all ease-linear duration-200 hover:bg-[#D9A953] hover:text-white hover:border-[#D9A953] rounded-full border-2 border-gray-400 text-gray-400"><i class="fas fa-chevron-right"></i></button>`,
            });
        });
    },
};

export default HomePage;