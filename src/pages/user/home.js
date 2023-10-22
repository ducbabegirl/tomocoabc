import $ from "jquery"
import Header from "../../components/user/header";
import Footer from "../../components/user/footer";
import Banner from "../../components/user/home/banner";
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
  

        
    },
};


export default HomePage;