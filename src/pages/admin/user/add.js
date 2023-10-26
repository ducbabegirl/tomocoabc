import toastr from "toastr";
import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import validate from "jquery-validation";
import { getAllProvince, getDistrict, getWard } from "../../../api/location";
import { add } from "../../../api/user";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { reRender, uploadFile } from "../../../utils";

const AdminAddUserPage = {
    getTitle() {
        return "Add User | Administrator";
    },
    async render() {
        const { data: listProvince } = await getAllProvince();