import toastr from "toastr";
import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import validate from "jquery-validation";
import { add } from "../../../api/voucher";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { reRender } from "../../../utils";

const AdminAddVoucherPage = {
    getTitle() {
        return "Add Voucher | Administrator";
    },
    render() {