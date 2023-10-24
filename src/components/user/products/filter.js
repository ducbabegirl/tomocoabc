/* eslint-disable no-plusplus */
import toastr from "toastr";
import { add, checkHeart } from "../../../api/favoritesProduct";
import {
    get, getAllByFilter, update,
} from "../../../api/product";
import { formatCurrency, getUser, reRender } from "../../../utils";
import WishList from "../wishlist";
import WishListLabel from "../wishlistLabel";

const FilterProduct = {
    render(totalProduct, start, limit) {
        return /* html */`
        <div class="border-b pb-2 flex justify-between items-center">
            <div class="flex items-center">
                <ul class="flex">
                    <li data-view="grid" class="filter__btn-view active text-xl cursor-pointer mr-2 text-gray-600 transition ease-linear duration-150 hover:text-[#D9A953]">
                        <i class="fas fa-th"></i>
                    </li>
                    <li data-view="list" class="filter__btn-view text-xl cursor-pointer mr-2 text-gray-600 transition ease-linear duration-150 hover:text-[#D9A953]">
                        <i class="fas fa-th-list"></i>
                    </li>
                </ul>

                <span>Hiển thị ${(start + 1) > 0 ? (start + 1) : 0} - ${(start + limit) < totalProduct ? (start + limit) : totalProduct} trong ${totalProduct} kết quả</span>
            </div>

            <form action="" class="flex items-center">
                <label for="filter-sort">Sắp xếp theo</label>

                <select id="filter-sort" class="ml-2 flex-1 shadow-[inset_0_-1.4em_1em_0_rgba(0,0,0,0.02)] hover:shadow-none hover:cursor-default focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-9 text-sm outline-none">
                    <option value="">Mặc định</option>
                    <option value="createdAt-desc">Thứ tự theo ngày tạo: mới nhất</option>
                    <option value="createdAt-asc">Thứ tự theo ngày tạo: cũ nhất</option>
                    <option value="favorites-asc">Lượt yêu thích: thấp -> cao</option>
                    <option value="favorites-desc">Lượt yêu thích: cao -> thấp</option>
                    <option value="view-asc">Lượt xem: thấp -> cao</option>
                    <option value="view-desc">Lượt xem: cao -> thấp</option>
                    <option value="price-asc">Thứ tự theo giá: thấp -> cao</option>
                    <option value="price-desc">Thứ tự theo giá: cao -> thấp</option>
                </select>
            </form>
        </div>
        `;
    },
    afterRender() {
        const afterRenderProduct = () => {
            // yêu thích sp
            const btnsHeart = document.querySelectorAll(".btn-heart");
            btnsHeart.forEach((btn) => {
                const { id } = btn.dataset;

                btn.addEventListener("click", async () => {
                    const userLogged = getUser();

                    if (!userLogged) {
                        toastr.info("Vui lòng đăng nhập để yêu thích sản phẩm");
                    } else {
                        const { data: heartList } = await checkHeart(userLogged.id, id);

                        if (heartList.length) {
                            toastr.info("Sản phẩm đã tồn tại trong danh sách yêu thích");
                        } else {
                            const { data: productInfo } = await get(id);
                            productInfo.favorites += 1;

                            // cập nhật số lượt yêu thích
                            update(id, productInfo);

                            // lưu thông tin
                            const date = new Date();
                            add({
                                userId: userLogged.id,
                                productId: +id,
                                createdAt: date.toISOString(),
                            })
                                .then(() => toastr.success("Đã thêm vào danh sách yêu thích"))
                                .then(() => reRender(WishListLabel, ".header-icon-heart"))
                                .then(() => reRender(WishList, "#wishlist"))
                                .then(() => document.querySelector("#wishlist").classList.add("active"));
                        }
                    }
                });
            });
        };
        afterRenderProduct();

        // render rating
        const renderRating = (listRating) => {
            let htmlRating = "";

            if (listRating) {
                const sum = listRating.reduce((total, rating) => total + rating.ratingNumber, 0);
                const ratingAvg = sum / listRating.length;

                for (let i = 0; i < Math.ceil(ratingAvg); i++) {
                    htmlRating += /* html */`
                    <div class="text-yellow-400">
                        <i class="fas fa-star"></i>
                    </div>
                `;
                }

                for (let i = 0; i < 5 - Math.ceil(ratingAvg); i++) {
                    htmlRating += /* html */`
                    <div class="text-gray-300">
                        <i class="fas fa-star"></i>
                    </div>
                `;
                }
            } else {
                htmlRating = `
                <div class="text-gray-300">
                    <i class="fas fa-star"></i>
                </div>
                <div class="text-gray-300">
                    <i class="fas fa-star"></i>
                </div>
                <div class="text-gray-300">
                    <i class="fas fa-star"></i>
                </div>
                <div class="text-gray-300">
                    <i class="fas fa-star"></i>
                </div>
                <div class="text-gray-300">
                    <i class="fas fa-star"></i>
                </div>
                `;
            }

            return htmlRating;
        };

        // render sp
        const productsElement = document.querySelector("#product-list");
        const renderByFilter = (typeView, productList) => {
            let html = "";
            if (typeView === "grid") {
                html = `<div class="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">`;
                productList.forEach((item) => {
                    html += /* html */`
                        <div class="group product-item" data-id="${item.id}">
                            <div class="relative bg-[#f7f7f7] overflow-hidden">
                                <a href="/#/product/${item.id}" style="background-image: url(${item.image})" class="bg-cover pt-[100%] bg-center block"></a>
                                <button class="absolute w-full bottom-0 h-9 bg-[#D9A953] text-center text-gray-50 opacity-95 uppercase font-semibold text-sm transition ease-linear duration-300 hover:opacity-100 hover:text-white translate-y-full group-hover:translate-y-0">Xem nhanh</button>
                                <button data-id="${item.id}" class="btn-heart absolute top-3 right-3 w-8 h-8 rounded-full border-2 text-[#c0c0c0] text-lg border-[#c0c0c0] transition duration-300 hover:text-white hover:bg-red-700 hover:border-red-700 opacity-0 group-hover:opacity-100">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>

                            <div class="text-center py-3">
                                <p class="uppercase text-xs text-gray-400">${item.category.name}</p>
                                <a href="/#/product/${item.id}" class="block font-semibold text-lg">${item.name}</a>
                                <ul class="flex text-yellow-500 text-xs justify-center pt-1">
                                    ${renderRating(item.ratings.length ? item.ratings : 0)}
                                </ul>
                                <div class="text-sm pt-1">
                                    ${formatCurrency(item.price)}
                                </div>
                            </div>
                        </div>
                    `;
                });
                html += "</div>";
            } else if (typeView === "list") {
                html = `<div class="grid grid-cols-1 divide-y">`;

                productList.forEach((item) => {
                    html += /* html */`
                    <div class="grid grid-cols-12 py-4 gap-3 product-item" data-id="${item.id}">
                        <div class="col-span-3 relative group overflow-hidden">
                            <a href="/#/product/${item.id}" class="bg-no-repeat bg-cover bg-center block h-full bg-[#f7f7f7] absolute w-full" style="background-image: url(${item.image})"></a>
                            <button class="absolute w-full h-8 bottom-0 bg-[#D9A953] opacity-90 transition ease-linear duration-300 text-white font-semibold uppercase text-sm hover:opacity-100 translate-y-full group-hover:translate-y-0">Xem nhanh</button>
                            <button data-id="${item.id}" class="btn-heart opacity-0 group-hover:opacity-100 absolute top-3 right-3 border-2 border-gray-400 rounded-full w-8 h-8 text-gray-400 transition ease-linear duration-300 hover:bg-red-700 hover:text-white hover:border-red-700">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>

                        <div class="col-span-9">
                            <h3>
                                <a href="/#/product/${item.id}" class="block font-semibold text-xl text-gray-800 pb-1 mb-3 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300">${item.name}</a>
                            </h3>
                            <ul class="flex items-center mt-4">
                                <li class="flex text-yellow-400 text-xs pr-6 relative after:content-[''] after:absolute after:right-3 after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:bg-gray-300 after:h-4">
                                    ${renderRating(item.ratings.length ? item.ratings : 0)}
                                </li>
                                <li class="pr-6 relative after:content-[''] after:absolute after:right-3 after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:bg-gray-300 after:h-4">${item.ratings.length} Đánh giá</li>
                                <li>10 Đã bán</li>
                            </ul>
                            <div class="mt-1 mb-2">
                                <span class="text-xl text-[#D9A953] font-semibold">${formatCurrency(item.price)}</span>
                            </div>
                            <p>
                                ${item.description}
                            </p>
                            <button class="mt-4 px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                    `;
                });

                html += "</div>";
            }

            productsElement.innerHTML = html;
        };

        // lấy ds id sp
        const listProduct = document.querySelectorAll(".product-item");
        const listId = Array.from(listProduct).map((item) => {
            const { id } = item.dataset;
            return +id;
        });

        // bắt sự kiện thay đổi bộ lọc sp
        const filterElement = document.querySelector("#filter-sort");
        filterElement.addEventListener("change", async (e) => {
            // lọc theo
            const sort = e.target.value;

            // kiểu hiển thị
            const viewActive = document.querySelector(".filter__btn-view.active");
            const { view } = viewActive.dataset;

            // render ra màn hình
            const { data: productData } = await getAllByFilter(sort, listId);
            renderByFilter(view, productData);

            afterRenderProduct();
        });

        // đổi kiểu hiển thị sp
        const btnsView = document.querySelectorAll(".filter__btn-view");
        btnsView.forEach((btn) => {
            const { view: typeView } = btn.dataset;

            btn.addEventListener("click", async () => {
                document.querySelector(".filter__btn-view.active").classList.remove("active");
                btn.classList.add("active");

                // lọc theo
                const sortBy = filterElement.value;

                // render ra màn hình
                const { data: productData } = await getAllByFilter(sortBy, listId);
                renderByFilter(typeView, productData);

                afterRenderProduct();
            });
        });
    },
};

export default FilterProduct;