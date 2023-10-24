import { getRelated } from "../../../api/news";

const Related = {
    async render(id, cateId) {
        const { data: newsRelated } = await getRelated(id, cateId, 0, 4);
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        };

        return `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            ${newsRelated.map((item) => /* html */`
                <div>
                    <a href="/#/news/${item.id}" style="background-image: url(${item.thumbnail});" class="block bg-cover bg-center pt-[70%] rounded-t-xl relative">
                        <button class="absolute top-2 left-2 bg-[#D9A953] rounded-full w-10 h-10 text-white text-lg">
                            <i class="fas fa-newspaper"></i>
                        </button>
                    </a>
                    <div class="bg-white rounded-b-xl shadow px-3 py-2">
                        <p class="text-sm text-gray-500">${formatDate(item.createdAt)}</p>
                        <h3>
                            <a href="/#/news/${item.id}" class="limit-line-2 block py-1 font-semibold text-justify leading-tight transition duration-300 text-gray-600 hover:text-black">${item.title}</a>
                        </h3>
                        <div class="limit-line-3 text-gray-500 text-sm text-justify">${item.description}</div>
                    </div>
                </div>
                `).join("")}
        </div>
        `;
    },
};

export default Related;