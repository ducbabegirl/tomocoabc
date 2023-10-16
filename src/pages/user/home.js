import $ from "jquery"
import Header from "../../components/user/header";

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

      
        `;
    },
    afterRender() {
        Header.afterRender();
      

        
    },
};


export default HomePage;