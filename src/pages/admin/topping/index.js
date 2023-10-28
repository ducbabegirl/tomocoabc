import Swal from "sweetalert2";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { getAll, remove } from "../../../api/topping";
import { reRender } from "../../../utils";
import AdminToppingList from "../../../components/admin/toppingList";
import Pagination from "../../../components/admin/pagination";

const AdminToppingListPage = {
    getTitle() {
        return "Topping List | Administrator";
    },
    async render(pageNumber) {
        const { data } = await getAll();
        const total = data.length; // tổng số
        const limit = 10;
        const currentPage = pageNumber ?? 1; // lấy số trang hiện tại

        // ds theo limit
        const { data: toppingList } = await getAll(currentPage, limit);