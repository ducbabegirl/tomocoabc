import toastr from "toastr";
import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import validate from "jquery-validation";
import AdminUserListPage from ".";
import { getAllProvince, getDistrict, getWard } from "../../../api/location";
import { update, get } from "../../../api/user";
import HeaderTop from "../../../components/admin/headerTop";
import AdminNav from "../../../components/admin/nav";
import { reRender, uploadFile } from "../../../utils";

const AdminEditUserPage = {
    getTitle() {
        return "Update Voucher | Administrator";
    },
    async render(id) {
        const { data: userDetail } = await get(id);
        const { data: listProvince } = await getAllProvince();

        let listDistrict;
        let listWard;
        if (userDetail.provinceCode) {
            listDistrict = await getDistrict(userDetail.provinceCode);
            listWard = await getWard(userDetail.districtCode);
        }