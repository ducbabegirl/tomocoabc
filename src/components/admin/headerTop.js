import { getUser, logout } from "../../utils";

const HeaderTop = {
    render() {
        const userLogin = getUser();

        return /* html */ `
        <div class="bg-white border-b h-14 px-4 flex justify-between items-center">
            <button id="btn-bars" class="md:hidden px-3 py-1 bg-gray-50 rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-600 transition ease-linear duration-200">
                <i class="fas fa-bars"></i>
            </button>

            <form class="hidden md:flex items-center border-2 border-indigo-500 rounded-full px-2.5">
                <div class="text-gray-400">
                    <i class="fas fa-search"></i>
                </div>
                <input type="text" placeholder="Search" class="px-2 py-1 outline-none rounded-full">
            </form>

            <div class="ml-4 flex items-center md:ml-6">
                <button type="button" class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span class="sr-only">View notifications</span>
                    <svg class="h-5 w-5" x-description="Heroicon name: outline/bell" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                </button>

                <!-- Profile dropdown -->
                <div class="ml-3 relative group">
                    <div>
                        <button type="button" class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" x-ref="button" @click="onButtonClick()" @keyup.space.prevent="onButtonEnter()" @keydown.enter.prevent="onButtonEnter()" aria-expanded="false" aria-haspopup="true" x-bind:aria-expanded="open.toString()" @keydown.arrow-up.prevent="onArrowUp()" @keydown.arrow-down.prevent="onArrowDown()">
                            <span class="sr-only">Open user menu</span>
                            <img class="h-8 w-8 rounded-full object-cover" src="${userLogin.avatar}" alt="">
                        </button>
                    </div>
                    
                    <div class="hidden group-hover:block absolute right-0 top-[calc(100%+10px)] w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none before:content-[''] before:absolute before:top-[-10px] before:right-0 before:left-0 before:h-4">
                        <a href="/#/admin/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                        <p id="btn-logout" class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Đăng xuất</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    },
    afterRender() {
        const btnLogout = document.querySelector("#btn-logout");
        btnLogout.addEventListener("click", () => logout());
    },
};

export default HeaderTop;