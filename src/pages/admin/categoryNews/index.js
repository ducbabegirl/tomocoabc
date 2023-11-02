import Swal from "sweetalert2";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { getAll, remove } from "../../../api/cateNews";
import { reRender } from "../../../utils";
import AdminCategoryNewsList from "../../../components/admin/categoryNewsList";
import Pagination from "../../../components/admin/pagination";
const AdminCateNewsListPage = {
    getTitle() {
        return "Category News | Administrator";
    },
    async render(pageNumber) {
        const { data } = await getAll();
        const total = data.length; // tổng số
        const limit = 10;
        const currentPage = pageNumber ?? 1; // lấy số trang hiện tại

        // ds theo limit
        const { data: cateList } = await getAll(currentPage, limit);