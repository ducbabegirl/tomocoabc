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
import HomePage from "./pages/user/home";
import UpdateInfoPage from "./pages/user/my-account";
import MyAccUpdatePass from "./pages/user/my-account/updatePass";
import ProductsPage from "./pages/user/products";
import ProductByCatePage from "./pages/user/productByCate";
import DashboardPage from "./pages/admin/dashboard";
import AdminUserListPage from "./pages/admin/user";
import AdminAddUserPage from "./pages/admin/user/add";
import AdminEditUserPage from "./pages/admin/user/edit";
import AdminToppingListPage from "./pages/admin/topping";
import AdminAddToppingPage from "./pages/admin/topping/add";
import AdminEditToppingPage from "./pages/admin/topping/edit";
import AdminProductListPage from "./pages/admin/product";
import AdminVoucherListPage from "./pages/admin/voucher";
import AdminAddVoucherPage from "./pages/admin/voucher/add";
import AdminEditVoucherPage from "./pages/admin/voucher/edit";
import AdminAddProductPage from "./pages/admin/product/add";
import AdminEditProductPage from "./pages/admin/product/edit";
import AdminCateListPage from "./pages/admin/category";
import AdminAddCatePage from "./pages/admin/category/add";
import AdminEditCatePage from "./pages/admin/category/edit";
import NotFoundPage from "./pages/user/notFound";
import NewsByCatePage from "./pages/user/newsByCate";
import AdminNewsListPage from "./pages/admin/news";
import AdminAddNewsPage from "./pages/admin/news/add";

import AdminEditNewsPage from "./pages/admin/news/edit";
import NewsPage from "./pages/user/news";


import AdminProfilePage from "./pages/admin/profile";
import AdminUpdatePassPage from "./pages/admin/profile/updatePass";



import AdminCateNewsListPage from "./pages/admin/categoryNews";
import AdminEditCateNewsPage from "./pages/admin/categoryNews/edit";
import AdminAddCateNewsPage from "./pages/admin/categoryNews/add";



import AdminContactListPage from "./pages/admin/contact";
import AdminDetailContactPage from "./pages/admin/contact/details";

import AdminCmtListPage from "./pages/admin/comments";
import AdminDetailCmtPage from "./pages/admin/comments/detail";
import AdminSliderListPage from "./pages/admin/slider";
import AdminAddSliderPage from "./pages/admin/slider/add";
import AdminEditSliderPage from "./pages/admin/slider/edit";
import AdminSizeListPage from "./pages/admin/size";
import AdminAddSizePage from "./pages/admin/size/add";
import AdminEditSizePage from "./pages/admin/size/edit";

import { getUser } from "./utils";
import ProductDetailPage from "./pages/user/productDetails";
import CheckoutPage from "./pages/user/cart/checkout";
import ThanksPage from "./pages/user/cart/thanhks";
import AdminCartListPage from "./pages/admin/cart";
import AdminCartDetailPage from "./pages/admin/cart/detail";


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
    "/category/:id": ({ data }) => {
        print(ProductByCatePage, data.id);
    },
    "/category/:id/page/:page": ({ data }) => {
        print(ProductByCatePage, data.id, data.page);
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
    "/category-news/:id": ({ data }) => {
        print(NewsByCatePage, data.id);
    },
    "/category-news/:id/page/:page": ({ data }) => {
        print(NewsByCatePage, data.id, data.page);
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

    "/admin/user": () => {
        print(AdminUserListPage);
    },
    "/admin/user/page/:page": ({ data }) => {
        print(AdminUserListPage, data.page);
    },
    "/admin/user/add": () => {
        print(AdminAddUserPage);
    },
    "/admin/user/:id/edit": ({ data }) => {
        print(AdminEditUserPage, data.id);
    },
    "/admin/profile": () => {
        print(AdminProfilePage);
    },
    "/admin/profile/change-password": () => {
        print(AdminUpdatePassPage);
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

    "/admin/news": () => {
        print(AdminNewsListPage);
    },
    "/admin/news/page/:page": ({ data }) => {
        print(AdminNewsListPage, data.page);
    },
    "/admin/news/add": () => {
        print(AdminAddNewsPage);
    },
    "/admin/news/:id/edit": ({ data }) => {
        print(AdminEditNewsPage, data.id);
    },


    "/admin/slider": () => {
        print(AdminSliderListPage);
    },
    "/admin/slider/page/:page": ({ data }) => {
        print(AdminSliderListPage, data.page);
    },

    "/admin/topping": () => {
        print(AdminToppingListPage);
    },
    "/admin/topping/page/:page": ({ data }) => {
        print(AdminToppingListPage, data.page);
    },
    "/admin/topping/add": () => {
        print(AdminAddToppingPage);
    },
    "/admin/topping/:id/edit": ({ data }) => {
        print(AdminEditToppingPage, data.id);
    },

    "/admin/voucher": () => {
        print(AdminVoucherListPage);
    },
    "/admin/voucher/page/:page": ({ data }) => {
        print(AdminVoucherListPage, data.page);
    },
    "/admin/voucher/add": () => {
        print(AdminAddVoucherPage);
    },
    "/admin/voucher/:id/edit": ({ data }) => {
        print(AdminEditVoucherPage, data.id);
    },
    "/admin/category-news": () => {
        print(AdminCateNewsListPage);
    },
    "/admin/category-news/page/:page": ({ data }) => {
        print(AdminCateNewsListPage, data.page);
    },
    "/admin/category-news/add": () => {
        print(AdminAddCateNewsPage);
    },
    "/admin/category-news/:id/edit": ({ data }) => {
        print(AdminEditCateNewsPage, data.id);
    },

    "/admin/comment": () => {
        print(AdminCmtListPage);
    },
    "/admin/comment/:id/detail": ({ data }) => {
        print(AdminDetailCmtPage, data.id);
    },
    "/admin/contact": () => {
        print(AdminContactListPage);
    },
    "/admin/contact/page/:page": ({ data }) => {
        print(AdminContactListPage, data.page);
    },
    "/admin/contact/:id/detail": ({ data }) => {
        print(AdminDetailContactPage, data.id);
    },

    "/admin/slider/add": () => {
        print(AdminAddSliderPage);
    },
    "/admin/slider/:id/edit": ({ data }) => {
        print(AdminEditSliderPage, data.id);
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
    "/admin/cart": () => {
        print(AdminCartListPage);
    },
    "/admin/cart/:id/detail": ({ data }) => {
        print(AdminCartDetailPage, data.id);
    },
    "/admin/cart/page/:page": ({ data }) => {
        print(AdminCartListPage, data.page);
    },

});

router.notFound(() => {
    print(NotFoundPage);
});

router.resolve();