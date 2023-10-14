import Navigo from "navigo";
import HomePage from "./pages/user/home";
import "slick-carousel/slick/slick.css";
import "@fortawesome/fontawesome-free/js/brands";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "toastr/build/toastr.css";
import "sweetalert2/dist/sweetalert2.css";
import ProductsPage from "./pages/user/products";
import DashboardPage from "./pages/admin/dashboard";


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

    "/products": () => {
        print(ProductsPage);
    },


    "/admin": () => {
        print(DashboardPage);
    },
   
});

router.notFound(() => {
  
});

router.resolve();