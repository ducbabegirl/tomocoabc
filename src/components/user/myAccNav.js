import { getUser, logout } from "../../utils";

const MyAccNav = {
    render(pageName) {
        const userInfo = getUser();

        return /* html */ `
        <aside class="hidden lg:block lg:col-span-3 border-r">
            <header class="flex items-center">
                <img src="${userInfo.avatar}" class="w-20 h-20 object-cover rounded-full" alt="">

                <div class="pl-3 text-gray-400 font-semibold leading-5">
                    <span class="block text-gray-600">${userInfo.fullName}</span>
                    <span>${userInfo.username}</span>
                </div>
            </header>

            <ul class="mt-2 grid grid-cols-1 divide-y">
                <li>
                    <a href="/#/my-account" class="${pageName === "update-info" ? "text-black after:opacity-100" : ""} py-2 uppercase font-semibold text-sm text-gray-400 block transition ease-linear duration-200 hover:text-gray-700 relative hover:after:opacity-100 after:transition after:opacity-0 after:content-[''] after:absolute after:right-0 after:w-[3px] after:h-full after:bg-blue-500 after:top-1/2 after:-translate-y-1/2">Thông tin tài khoản</a>
                </li>
                <li>
                    <a href="/#/my-account/update-pass" class="${pageName === "update-pass" ? "text-black after:opacity-100" : ""} py-2 uppercase font-semibold text-sm text-gray-400 block transition ease-linear duration-200 hover:text-gray-700 relative hover:after:opacity-100 after:transition after:opacity-0 after:content-[''] after:absolute after:right-0 after:w-[3px] after:h-full after:bg-blue-500 after:top-1/2 after:-translate-y-1/2">Đổi mật khẩu</a>
                </li>
                <li>
                    <a href="/#/my-account/cart" class="${pageName === "cart" ? "text-black after:opacity-100" : ""} py-2 uppercase font-semibold text-sm text-gray-400 block transition ease-linear duration-200 hover:text-gray-700 relative hover:after:opacity-100 after:transition after:opacity-0 after:content-[''] after:absolute after:right-0 after:w-[3px] after:h-full after:bg-blue-500 after:top-1/2 after:-translate-y-1/2">Đơn hàng</a>
                </li>
                <li>
                    <a href="/#/my-account/address" class="${pageName === "address" ? "text-black after:opacity-100" : ""} py-2 uppercase font-semibold text-sm text-gray-400 block transition ease-linear duration-200 hover:text-gray-700 relative hover:after:opacity-100 after:transition after:opacity-0 after:content-[''] after:absolute after:right-0 after:w-[3px] after:h-full after:bg-blue-500 after:top-1/2 after:-translate-y-1/2">Thông tin thanh toán</a>
                </li>
                <li>
                    <div id="btn-logout" class="cursor-pointer py-2 uppercase font-semibold text-sm text-gray-400 block transition ease-linear duration-200 hover:text-gray-700 relative hover:after:opacity-100 after:transition after:opacity-0 after:content-[''] after:absolute after:right-0 after:w-[3px] after:h-full after:bg-blue-500 after:top-1/2 after:-translate-y-1/2">Đăng xuất</div>
                </li>
            </ul>
        </aside>
        `;
    },
    afterRender() {
        const btnLogout = document.querySelector("#btn-logout");

        btnLogout.addEventListener("click", () => logout());
    },
};

export default MyAccNav;