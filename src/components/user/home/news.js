import { getAllShow } from "../../../api/news";

const News = {
    async render() {
        const { data: newsList } = await getAllShow(0, 4);
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return `${date.getDate()} Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
        };
        return /* html */ `
        
        `;
    },
};

export default News;