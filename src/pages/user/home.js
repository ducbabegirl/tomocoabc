import $ from "jquery"
import Header from "../../components/user/header";
import Footer from "../../components/user/footer";
import Banner from "../../components/user/home/banner";
import "slick-carousel";
const HomePage = {
    getTitle() {
        return "Trang chủ - Trà Sữa Cocomoco";
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
          
            <!-- end category -->

            <!-- why -->
            
            <!-- end why -->

            <!-- product -->
        
            <!-- end product -->

            <!-- news -->
        
            <!-- end news -->

            <!-- feedback -->
          
            <!-- end feedback -->

            <!-- show -->
          
            <!-- end show -->
        </main>
        <!-- end content -->

        ${Footer.render()}
        `;
    },
    afterRender() {
        Header.afterRender();
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