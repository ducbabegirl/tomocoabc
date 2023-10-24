import { getAllShow } from "../../../api/slider";

const Banner = {
    async render() {
        const { data: bannerList } = await getAllShow();

        return /* html */ `
        <section>
            <ul id="banner" class="relative group">
                ${bannerList.map((item) => `
                    <li>
                        <a href="${item.url}" title="${item.title}" style="background-image: url(${item.image});" class="block pt-[34%] bg-center bg-cover bg-no-repeat"></a>
                    </li>
                    `).join("")}
            </ul>
        </section>
        `;
    },
};

export default Banner;