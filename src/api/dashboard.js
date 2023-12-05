import instance from "./config";

const table_order = "orders";
const table_pro = "products";
const table_news = "news";
const table_account = "users";

export const statistical_news = (startDate, endDate) => {
    let url = `/${table_news}/`;
    if (!startDate || !endDate) {
        const defaultStartDate = new Date();
        defaultStartDate.setMonth(defaultStartDate.getMonth() - 1); 
        const defaultEndDate = new Date();
        startDate = startDate || defaultStartDate;
        endDate = endDate || defaultEndDate;
    }

    url += `?createdAt_gte=${startDate.toISOString()}&createdAt_lte=${endDate.toISOString()}`;

    return instance.get(url);
};


export const statistical_account = (startDate, endDate) => {
    let url = `/${table_account}/`;
    if (!startDate || !endDate) {
        const defaultStartDate = new Date();
        defaultStartDate.setMonth(defaultStartDate.getMonth() - 1); 
        const defaultEndDate = new Date();
        startDate = startDate || defaultStartDate;
        endDate = endDate || defaultEndDate;
    }

    url += `?createdAt_gte=${startDate.toISOString()}&createdAt_lte=${endDate.toISOString()}`;
    return instance.get(url);
};


export const statistical_product = (startDate, endDate) => {
    let url = `/${table_pro}/`;
    if (!startDate || !endDate) {
        const defaultStartDate = new Date();
        defaultStartDate.setMonth(defaultStartDate.getMonth() - 1); 
        const defaultEndDate = new Date();
        startDate = startDate || defaultStartDate;
        endDate = endDate || defaultEndDate;
    }

    url += `?createdAt_gte=${startDate.toISOString()}&createdAt_lte=${endDate.toISOString()}`;

    return instance.get(url);
};



export const statistical_order = (startDate, endDate) => {
    let url = `/${table_order}/`;
    if (!startDate || !endDate) {
        const defaultStartDate = new Date();
        defaultStartDate.setMonth(defaultStartDate.getMonth() - 1); 
        const defaultEndDate = new Date();
        startDate = startDate || defaultStartDate;
        endDate = endDate || defaultEndDate;
    }

    url += `?createdAt_gte=${startDate.toISOString()}&createdAt_lte=${endDate.toISOString()}`;

    return instance.get(url);
};



export const annual_revenue_statistics = () => {
    let url = `/${table_order}/`;

    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(`${currentYear}-01-01T00:00:00.000Z`);
    const endOfYear = new Date(`${currentYear}-12-31T23:59:59.999Z`);

    url += `?createdAt_gte=${startOfYear.toISOString()}&createdAt_lte=${endOfYear.toISOString()}`;

    return instance.get(url);
};