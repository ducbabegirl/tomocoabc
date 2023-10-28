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

import HomePage from "./pages/user/home";

import UpdateInfoPage from "./pages/user/my-account";

import MyAccUpdatePass from "./pages/user/my-account/updatePass";

import ProductsPage from "./pages/user/products";

import DashboardPage from "./pages/admin/dashboard";

import AdminProductListPage from "./pages/admin/product";

import AdminAddProductPage from "./pages/admin/product/add";
import AdminEditProductPage from "./pages/admin/product/edit";
import AdminCateListPage from "./pages/admin/category";
import AdminAddCatePage from "./pages/admin/category/add";
import AdminEditCatePage from "./pages/admin/category/edit";
import NotFoundPage from "./pages/user/notFound";

import AdminNewsListPage from "./pages/admin/news";

import AdminCmtListPage from "./pages/admin/comments";
import AdminSliderListPage from "./pages/admin/slider";
import AdminAddSliderPage from "./pages/admin/slider/add";
import AdminEditSliderPage from "./pages/admin/slider/edit";

import { getUser } from "./utils";


const router = new Navigo("/", { linksSelector: "a", hash: true });

const print = async (content, id, pageNumber) => {
    document.querySelector("#app").innerHTML = await content.render(id, pageNumber);

    if (content.afterRender) content.afterRender(id);

    // change title
    if (content.getTitle) document.title = await content.getTitle(id);
};



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



    "/admin/news": () => {
        print(AdminNewsListPage);
    },
    



    "/admin/slider": () => {
        print(AdminSliderListPage);
    },
    "/admin/slider/page/:page": ({ data }) => {
        print(AdminSliderListPage, data.page);
    },

    "/admin/comment": () => {
        print(AdminCmtListPage);
    },
  
    
    "/admin/slider/add": () => {
        print(AdminAddSliderPage);
    },
    "/admin/slider/:id/edit": ({ data }) => {
        print(AdminEditSliderPage, data.id);
    },

});

router.notFound(() => {
    print(NotFoundPage);
});

router.resolve();