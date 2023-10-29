import { formatDate } from "../../utils";

const AdminVoucherList = {
    async render(voucherList) {
        return /* html */`
        <thead class="bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã Voucher
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số lượng
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giảm theo
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian hiệu lực
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian hết hiệu lực
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200" id="voucher__list">
        ${voucherList.map((voucher) => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${voucher.id}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${voucher.code}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${voucher.quantity}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    -${voucher.condition ? `${voucher.conditionNumber} VNĐ` : `${voucher.conditionNumber}%`}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                    ${formatDate(voucher.timeStart)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                    ${formatDate(voucher.timeEnd)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${voucher.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}">
                    ${voucher.status ? "Kích hoạt" : "Khóa"}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="/#/admin/voucher/${voucher.id}/edit" class="h-8 inline-flex items-center px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit</a>
                    <button data-id="${voucher.id}" class="voucher__list-btn-delete h-8 inline-flex items-center px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3">Delete</button>
                </td>
            </tr>
            `).join("")}
        
    </tbody>
    `;
},
};

export default AdminVoucherList;