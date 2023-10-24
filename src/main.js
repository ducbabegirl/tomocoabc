import Navigo from "navigo";
import "slick-carousel/slick/slick.css";
import "@fortawesome/fontawesome-free/js/brands";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "toastr/build/toastr.css";
import "sweetalert2/dist/sweetalert2.css";
import FortgotPage from "./pages/auth/forgot";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import CartPage from "./pages/user/cart";
import CheckoutPage from "./pages/user/cart/checkout";
import ThanksPage from "./pages/user/cart/thanks";
import ContactPage from "./pages/user/contact";
import HomePage from "./pages/user/home";
import IntroPage from "./pages/user/intro";
import UpdateInfoPage from "./pages/user/my-account";
import MyAccCartPage from "./pages/user/my-account/cart";
import MyAccCartDetailsPage from "./pages/user/my-account/cartDetails";
import MyAccUpdatePass from "./pages/user/my-account/updatePass";
import NewsPage from "./pages/user/news";
import NewsDetailsPage from "./pages/user/newsDetails";
import ProductDetailPage from "./pages/user/productDetails";
import ProductsPage from "./pages/user/products";
import StorePage from "./pages/user/store";
import NotFoundPage from "./pages/user/notFound";
import { getUser } from "./utils";
import SearchProductPage from "./pages/user/searchProduct";
import ProductByCatePage from "./pages/user/productByCate";
import NewsByCatePage from "./pages/user/newsByCate";
import MyAccAddressPage from "./pages/user/my-account/address";
import MyAccEditAddressPage from "./pages/user/my-account/addressEdit";

const router = new Navigo("/", { linksSelector: "a", hash: true });

const print = async (content, id, pageNumber) => {
    document.querySelector("#app").innerHTML = await content.render(id, pageNumber);

    if (content.afterRender) content.afterRender(id);

    // change title
    if (content.getTitle) document.title = await content.getTitle(id);
};

router.on("/admin/*", () => {}, {
    before(done) {
        const userInfo = getUser();

        if (userInfo && userInfo.role) {
            done();
        } else {
            document.location.href = "/#/";
        }
    },
});

router.on("/my-account/*", () => {}, {
    before(done) {
        const userInfo = getUser();

        if (userInfo) {
            done();
        } else {
            document.location.href = "/#/";
        }
    },
});

router.on({
    "/": () => {
        print(HomePage);
    },
    "/intro": () => {
        print(IntroPage);
    },
    "/products": () => {
        print(ProductsPage);
    },
    "/products/page/:page": ({ data }) => {
        print(ProductsPage, data.page);
    },
    "/product/:id": ({ data }) => {
        print(ProductDetailPage, data.id);
    },
    "/product/:id/page/:page": ({ data }) => {
        print(ProductDetailPage, data.id, data.page);
    },
    "/product/search/:keyword": ({ data }) => {
        print(SearchProductPage, data.keyword);
    },
    "/product/search/:keyword/page/:page": ({ data }) => {
        print(SearchProductPage, data.keyword, data.page);
    },
    "/category/:id": ({ data }) => {
        print(ProductByCatePage, data.id);
    },
    "/category/:id/page/:page": ({ data }) => {
        print(ProductByCatePage, data.id, data.page);
    },
    "/news": () => {
        print(NewsPage);
    },
    "/news/page/:page": ({ data }) => {
        print(NewsPage, data.page);
    },
    "/news/:id": ({ data }) => {
        print(NewsDetailsPage, data.id);
    },
    "/category-news/:id": ({ data }) => {
        print(NewsByCatePage, data.id);
    },
    "/category-news/:id/page/:page": ({ data }) => {
        print(NewsByCatePage, data.id, data.page);
    },
    "/contact": () => {
        print(ContactPage);
    },
    "/store": () => {
        print(StorePage);
    },
    "/login": () => {
        print(LoginPage);
    },
    "/register": () => {
        print(RegisterPage);
    },
    "/forgot": () => {
        print(FortgotPage);
    },
    "/cart": () => {
        print(CartPage);
    },
    "/cart-checkout": () => {
        print(CheckoutPage);
    },
    "/cart-thanks": () => {
        print(ThanksPage);
    },
    "/my-account": () => {
        print(UpdateInfoPage);
    },
    "/my-account/update-pass": () => {
        print(MyAccUpdatePass);
    },
    "/my-account/cart": () => {
        print(MyAccCartPage);
    },
    "/my-account/cart/page/:page": ({ data }) => {
        print(MyAccCartPage, data.page);
    },
    "/my-account/cart/:id/detail": ({ data }) => {
        print(MyAccCartDetailsPage, data.id);
    },
    "/my-account/address": () => {
        print(MyAccAddressPage);
    },
    "/my-account/address/page/:page": ({ data }) => {
        print(MyAccAddressPage, data.page);
    },
    "/my-account/address/:id/edit": ({ data }) => {
        print(MyAccEditAddressPage, data.id);
    },
});

router.notFound(() => {
    print(NotFoundPage);
});

router.resolve();