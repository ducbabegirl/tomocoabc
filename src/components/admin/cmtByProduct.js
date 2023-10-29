import Swal from "sweetalert2";
import { get, remove } from "../../api/comment";
// eslint-disable-next-line import/no-cycle
import AdminDetailCmtPage from "../../pages/admin/comments/detail";
import { formatDate, reRender } from "../../utils";

const AdminCmtByProductList = {
    async render(productId) {
        const { data: cmtList } = await get(productId);

        return /* html */`
        <thead class="bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người bình luận
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nội dung
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian bình luận
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            ${cmtList.map((item) => /* html */`
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${item.id}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                                <img class="h-10 w-10 rounded-full" src="${item.user.avatar}" alt="">
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                    ${item.user.fullName}
                                </div>
                                <div class="text-sm text-gray-500">
                                    ${item.user.email}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${item.content}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                        ${formatDate(item.createdAt)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button data-id="${item.id}" class="btn-remove h-8 inline-flex items-center px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Delete</button>
                    </td>
                </tr>
                `).join("")}
            
        </tbody>
        `;
    },
    afterRender(productId) {
        const btnsDelete = document.querySelectorAll(".btn-remove");

        // xóa danh mục
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
                                reRender(AdminDetailCmtPage, "#app", productId);
                            });
                    }
                });
            });
        });
    },
};

export default AdminCmtByProductList;