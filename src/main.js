import Navigo from "navigo";
import HomePage from "./pages/user/home";

import AdminCateListPage from "./pages/admin/category";

import "slick-carousel/slick/slick.css";
import "@fortawesome/fontawesome-free/js/brands";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "toastr/build/toastr.css";
import "sweetalert2/dist/sweetalert2.css";


const router = new Navigo("/", { linksSelector: "a", hash: true });

const print = async (content, id, pageNumber) => {
    document.querySelector("#app").innerHTML = await content.render(id, pageNumber);

    if (content.afterRender) content.afterRender(id);

    // change title
    if (content.getTitle) document.title = await content.getTitle(id);
};


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

   
});

router.notFound(() => {
  
});

router.resolve();