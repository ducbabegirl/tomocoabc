import Navigo from "navigo";
import HomePage from "./pages/user/home";


import "slick-carousel/slick/slick.css";
import "@fortawesome/fontawesome-free/js/brands";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "toastr/build/toastr.css";
import "sweetalert2/dist/sweetalert2.css";
import FortgotPage from "./pages/auth/forgot";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import NotFoundPage from "./pages/user/notFound";
import ProductsPage from "./pages/user/products";
import DashboardPage from "./pages/admin/dashboard";
import AdminCateListPage from "./pages/admin/category";
import AdminProductListPage from "./pages/admin/product";
import AdminProfilePage from "./pages/admin/profile";
import AdminUpdatePassPage from "./pages/admin/profile/updatePass";
import UpdateInfoPage from "./pages/user/my-account";
import MyAccUpdatePass from "./pages/user/my-account/updatePass";
import AdminProfilePage from "./pages/admin/profile";
import AdminUpdatePassPage from "./pages/admin/profile/updatePass";
import AdminAddCatePage from "./pages/admin/category/add";
import AdminEditCatePage from "./pages/admin/category/edit";
import AdminAddProductPage from "./pages/admin/product/add";
import { getUser } from "./utils";


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

    "/admin/category": () => {
        print(AdminCateListPage);
    },
    "/admin/category/page/:page": ({ data }) => {
        print(AdminCateListPage, data.page);
    },

    "/products": () => {
        print(ProductsPage);
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
    "/admin/category": () => {
        print(AdminCateListPage);
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
    "/admin/profile": () => {
        print(AdminProfilePage);
    },
    "/admin/profile/change-password": () => {
        print(AdminUpdatePassPage);
    },
    "/admin/category/:id/edit": ({ data }) => {
        print(AdminEditCatePage, data.id);
    },
    "/admin/category/add": () => {
        print(AdminAddCatePage);
    },
    "/admin/product/add": () => {
        print(AdminAddProductPage);
    },
   
   
});

router.notFound(() => {
  
});

router.resolve();