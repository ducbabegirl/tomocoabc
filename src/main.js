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
import ContactPage from "./pages/user/contact";
import HomePage from "./pages/user/home";
import IntroPage from "./pages/user/intro";
import UpdateInfoPage from "./pages/user/my-account";
import MyAccUpdatePass from "./pages/user/my-account/updatePass";
import NewsPage from "./pages/user/news";
import NewsDetailsPage from "./pages/user/newsDetail";
import ProductDetailPage from "./pages/user/productDetails";
import ProductsPage from "./pages/user/products";
import StorePage from "./pages/user/store";
import DashboardPage from "./pages/admin/dashboard";
import AdminProductListPage from "./pages/admin/product";
import AdminAddProductPage from "./pages/admin/product/add";
import AdminEditProductPage from "./pages/admin/product/edit";
import AdminCateListPage from "./pages/admin/category";
import AdminAddCatePage from "./pages/admin/category/add";
import AdminEditCatePage from "./pages/admin/category/edit";
import NotFoundPage from "./pages/user/notFound";
import AdminAddSizePage from "./pages/admin/size/add";
import AdminEditSizePage from "./pages/admin/size/edit";
import AdminSizeListPage from "./pages/admin/size";
import AdminProfilePage from "./pages/admin/profile";
import AdminUpdatePassPage from "./pages/admin/profile/updatePass";
import { getUser } from "./utils";
import SearchProductPage from "./pages/user/searchProduct";
import ProductByCatePage from "./pages/user/productByCate";
import NewsByCatePage from "./pages/user/newsByCate";

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
    "/my-account": () => {
        print(UpdateInfoPage);
    },
    "/my-account/update-pass": () => {
        print(MyAccUpdatePass);
    },
    "/admin": () => {
        print(DashboardPage);
    },
    "/admin/product": () => {
        print(AdminProductListPage);
    },
    "/admin/product/page/:page": ({ data }) => {
        print(AdminProductListPage, data.page);
    },
    "/admin/product/add": () => {
        print(AdminAddProductPage);
    },
    "/admin/product/:id/edit": ({ data }) => {
        print(AdminEditProductPage, data.id);
    },
    "/admin/category": () => {
        print(AdminCateListPage);
    },
    "/admin/category/page/:page": ({ data }) => {
        print(AdminCateListPage, data.page);
    },
    "/admin/category/add": () => {
        print(AdminAddCatePage);
    },
    "/admin/category/:id/edit": ({ data }) => {
        print(AdminEditCatePage, data.id);
    },
    "/admin/size": () => {
        print(AdminSizeListPage);
    },
    "/admin/size/add": () => {
        print(AdminAddSizePage);
    },
    "/admin/size/:id/edit": ({ data }) => {
        print(AdminEditSizePage, data.id);
    },
    "/admin/profile": () => {
        print(AdminProfilePage);
    },
    "/admin/profile/change-password": () => {
        print(AdminUpdatePassPage);
    },
});

router.notFound(() => {
    print(NotFoundPage);
});

router.resolve();