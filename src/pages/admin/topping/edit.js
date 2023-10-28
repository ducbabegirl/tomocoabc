import toastr from "toastr";
import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import validate from "jquery-validation";
import AdminToppingListPage from ".";
import { get, update } from "../../../api/topping";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { reRender } from "../../../utils";

const AdminEditToppingPage = {
    getTitle() {
        return "Update Topping | Administrator";
    },
    async render(id) {
        const { data: toppingDetail } = await get(id);
