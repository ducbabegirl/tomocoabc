import toastr from "toastr";
import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import validate from "jquery-validation";
import AdminCateNewsListPage from ".";
import { get, update } from "../../../api/cateNews";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { reRender } from "../../../utils";

const AdminEditCateNewsPage = {
    getTitle() {
        return "Update Category News | Administrator";
    },
    async render(id) {
        const { data: cateDetail } = await get(id);