const NotFoundPage = {
    getTitle() {
        return "Trang này không tồn tại";
    },
    render() {
        return `
        <div class="fixed top-0 right-0 bottom-0 left-0 z-10 bg-white flex items-center justify-center flex-col">
            <div class="flex">
                <p class="text-indigo-500 font-bold text-7xl border-r pr-4">404</p>
                <div class="pl-4">
                    <p class="text-5xl font-extrabold">Page not found</p>
                    <p class="text-gray-500 mt-3 text-lg">Please check the URL in the address bar and try again.</p>
                </div>
            </div>

            <ul class="flex mt-6">
                <li class="">
                    <a href="/#/" class="block transition duration-300 ease-linear hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.3)] px-4 text-white py-2 bg-indigo-500 rounded-md mx-2">
                        <button class="font-medium">Go back home</button>
                    </a>
                </li>
                <li class="">
                    <a href="" class="block transition duration-300 ease-linear hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] px-4 text-indigo-500 py-2 bg-indigo-100 rounded-md mx-2">
                        <button class="font-medium">Contact support</button>
                    </a>
                </li>
            </ul>
        </div>
        `;
    },
};

export default NotFoundPage;