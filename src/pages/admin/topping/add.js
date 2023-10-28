import toastr from "toastr";
import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import validate from "jquery-validation";
import { add } from "../../../api/topping";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { reRender } from "../../../utils";

const AdminAddToppingPage = {
    getTitle() {
        return "Add Topping | Administrator";
    },
    render() {
        return /* html */ `
        <section class="min-h-screen bg-gray-50 dashboard">
            ${AdminNav.render("topping")}
            
            <div class="ml-0 transition md:ml-60">
                <header class="left-0 md:left-60 fixed right-0 top-0">
                    ${HeaderTop.render()}

                    <div class="px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
                        <div class="flex items-center text-sm text-gray-600">
                            <h5 class="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
                            Toppings
                            </h5>
                            <span>Thêm topping</span>
                        </div>

                        <a href="/#/admin/topping">
                            <button type="button" class="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                DS topping
                            </button>
                        </a>
                    </div>
                </header>
                <div class="p-6 mt-24">
                    <form action="" method="POST" id="form__add-topping">
                        <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <span class="font-semibold mb-4 block text-xl">Thông tin chi tiết topping:</span>

                                <div class="grid grid-cols-6 gap-3">
                                    <div class="col-span-6">
                                        <label for="form__add-topping-name" class="block text-sm font-medium text-gray-700">Tên topping</label>
                                        <input type="text" name="form__add-topping-name" id="form__add-topping-name" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập tên topping">
                                    </div>

                                    <div class="col-span-6">
                                        <label for="form__add-topping-price" class="block text-sm font-medium text-gray-700">Giá topping</label>
                                        <input type="number" name="form__add-topping-price" id="form__add-topping-price" class="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Nhập giá topping">
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Thêm topping
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

        const toppingName = $("#form__add-topping-name");
        const toppingPrice = $("#form__add-topping-price");

        $("#form__add-topping").validate({
            rules: {
                "form__add-topping-name": "required",
                "form__add-topping-price": {
                    required: true,
                    number: true,
                },
            },
            messages: {
                "form__add-topping-name": "Vui lòng nhập tên topping",
                "form__add-topping-price": {
                    required: "Vui lòng nhập giá topping",
                    number: "Không đúng định dạng, vui lòng nhập lại",
                },
            },
            submitHandler() {
                (async () => {
                    const toppingData = {
                        name: toppingName.val(),
                        price: +toppingPrice.val(),
                    };

                    add(toppingData)
                        .then(() => toastr.success("Thêm thành công"))
                        .then(() => reRender(AdminAddToppingPage, "#app"));
                })();
            },
        });
    },
};

export default AdminAddToppingPage;