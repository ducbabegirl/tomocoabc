import toastr from "toastr";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import $ from "jquery";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { reRender, uploadFile } from "../../../utils";
import { get, update } from "../../../api/news";
import AdminNewsListPage from ".";
// eslint-disable-next-line no-unused-vars
import { getAll } from "../../../api/cateNews";

const AdminEditNewsPage = {
    getTitle() {
        return "Update News | Administrator";
    },
    async render(id) {
        const { data: newsData } = await get(id);
        const { data: cateData } = await getAll();

        return /* html */ `
        <section class="min-h-screen bg-gray-50 dashboard">
            ${AdminNav.render("news")}
        
            <div class="ml-0 transition md:ml-60">
                <header class="left-0 md:left-60 fixed right-0 top-0 z-20">
                ${HeaderTop.render()}

                <div class="px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
                        <div class="flex items-center text-sm text-gray-600">
                            <h5 class="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
                                News
                            </h5>
                            <span>Cập nhật bài viết</span>
                        </div>

                        <a href="/#/admin/news">
                            <button type="button" class="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                DS bài viết
                            </button>
                        </a>
                    </div>
                </header>
                <div class="p-6 mt-24">
                <form action="" method="POST" id="form__edit-news" data-id="${newsData.id}">
                    <div class="shadow overflow-hidden sm:rounded-md">
                        <div class="px-4 py-5 bg-white sm:p-6">
                            <span class="font-semibold mb-4 block text-xl">Thông tin chi tiết bài viết:</span>

                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6">
                                        <label for="form__edit-news-title" class="block text-sm font-medium text-gray-700">Tiêu đề bài viết</label>
                                        <input type="text" name="form__edit-news-title" id="form__edit-news-title" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập tiêu đề bài viết" value="${newsData.title}">
                                    </div>

                                    <div class="col-span-6">
                                        <label for="form__edit-news-desc" class="mb-1 block text-sm font-medium text-gray-700">Mô tả ngắn</label>
                                        <textarea id="form__edit-news-desc" data-error=".error-desc" name="form__edit-news-desc" rows="3" class="py-2 px-3 focus:outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Nhập mô tả bài viết">${newsData.description}</textarea>
                                        <div class="error-desc text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6">
                                        <label for="form__edit-news-content" class="mb-1 block text-sm font-medium text-gray-700">Nội dung</label>
                                        <textarea data-error=".error-content" id="form__edit-news-content" name="form__edit-news-content" rows="10" class="py-2 px-3 focus:outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Nhập nội dung bài viết">${newsData.content}</textarea>
                                        <div class="error-content text-sm mt-0.5 text-red-500"></div>
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="form__edit-news-cate" class="block text-sm font-medium text-gray-700">Danh mục bài viết</label>
                                        <select id="form__edit-news-cate" name="form__edit-news-cate" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn danh mục bài viết --</option>
                                            ${cateData.map((cate) => `
                                            <option value="${cate.id}" ${newsData.cateNewId === cate.id ? "selected" : ""}>${cate.name}</option>`)}
                                        </select>
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="form__edit-news-cate" class="block text-sm font-medium text-gray-700">Danh mục bài viết</label>
                                        <select id="form__edit-news-cate" name="form__edit-news-cate" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn danh mục bài viết --</option>
                                            ${cateData.map((cate) => `
                                                <option value="${cate.id}" ${newsData.cateNewId === cate.id ? "selected" : ""}>${cate.name}</option>`)}
                                        </select>
                                    </div>

                                    <div class="col-span-6 md:col-span-3">
                                        <label for="form__edit-news-stt" class="block text-sm font-medium text-gray-700">Trạng thái</label>
                                        <select id="form__edit-news-stt" name="form__edit-news-stt" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">-- Chọn trạng thái bài viết --</option>
                                            <option value="0" ${!newsData.status ? "selected" : ""}>Ẩn</option>
                                            <option value="1" ${newsData.status ? "selected" : ""}>Hiển thị</option>
                                        </select>
                                    </div>

                                    <div class="col-span-3">
                                        <label class="block text-sm font-medium text-gray-700">Xem trước ảnh bìa</label>
                                        <div class="mt-1">
                                            <img src="${newsData.thumbnail}" alt="" id="form__edit-news-preview" class="h-60 w-full object-cover rounded-md">
                                        </div>
                                    </div>

                                    <div class="col-span-6">
                                        <label class="block text-sm font-medium text-gray-700">Ảnh bìa</label>
                                        <div class="w-full mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div class="space-y-1 text-center">
                                                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                                <div class="flex text-sm text-gray-600">
                                                <label for="form__edit-news-image" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span>Upload a file</span>
                                                    <input id="form__edit-news-image" data-error=".error-image" name="form__edit-news-image" type="file" class="sr-only">
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
                                Lưu thay đổi
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
    afterRender(id) {
        HeaderTop.afterRender();
        AdminNav.afterRender();

        const title = $("#form__edit-news-title");
        const description = document.querySelector("#form__edit-news-desc");
        const content = document.querySelector("#form__edit-news-content");
        const cateId = $("#form__edit-news-cate");
        const thumbnail = document.querySelector("#form__edit-news-image");
        const imgPreview = $("#form__edit-news-preview");
        const newsStt = $("#form__edit-news-stt");

        let contentNews;
        ClassicEditor
            .create(content)
            .then((newEditor) => { contentNews = newEditor; })
            .catch((error) => toastr.error(error));

        let descriptionNews;
        ClassicEditor
            .create(description)
            .then((newEditor) => { descriptionNews = newEditor; })
            .catch((error) => toastr.error(error));

        $("#form__edit-news").validate({
            ignore: [],
            rules: {
                "form__edit-news-title": "required",
                "form__edit-news-desc": "desc",
                "form__edit-news-content": "content",
                "form__edit-news-cate": "required",
                "form__edit-news-stt": "required",
            },
            messages: {
                "form__edit-news-title": "Vui lòng nhập tiêu đề bài viết",
                "form__edit-news-desc": "Vui lòng nhập mô tả bài viết",
                "form__edit-news-content": "Vui lòng nhập nội dung bài viết",
                "form__edit-news-cate": "Vui lòng nhập danh mục bài viết",
                "form__edit-news-stt": "Vui lòng chọn trạng thái bài viết",
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
                    const date = new Date();
                    const postData = {
                        title: title.val(),
                        description: descriptionNews.getData(),
                        content: contentNews.getData(),
                        cateNewId: +cateId.val(),
                        status: +newsStt.val(),
                        updatedAt: date.toISOString(),
                    };

                    if (thumbnail.files.length) {
                        const response = await uploadFile(thumbnail.files[0]);
                        postData.thumbnail = response.data.url;
                    }

                    update(id, postData)
                        .then(() => toastr.success("Cập nhật thành công"))
                        .then(() => { window.location.href = "/#/admin/news"; })
                        .then(() => reRender(AdminNewsListPage, "#app"));
                })();
            },
        });
        $.validator.addMethod("desc", () => {
            const contentLength = descriptionNews.getData().trim().length;
            return contentLength > 0;
        });

        $.validator.addMethod("content", () => {
            const contentLength = contentNews.getData().trim().length;
            return contentLength > 0;
        });

        // bắt sự kiện chọn ảnh => preview
        thumbnail.addEventListener("change", (e) => {
            imgPreview.prop("src", URL.createObjectURL(e.target.files[0]));
        });
    },

};
export default AdminEditNewsPage;