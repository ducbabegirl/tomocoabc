import { formatDate } from "../../utils";

const AdminUserList = {
    async render(userList) {
        return /* html */`
        <thead class="bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vai trò
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200" id="user__list">
        ${userList.map((user) => /* html */`
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${user.id}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <img class="h-10 w-10 rounded-full object-cover" src="${user.avatar}" alt="">
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${user.fullName}</div>
                            <div class="text-sm text-gray-500">${user.email}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${user.role ? "Admin" : "Khách hàng"}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}">
                    ${user.active ? "Kích hoạt" : "Khóa"}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                    ${formatDate(user.createdAt)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="/#/admin/user/${user.id}/edit" class="h-8 inline-flex items-center px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit</a>
                    <button data-id="${user.id}" class="user__list-btn-delete h-8 inline-flex items-center px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3">Delete</button>
                </td>
            </tr>
            `).join("")}
        
    </tbody>
    `;
},
};

export default AdminUserList;