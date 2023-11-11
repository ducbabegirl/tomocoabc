import qs from 'qs';
import CryptoJS from "crypto-js"

const bankingFunctions = {
    handleBanking(totalMoney,idOrder) {
        let vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        const vnp_Returnurl = "http://localhost:3000/#/cart-thanks";
        const vnp_TmnCode = ""; // Mã website tại VNPAY
        const vnp_HashSecret = ""; // Chuỗi bí mật

        const vnp_TxnRef = Math.floor(Math.random() * 1000);
        const vnp_OrderInfo = "Bố Minh Chuyển Khoản";
        const vnp_OrderType = 'billpayment';
        const vnp_Amount = totalMoney * 100;
        const vnp_Locale = 'vn';
        const vnp_BankCode = '';
        const vnp_IpAddr = "127.0.0.1"; // Điều chỉnh IP này tùy theo cách bạn lấy địa chỉ IP trong Node.js

        let date = new Date();
        let createDate = this.formatDate(date);
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = vnp_TmnCode;
        vnp_Params['vnp_Locale'] = vnp_Locale;
        vnp_Params['vnp_CurrCode'] = "VND";
        vnp_Params['vnp_TxnRef'] = vnp_TxnRef;
        vnp_Params['vnp_OrderInfo'] = idOrder.toString();
        vnp_Params['vnp_OrderType'] = vnp_OrderType;
        vnp_Params['vnp_Amount'] = vnp_Amount;
        vnp_Params['vnp_ReturnUrl'] = vnp_Returnurl;
        vnp_Params['vnp_IpAddr'] = vnp_IpAddr;
        vnp_Params['vnp_CreateDate'] = createDate;



        if (vnp_BankCode !== null && vnp_BankCode !== '') {
            vnp_Params['vnp_BankCode'] = vnp_BankCode;
        }

        vnp_Params = this.sortObject(vnp_Params);

        let signData = qs.stringify(vnp_Params, { encode: false });
        
        const hmac = CryptoJS.HmacSHA512(signData, vnp_HashSecret);
        const signed = CryptoJS.enc.Hex.stringify(hmac);
        vnp_Params['vnp_SecureHash'] = signed;
        vnp_Url += '?' + qs.stringify(vnp_Params, { encode: false });
        return vnp_Url ;
    },

    mainBanking(totalMoney, idOrder) {
        return this.handleBanking(totalMoney, idOrder);
    },

    formatDate(date) {
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return year + month + day + hours + minutes + seconds;
    },

    sortObject(obj) {
        let sorted = {};
        let str = [];
        let key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    }
};

export default bankingFunctions;
