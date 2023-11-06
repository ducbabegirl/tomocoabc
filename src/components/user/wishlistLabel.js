import { getAll } from "../../api/favoritesProduct";
import { getUser } from "../../utils";

const WishListLabel = {
    async render() {
        return `
        <div class="relative">
            <label for="" id="header-wishlist-label" class="absolute w-4 h-4 bg-green-700 text-xs text-center rounded-full -right-3 -top-1">10</label>
            <i class="fas fa-heart"></i>
        </div>
        `;
    },
    async afterRender() {
        const userLogged = getUser();
        const wishlistLabel = document.querySelector("#header-wishlist-label");
        if (userLogged) {
            const { data } = await getAll(userLogged.id);
            wishlistLabel.innerHTML = data.length;
        } else {
            wishlistLabel.innerHTML = "0";
        }
    },
};

export default WishListLabel;