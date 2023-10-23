
import WishListLabel from "./wishlistLabel";

const WishList = {
    async render(){
        const userLogged = getUser();

        return /* html */`
        <div class="wishlist__overlay invisible opacity-0 transition-all duration-400 ease-linear fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.6)] z-20"></div>
       
        <div class="wishlist__content transition duration-500 ease fixed top-0 right-0 bottom-0 min-w-[360px] bg-white shadow z-20 translate-x-full">
            <header class="px-3 h-14 flex justify-between items-center border-b-2">
                <h1 class="uppercase font-semibold text-lg">Danh sách yêu thích</h1>
                <button id="wishlist__btn-close" class="py-2 font-semibold text-xl text-gray-500 transition duration-200 ease-linear hover:text-black">
                    <i class="fas fa-times"></i>
                </button>
            </header>
       
             <div class="h-[calc(100vh-56px)] overflow-y-auto">
               
            </div>
        </div>
        `;
    },

        afterRender(){
            const overlay = document.querySelector(".wishlist__overlay");
            const wishlistElement = document.querySelector(".wishlist");
            const closeBtn = document.querySelector("#wishlist__btn-close");

             overlay.addEventListener("click", () => wishlistElement.classList.remove("active"));
             closeBtn.addEventListener("click", () => wishlistElement.classList.remove("active"));
           
        // xóa wishlist
            const btnsDelete = document.querySelectorAll(".wishlist-icon-delete");
            btnsDelete.forEach((btn) => {
            const { id } = btn.dataset;

                btn.addEventListener("click", () => {
                    remove(id)
                        .then(() => reRender(WishListLabel, ".header-icon-heart"))
                        .then(() => document.querySelector(`.wishlist-item-${id}`).remove());
                });
            });
        },


};
export default WishList;