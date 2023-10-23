/* eslint-disable no-plusplus */
import { formatCurrency } from "../../../utils";
import FilterProduct from "./filter";

const ProductContent = {
    render(productList, currentPage, total, totalPage, start, limit, url) {
        let htmlPagination = "";
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= totalPage; i++) {
            htmlPagination += `
            <li class="">
                <a href="/#/${url}/page/${i}"class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white ${+currentPage === i ? "border-[#D9A953] bg-[#D9A953] text-white" : "border-gray-500 text-gray-500"}">${i}</a>
            </li>
            `;
        }

        // render rating
        const renderRating = (listRating) => {
            let htmlRating = "";

            if (listRating) {
                const sum = listRating.reduce((result, rating) => result + rating.ratingNumber, 0);
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

        return /* html */`
        <div class="col-span-12 lg:col-span-9">
            <!-- filter -->
            ${FilterProduct.render(total, start, limit)}
            <!-- end filter -->

            <div id="product-list">
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    ${productList.map((item) => /* html */`
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
                        `).join("")}
                </div>
            </div>

            <!-- pagination -->
            <ul class="flex justify-center mt-5">
                ${currentPage > 1 ? `
                <li>
                    <a href="/#/${url}/page/${currentPage - 1}" class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold border-gray-500 text-gray-500 mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white">
                        <button>
                            <i class="fas fa-angle-left"></i>
                        </button>
                    </a>
                </li>
                ` : ""}
                ${htmlPagination}
                
                ${currentPage <= totalPage - 1 ? `
                <li>
                    <a href="/#/${url}/page/${+currentPage + 1}" class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold border-gray-500 text-gray-500 mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white">
                        <button>
                            <i class="fas fa-angle-right"></i>
                        </button>
                    </a>
                </li>
                ` : ""}
            </ul>
        </div>
        `;
    },
    afterRender() {
        FilterProduct.afterRender();
    },
};

export default ProductContent;