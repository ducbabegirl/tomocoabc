import $ from "jquery";
import Swal from "sweetalert2";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { remove, getAll, search } from "../../../api/voucher";
import { formatDate, reRender } from "../../../utils";
import AdminVoucherList from "../../../components/admin/voucherList";
import Pagination from "../../../components/admin/pagination";

const AdminVoucherListPage = {
    getTitle() {
        return "Voucher List | Administrator";
    },
    async render(pageNumber) {
        const { data } = await getAll();
        const total = data.length; // tổng số
        const limit = 10;
        const currentPage = pageNumber ?? 1; // lấy số trang hiện tại

        // ds theo limit
        const { data: voucherList } = await getAll(currentPage, limit);
