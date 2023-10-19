

const WishListLabel = {
    async render(){
        return`
        <div class="relative">
            <label for="" id="header-wishlist-label" class="absolute w-4 h-4 bg-green-700 text-xs text-center rounded-full -right-3 -top-1">10</label>
            <i class="fas fa-heart"></i>
        </div>
        `;
    }
};
export default WishListLabel;