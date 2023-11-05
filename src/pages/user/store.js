import Footer from "../../components/user/footer";
import Header from "../../components/user/header";
import { get, getAll, search } from "../../api/store";

const StorePage = {
    getTitle() {
        return "Hệ thống cửa hàng - Trà Sữa Yotea";
    },
    async render() {
        const { data: storeList } = await getAll();

        return /* html */ `
        ${await Header.render("store")}

        <!-- content -->
        <main>
            <section class="container max-w-6xl mx-auto px-3 mb-8">
                <h1 class="text-2xl font-semibold text-center text-[#D9A953] my-5 uppercase">Cửa hàng Yotea</h1>

                <div class="grid grid-cols-12 gap-8">
                    <div class="col-span-12 md:col-span-5">
                        <p>Vui lòng chọn khu vực bạn muốn tìm kiếm, chúng tôi sẽ hiển thị danh sách các cửa hàng phù hợp nhất</p>

                        <form action="" class="flex mt-3" id="form-search-store">
                            <input type="text" placeholder="Nhập tên chi nhánh" id="store__form-search-control" class="h-12 rounded-l-full px-5 border flex-1 outline-none">
                            <button type="button" class="bg-[#D9A953] px-5 text-white font-extrabold text-2xl rounded-r-full">
                                <i class="fas fa-chevron-down"></i>
                            </button>
                        </form>

                        <ul class="mt-3 border-r h-[400px] overflow-y-scroll" id="store__list">
                            ${storeList.map((store, index) => /* html */`
                                <li data-id="${store.id}" class="store__list-item ${index === 0 ? "active" : ""} flex py-4 transition ease-linear duration-300 hover:bg-gray-50 cursor-pointer px-3 items-center">
                                    <img class="w-36 h-24 object-cover" src="${store.image}" alt="">

                                    <div class="ml-3 leading-6 flex-1">
                                        <h2 class="font-semibold text-[#D9A953] text-lg">${store.name}</h2>
                                        <p>${store.address}</p>
                                        <p>${store.timeStart} - ${store.timeEnd}</p>
                                        <p>${store.phone}</p>
                                    </div>
                                </li>
                                `).join("")}
                        </ul>
                    </div>
                    <div class="col-span-12 md:col-span-7 min-h-[450px] store__list-map">
                        ${storeList[0].map}
                    </div>
                </div>
            </section>
        </main>
        <!-- end content -->

        ${Footer.render()}
        `;
    },
    afterRender() {
        Header.afterRender();
        Footer.afterRender();

        const formSearchControl = document.querySelector("#store__form-search-control");

        // đổi google map khi chọn chi nhánh
        const tabMap = () => {
            const storeList = document.querySelectorAll(".store__list-item");
            storeList.forEach((store) => {
                const { id } = store.dataset;

                store.addEventListener("click", async () => {
                    const { data: storeData } = await get(id);
                    document.querySelector(".store__list-map").innerHTML = storeData.map;

                    document.querySelector(".store__list-item.active").classList.remove("active");
                    store.classList.add("active");
                });
            });
        };
        tabMap();

        // search
        formSearchControl.addEventListener("input", async (e) => {
            const keyword = e.target.value;
            const { data } = await search(keyword);
            const html = data.map((store, index) => `
                <li data-id="${store.id}" class="store__list-item ${index === 0 ? "active" : ""} flex py-4 transition ease-linear duration-300 hover:bg-gray-50 cursor-pointer px-3 items-center">
                    <img class="w-36 h-24 object-cover" src="${store.image}" alt="">

                    <div class="ml-3 leading-6 flex-1">
                        <h2 class="font-semibold text-[#D9A953] text-lg">${store.name}</h2>
                        <p>${store.address}</p>
                        <p>${store.timeStart} - ${store.timeEnd}</p>
                        <p>${store.phone}</p>
                    </div>
                </li>
                `).join("");

            document.querySelector("#store__list").innerHTML = html;

            tabMap();
        });

        const formSearch = document.querySelector("#form-search-store");
        formSearch.addEventListener("submit", (e) => e.preventDefault());
    },

};

export default StorePage;