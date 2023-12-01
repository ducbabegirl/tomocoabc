import instance from "./config";

const TABLE_NAME = "comments";
const TABLE_NAME_ORDER = "orders";
const TABLE_NAME_ORDERDETAIL = "orderDetails";


export const get = (productId, page, limit = 0) => {
    let url = `/${TABLE_NAME}/?productId=${productId}&_expand=user&_sort=id&_order=desc`;
    if (limit) url += `&_page=${page}&_limit=${limit}`;
    return instance.get(url);
};
export const add = (comment) => {
    const url = `/${TABLE_NAME}`;
    return instance.post(url, comment);
};
export const remove = (id) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.delete(url);
};




// export const checkComment = (idUser,idProduct) => {
//     // const url = `/${TABLE_NAME}/?productId=${idProduct}&userId=${idUser}`;
//     // // const res = instance.get(url);
//     // // if(res != null){
//     // //     return true;
//     // // }
//     const urlOrder = `/${TABLE_NAME_ORDER}/?_embed=orderDetails&userId=${idUser}`;
//     return instance.get(urlOrder);
// };



export const checkOrderDetailByIdProduct = (idProduct) => {
    const urlOrderDetail = `/${TABLE_NAME_ORDERDETAIL}/?productId=${idProduct}`;
    return instance.get(urlOrderDetail);    
};


export const checkOrderByIdOrderAndStatus = (idOrder,idUser) => {
    const urlOrderDetail = `/${TABLE_NAME_ORDER}/?id=${idOrder}&userId=${idUser}&status=3&sort=id,desc`;
    return instance.get(urlOrderDetail);    
};


export const handleCheckComment = (idProduct,idUser) => {
    const urlOrderDetail = `/${TABLE_NAME}/?userId=${idUser}&productId=${idProduct}`;
    return instance.get(urlOrderDetail);    
};