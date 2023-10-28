/* eslint-disable no-plusplus */
import toastr from "toastr";
import { get, updateView,  } from "../../api/product";
import Footer from "../../components/user/footer";
import Header from "../../components/user/header";

import { formatCurrency, getUser, reRender } from "../../utils";

import { getAll as getAllSize, get as getSize } from "../../api/size";


// eslint-disable-next-line import/no-cycle


const ProductDetailPage = {
    async getTitle(id) {
        const { data: productDetail } = await get(id);
        return `${productDetail.name} - Trà sữa TOCOO`;
    },
    async render(id, pageNumber) {
        // update view
        const { data: productDetail } = await get(id);
        updateView(id, {
            view: +(productDetail.view + 1),
        });

        // ds topping
      

        // ds size
        const { data: sizeList } = await getAllSize();

        // get info current user
        const userLogged = getUser();

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

        return /* html */ `
        ${await Header.render()}

        <!-- content -->
        <main>
            <section class="container max-w-6xl mx-auto px-3 grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pb-8">
                <div class="relative group min-h-[500px]">
                    <div class="h-full absolute w-full bg-contain bg-center bg-no-repeat" style="background-image: url(${productDetail.image});"></div>
                    <button class="absolute bottom-2 left-2 rounded-full border-2 border-gray-400 w-9 h-9 text-gray-400 text-lg transition ease-linear duration-300 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white">
                        <i class="fas fa-expand-arrows-alt"></i>
                    </button>
                    <button data-id="${productDetail.id}" class="btn-heart opacity-0 group-hover:opacity-100 absolute top-3 right-3 border-2 border-gray-400 rounded-full w-8 h-8 text-gray-400 transition ease-linear duration-300 hover:bg-red-700 hover:text-white hover:border-red-700">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>

                <div>
                    <div class="flex justify-between">
                        <div>
                            <div class="flex">
                                <a href="/#/" class="text-gray-500 transition hover:text-black uppercase font-semibold text-sm block pr-4 relative after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:right-2 after:w-[1px] after:h-3 after:rotate-12 after:bg-gray-400">Home</a>
                                <a href="/#/category/${productDetail.category.id}" class="text-gray-500 transition hover:text-black uppercase font-semibold text-sm">${productDetail.category.name}</a>
                            </div>

                            <h1 class="font-semibold text-[28px] text-gray-800 pb-1 mb-3 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300">${productDetail.name}</h1>

                            <ul class="flex items-center mt-4">
                                <li class="flex text-yellow-400 text-xs pr-4 relative after:content-[''] after:absolute after:right-2 after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:bg-gray-300 after:h-4">
                                    ${renderRating(productDetail.ratings.length ? productDetail.ratings : 0)}
                                </li>
                                <li class="pr-4 relative after:content-[''] after:absolute after:right-2 after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:bg-gray-300 after:h-4">${productDetail.ratings.length} Đánh giá</li>
                                <li>10 Đã bán</li>
                            </ul>
                            <div class="mt-1 my-2">
                                <span class="text-3xl text-[#D9A953] font-semibold">${formatCurrency(productDetail.price)}</span>
                            </div>
                        </div>
                        <ul class="flex">
                            <li>
                                <button class="w-8 h-8 rounded-full border-2 border-gray-400 text-gray-400 transition ease-linear duration-200 hover:text-white hover:bg-[#D9A953] hover:border-[#D9A953]">
                                    <i class="fas fa-angle-left"></i>
                                </button>
                            </li>
                            <li>
                                <button class="w-8 ml-1 h-8 rounded-full border-2 border-gray-400 text-gray-400 transition ease-linear duration-200 hover:text-white hover:bg-[#D9A953] hover:border-[#D9A953]">
                                    <i class="fas fa-angle-right"></i>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div class="flex justify-between">
                        <div>
                            <form action="" id="form__add-cart" data-id="${id}">
                                <div class="flex items-center mt-2">
                                    <label for="" class="min-w-[80px] font-bold text-sm">Đá</label>
    
                                    <ul class="flex">
                                        <li>
                                            <input type="radio" value="0" class="form__add-cart-ice" hidden name="ice" id="ice-0">
                                            <label for="ice-0" class="block cursor-pointer px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500">0%</label>
                                        </li>
                                        <li>
                                            <input type="radio" value="30" class="form__add-cart-ice" hidden name="ice" id="ice-30">
                                            <label for="ice-30" class="block cursor-pointer px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500">30%</label>
                                        </li>
                                        <li>
                                            <input type="radio" value="50" class="form__add-cart-ice" hidden name="ice" id="ice-50">
                                            <label for="ice-50" class="block cursor-pointer px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500">50%</label>
                                        </li>
                                        <li>
                                            <input type="radio" value="70" class="form__add-cart-ice" hidden name="ice" id="ice-70">
                                            <label for="ice-70" class="block cursor-pointer px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500">70%</label>
                                        </li>
                                        <li>
                                            <input type="radio" value="100" checked class="form__add-cart-ice" hidden name="ice" id="ice-100">
                                            <label for="ice-100" class="block cursor-pointer px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500">100%</label>
                                        </li>
                                    </ul>
                                </div>
                                <div class="flex items-center mt-2">
                                    <label for="" class="min-w-[80px] font-bold text-sm">Đường</label>
    
                                    <ul class="flex">
                                        <li>
                                            <input type="radio" value="0" name="sugar" hidden class="form__add-cart-sugar" id="sugar-0">
                                            <label for="sugar-0" class="cursor-pointer block px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500">0%</label>
                                        </li>
                                        <li>
                                            <input type="radio" value="30" name="sugar" hidden class="form__add-cart-sugar" id="sugar-30">
                                            <label for="sugar-30" class="cursor-pointer block px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500">30%</label>
                                        </li>
                                        <li>
                                            <input type="radio" value="50" name="sugar" hidden class="form__add-cart-sugar" id="sugar-50">
                                            <label for="sugar-50" class="cursor-pointer block px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500">50%</label>
                                        </li>
                                        <li>
                                            <input type="radio" value="70" name="sugar" hidden class="form__add-cart-sugar" id="sugar-70">
                                            <label for="sugar-70" class="cursor-pointer block px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500">70%</label>
                                        </li>
                                        <li>
                                            <input type="radio" value="100" checked name="sugar" hidden class="form__add-cart-sugar" id="sugar-100">
                                            <label for="sugar-100" class="cursor-pointer block px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500">100%</label>
                                        </li>
                                    </ul>
                                </div>
                                <div class="flex items-center mt-2">
                                    <label for="" class="min-w-[80px] font-bold text-sm">Size</label>
    
                                    <ul class="flex">
                                        <li>
                                            <input hidden checked  value="" type="radio" name="size" class="form__add-cart-size" id="size-s">
                                            <label for="size-s" class="cursor-pointer block px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500">S</label>
                                        </li>
                                        ${sizeList.map((size) => `
                                            <li>
                                                <input hidden type="radio" value="${size.id}" name="size" class="form__add-cart-size" id="size-${size.name.toLowerCase()}">
                                                <label for="size-${size.name.toLowerCase()}" class="cursor-pointer block px-3 py-1 border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500">${size.name.toUpperCase()}</label>
                                            </li>
                                            `).join("")}
                                    </ul>
                                </div>
                                <div class="flex items-center mt-2">
                                    <label for="" class="min-w-[80px] font-bold text-sm">Topping</label>
                                    <select name="" id="form__add-cart-topping" class="px-3 py-1 outline-none border-2 border-gray-300 transition duration-300 hover:shadow-md rounded-[4px] mr-1 shadow-sm text-gray-500">
                                        <option value="">Chọn topping</option>
                                    </select>
                                </div>
    
                                <div class="border-b border-dashed pb-4 mt-6">
                                    <p class="form__add-cart-total-price h-0 overflow-hidden transition-all ease-linear duration-100 mt-6 border-t border-dashed pt-2 text-xl font-semibold">
                                        
                                    </p>
    
                                    <div class="flex mt-2 items-center">
                                        <div class="flex items-center h-9">
                                            <button type="button" id="form__add-cart-qnt-minus" class="px-2 bg-gray-100 border-gray-200 h-full border-l border-y transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">-</button>
                                            <input type="text" id="form__add-cart-qnt" class="border border-gray-200 h-full w-10 text-center outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc]" value="1">
                                            <button type="button" id="form__add-cart-qnt-plus" class="px-2 bg-gray-100 border-gray-200 h-full border-r border-y transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">+</button>
                                        </div>
                                        <button id="form__add-cart-btn" class="ml-2 px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Thêm vào giỏ hàng</button>
                                    </div>
                                </div>
                            </form>
    
                            <p class="mt-1 text-gray-500">
                                Danh mục:
                                <a href="/#/category/${productDetail.category.id}" class="transition hover:text-black">${productDetail.category.name}</a>
                            </p>

                            <ul class="flex mt-3">
                                <li class="mr-1.5">
                                    <a href="https://www.facebook.com/sharer/sharer.php?u=${window.location.href}/" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;" class="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500">
                                        <i class="fab fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li class="mr-1.5">
                                    <a href="https://twitter.com/share?url=${window.location.href}/" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;" class="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                </li>
                                <li class="mr-1.5">
                                    <a href="https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}/" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"  class="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500">
                                        <i class="fab fa-linkedin"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <button type="button" class="hidden form__add-cart-btn-clear text-gray-400 transition hover:text-black">Xóa</button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- tab -->
            <section class="container max-w-6xl mx-auto px-3">
                <ul class="flex border-t">
                    <li class="transition ease-linear duration-200 font-bold cursor-pointer hover:border-t-[#D9A953] hover:text-black uppercase pt-2 border-t-2 border-t-transparent pr-2 text-gray-400 text-xs">Mô tả</li>
                    <li class="transition ease-linear duration-200 font-bold cursor-pointer hover:border-t-[#D9A953] hover:text-black uppercase pt-2 border-t-2 border-t-[#D9A953] pr-2 text-black text-xs">Đánh giá</li>
                </ul>
            </section>

            <!-- panel -->
           

            <section class="container max-w-6xl px-3 mx-auto my-6">
                <div class="border-t">
                    <h2 class="text-2xl font-semibold mt-2">Sản phẩm tương tự</h2>
                  
                </div>
            </section>
        </main>
        <!-- end content -->

        ${Footer.render()}
        `;
    },
    afterRender(id) {
        Header.afterRender();
        Footer.afterRender();
     
      
       
       
    },
};

export default ProductDetailPage;