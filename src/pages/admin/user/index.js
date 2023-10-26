import Swal from "sweetalert2";
import $ from "jquery";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { getAll, remove, search } from "../../../api/user";
import { formatDate, reRender } from "../../../utils";
import AdminUserList from "../../../components/admin/userList";
import Pagination from "../../../components/admin/pagination";

const AdminUserListPage = {
    getTitle() {
        return "User List | Administrator";
    },
    async render(pageNumber) {
        const { data } = await getAll();
        const total = data.length; // tổng số user
        const limit = 10;
        const currentPage = pageNumber ?? 1; // lấy số trang hiện tại

        // ds user theo limit
        const { data: userList } = await getAll(currentPage, limit);
