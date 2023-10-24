/* eslint-disable no-nested-ternary */
import Swal from "sweetalert2";
import { getByUserId, remove } from "../../../api/address";
import { getDistrictById, getProvinceById, getWardById } from "../../../api/location";
import Footer from "../../../components/user/footer";
import Header from "../../../components/user/header";
import MyAccNav from "../../../components/user/myAccNav";
import { getUser, reRender } from "../../../utils";

const MyAccAddressPage = {
    getTitle() {
        return "Thông tin thanh toán - Trà Sữa Yotea";
    },
    async render(pageNumber) {
        const userLogged = getUser();
        const { data } = await getByUserId(userLogged.id);

        // phân trang
        const total = data.length; // tổng số order
        const limit = 10;
        const currentPage = pageNumber ?? 1; // lấy số trang hiện tại

        // ds theo limit
        const { data: addressList } = await getByUserId(userLogged.id, currentPage, limit);

        // tính tổng số trang
        const totalPage = Math.ceil(total / limit);
        let htmlPagination = "";

        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= totalPage; i++) {
            htmlPagination += `
            <li class="">
                <a href="/#/my-account/cart/page/${i}"class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white ${+currentPage === i ? "border-[#D9A953] bg-[#D9A953] text-white" : "border-gray-500 text-gray-500"}">${i}</a>
            </li>
            `;
        }

        // render address theo id
        const renderAddress = async (wardCode, districtCode, provinceCode) => {
            const ward = await getWardById(wardCode);
            const district = await getDistrictById(districtCode);
            const province = await getProvinceById(provinceCode);
            return `${ward.name}, ${district.name}, ${province.name}`;
        };

        // eslint-disable-next-line no-restricted-syntax
        let htmlTable = "";
        // eslint-disable-next-line no-restricted-syntax
        for await (const address of addressList) {
            htmlTable += /* html */`
            <tr class="border-b">
                <td>#${address.id}</td>
                <td class="py-2">${address.fullName}</td>
                <td class="py-2">${address.phone}</td>
                <td class="py-2">${`${address.address}, ${await renderAddress(address.wardCode, address.districtCode, address.provinceCode)}`}</td>
                <td class="py-2 text-right">
                    <button data-id="${address.id}" class="btn-remove px-3 py-1.5 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Delete</button>
                    <a href="/#/my-account/address/${address.id}/edit">
                        <button class="px-3 py-1.5 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Edit</button>
                    </a>
                </td>
            </tr>
            `;
        }

        return /* html */ `
        ${await Header.render()}

        <!-- content -->
        <main>
            <section class="py-7 bg-gray-100 border-b">
                <div class="container max-w-6xl mx-auto px-3 text-gray-500">
                    <h1 class="uppercase font-semibold text-2xl">My account</h1>
                    <p class="text-sm mt-1 uppercase">Thông tin thanh toán</p>
                </div>
            </section>

            <section class="container max-w-6xl mx-auto px-3 grid grid-cols-12 gap-5 my-8">
                ${MyAccNav.render("address")}

                <div class="col-span-12 lg:col-span-9">
                    <!-- table -->
                    <table class="mt-3 text-gray-600 w-full text-left">
                        <thead>
                            <tr>
                                <th class="pb-1 border-b-2 uppercase text-sm">Stt</th>
                                <th class="pb-1 border-b-2 uppercase text-sm">Họ tên</th>
                                <th class="pb-1 border-b-2 uppercase text-sm">Số điện thoại</th>
                                <th class="pb-1 border-b-2 uppercase text-sm">Địa chỉ</th>
                                <th class="pb-1 border-b-2 uppercase text-sm text-right">Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${htmlTable}
                        </tbody>
                    </table>
                    <!-- end table -->

                    <!-- pagination -->
                    <ul class="flex justify-center mt-5">
                        ${currentPage > 1 ? `
                        <li>
                            <a href="/#/my-account/address/page/${currentPage - 1}" class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold border-gray-500 text-gray-500 mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white">
                                <button>
                                    <i class="fas fa-angle-left"></i>
                                </button>
                            </a>
                        </li>
                        ` : ""}
                        ${htmlPagination}
                        
                        ${currentPage <= totalPage - 1 ? `
                        <li>
                            <a href="/#/my-account/address/page/${+currentPage + 1}" class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold border-gray-500 text-gray-500 mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white">
                                <button>
                                    <i class="fas fa-angle-right"></i>
                                </button>
                            </a>
                        </li>
                        ` : ""}
                    </ul>
                </div>
            </section>
        </main>
        <!-- end content -->

        ${Footer.render()}
        `;
    },
    afterRender() {
        Header.afterRender();
        Footer.afterRender();
        MyAccNav.afterRender();

        const btnsDelete = document.querySelectorAll(".btn-remove");

        // xóa
        btnsDelete.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const { id } = e.target.dataset;

                Swal.fire({
                    title: "Bạn có chắc chắn muốn xóa không?",
                    text: "Bạn không thể hoàn tác sau khi xóa!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(id)
                            .then(() => {
                                Swal.fire(
                                    "Thành công",
                                    "Đã xóa danh mục.",
                                    "success",
                                );
                            })
                            .then(() => {
                                reRender(MyAccAddressPage, "#app");
                            });
                    }
                });
            });
        });
    },
};

export default MyAccAddressPage;