import toastr from "toastr";
import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import validate from "jquery-validation";
import AdminSizeListPage from ".";
import { get, update } from "../../../api/voucher";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { reRender } from "../../../utils";

const AdminEditVoucherPage = {
    getTitle() {
        return "Update Voucher | Administrator";
    },
    async render(id) {
        const { data: voucherDetail } = await get(id);