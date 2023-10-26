import toastr from "toastr";
import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import validate from "jquery-validation";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getAll as getAllCate } from "../../../api/category";
import { add } from "../../../api/product";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { reRender, uploadFile } from "../../../utils";

const AdminAddProductPage = {
    getTitle() {
        return "Add Product | Administrator";
    },
    async render() {
        const { data: cateList } = await getAllCate();

        return /* html */ `
        <section class="min-h-screen bg-gray-50 dashboard">
            ${AdminNav.render("product")}
            
            <div class="ml-0 transition md:ml-60">
                <header class="left-0 md:left-60 fixed right-0 top-0 z-20">
                    ${HeaderTop.render()}

                    <div class="px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
                        <div class="flex items-center text-sm text-gray-600">
                            <h5 class="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
                            Product
                            </h5>
                            <span>Thêm sản phẩm</span>
                        </div>

                        <a href="/#/admin/product">
                            <button type="button" class="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                DS sản phẩm
                            </button>
                        </a>
                    </div>
                </header>
                <div class="p-6 mt-24">
                    <form action="" id="form__add-product" method="POST">
                        <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <span class="font-semibold mb-4 block text-xl">Thông tin chi tiết sản phẩm:</span>

                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6">
                                        <label for="form__add-product-name" class="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                                        <input type="text" name="form__add-product-name" id="form__add-product-name" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập tên sản phẩm">
                                    </div>

                                    <div class="col-span-6">
                                        <label for="form__add-product-price" class="block text-sm font-medium text-gray-700">Giá sản phẩm</label>
                                        <input type="number" name="form__add-product-price" id="form__add-product-price" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập giá sản phẩm">
                                    </div>
        
                                    <div class="col-span-6">
                                        <label for="form__add-product-description" class="mb-1 block text-sm font-medium text-gray-700">Mô tả</label>
                                        <textarea id="form__add-product-description" data-error=".error-desc" name="form__add-product-description" rows="3" class="py-2 px-3 focus:outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Nhập mô tả sản phẩm"></textarea>
                                        <div class="error-desc text-sm mt-0.5 text-red-500"></div>
                                    </div>
        
                                    <div class="col-span-6 md:col-span-3">
                                        <label for="form__add-product-cate" class="block text-sm font-medium text-gray-700">Danh mục sản phẩm</label>
                                        <select id="form__add-product-cate" name="form__add-product-cate" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn danh mục sản phẩm --</option>
                                            ${cateList.map((cate) => `
                                                <option value="${cate.id}">${cate.name}</option>
                                                `)}
                                        </select>
                                    </div>
        
                                    <div class="col-span-6 md:col-span-3">
                                        <label for="form__add-product-stt" class="block text-sm font-medium text-gray-700">Trạng thái</label>
                                        <select id="form__add-product-stt" name="form__add-product-stt" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn trạng thái sản phẩm --</option>
                                            <option value="0" selected="">Ẩn</option>
                                            <option value="1">Hiển thị</option>
                                        </select>
                                    </div>

                                    <div class="col-span-3">
                                        <label class="block text-sm font-medium text-gray-700">Xem trước ảnh</label>
                                        <div class="mt-1">
                                            <img src="https://res.cloudinary.com/levantuan/image/upload/v1644302455/assignment-js/thumbnail-image-vector-graphic-vector-id1147544807_ochvyr.jpg" alt="Preview Image" id="form__add-product-preview" class="h-60 w-full object-cover rounded-md">
                                        </div>
                                    </div>

                                    <div class="col-span-6">
                                        <label class="block text-sm font-medium text-gray-700">Ảnh sản phẩm</label>
                                        <div class="w-full mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div class="space-y-1 text-center">
                                                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                                <div class="flex text-sm text-gray-600">
                                                    <label for="form__add-product-image" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input id="form__add-product-image" data-error=".error-image" name="form__add-product-image" type="file" class="sr-only">
                                                    </label>
                                                    <p class="pl-1">or drag and drop</p>
                                                </div>
                                                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                        <div class="error-image text-sm mt-0.5 text-red-500"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Thêm sản phẩm
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="fixed inset-0 z-10 w-screen h-screen bg-black bg-opacity-25 hidden dashboard__overlay"></div>
        </section>
        `;
    },
    afterRender() {
        HeaderTop.afterRender();
        AdminNav.afterRender();

        const proName = $("#form__add-product-name");
        const proPrice = $("#form__add-product-price");
        const proDesc = document.querySelector("#form__add-product-description");
        const proCate = $("#form__add-product-cate");
        const proStt = $("#form__add-product-stt");
        const proImage = document.querySelector("#form__add-product-image");
        const proPreview = $("#form__add-product-preview");

        // ck editor
        let productDesc;
        ClassicEditor
            .create(proDesc)
            .then((newEditor) => { productDesc = newEditor; })
            .catch((error) => toastr.error(error));

        $("#form__add-product").validate({
            ignore: [],
            rules: {
                "form__add-product-name": "required",
                "form__add-product-price": {
                    required: true,
                    number: true,
                },
                "form__add-product-description": "valid_desc",
                "form__add-product-cate": "required",
                "form__add-product-stt": "required",
                "form__add-product-image": "required",
            },
            messages: {
                "form__add-product-name": "Vui lòng nhập tên sản phẩm",
                "form__add-product-price": {
                    required: "Vui lòng nhập giá sản phẩm",
                    number: "Không đúng định dạng, vui lòng nhập lại",
                },
                "form__add-product-description": "Vui lòng nhập mô tả sản phẩm",
                "form__add-product-cate": "Vui lòng chọn loại sản phẩm",
                "form__add-product-stt": "Vui lòng chọn trạng thái",
                "form__add-product-image": "Vui lòng chọn ảnh sản phẩm",
            },
            errorPlacement: (error, element) => {
                const placement = $(element).data("error");
                if (placement) {
                    $(placement).html(error);
                } else {
                    $(error).insertAfter(element);
                }
            },
            submitHandler() {
                (async () => {
                    const response = await uploadFile(proImage.files[0]);
                    const date = new Date();

                    add({
                        name: proName.val(),
                        image: response.data.url,
                        price: +proPrice.val(),
                        description: productDesc.getData(),
                        categoryId: +proCate.val(),
                        status: +proStt.val(),
                        view: 0,
                        favorites: 0,
                        createdAt: date.toISOString(),
                        updatedAt: date.toISOString(),
                    })
                        .then(() => toastr.success("Thêm sản phẩm thành công"))
                        .then(() => reRender(AdminAddProductPage, "#app"));
                })();
            },
        });

        $.validator.addMethod("valid_desc", () => {
            const contentLength = productDesc.getData().trim().length;
            return contentLength > 0;
        });

        // preview iamge
        proImage.addEventListener("change", () => {
            proPreview.prop("src", URL.createObjectURL(proImage.files[0]));
        });
    },
};

export default AdminAddProductPage;