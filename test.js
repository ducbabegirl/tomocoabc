
function handleBanking(){
    
    let vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    const vnp_Returnurl = "http://localhost:8000/shop";
    const vnp_TmnCode = "C6TI6IX1"; // Mã website tại VNPAY
    const vnp_HashSecret = "LLRUPSWJEGTOOFSYLYNLKAMWMPNZCZRZ"; // Chuỗi bí mật

    const vnp_TxnRef = Math.floor(Math.random() * 1000);
    const vnp_OrderInfo = "Bố Minh Chuyển Khoản";
    const vnp_OrderType = 'billpayment';
    const vnp_Amount = 100000000 * 100;
    const vnp_Locale = 'vn';
    const vnp_BankCode = '';
    const vnp_IpAddr = "127.0.0.1"; // Điều chỉnh IP này tùy theo cách bạn lấy địa chỉ IP trong Node.js

    let date = new Date();
    let createDate = formatDate(date);

    const inputData = {
        vnp_Version: "2.1.0",
        vnp_TmnCode: vnp_TmnCode,
        vnp_Amount: vnp_Amount,
        vnp_Command: "pay",
        vnp_CreateDate: createDate,
        vnp_CurrCode: "VND",
        vnp_IpAddr: vnp_IpAddr,
        vnp_Locale: vnp_Locale,
        vnp_OrderInfo: vnp_OrderInfo,
        vnp_OrderType: vnp_OrderType,
        vnp_ReturnUrl: vnp_Returnurl,
        vnp_TxnRef: vnp_TxnRef,
    };

    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = vnp_TmnCode;
    vnp_Params['vnp_Locale'] = vnp_Locale;
    vnp_Params['vnp_CurrCode'] = "VND";
    vnp_Params['vnp_TxnRef'] = vnp_TxnRef;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:';
    vnp_Params['vnp_OrderType'] = 'vnp_OrderType';
    vnp_Params['vnp_Amount'] = vnp_Amount;
    vnp_Params['vnp_ReturnUrl'] = vnp_Returnurl;
    vnp_Params['vnp_IpAddr'] = vnp_IpAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(vnp_BankCode !== null && vnp_BankCode !== ''){
        vnp_Params['vnp_BankCode'] = vnp_BankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha512", vnp_HashSecret);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnp_Url += '?' + querystring.stringify(vnp_Params, { encode: false });

    console.log(vnp_Url);
}


function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
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

function formatDate(date) {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return year + month + day + hours + minutes + seconds;
  }

