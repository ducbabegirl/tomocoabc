import fs from 'fs';
import easyinvoice from 'easyinvoice';


// const fs = require('fs');
// const easyinvoice = require('easyinvoice');

const InvoiceFunction = {

    handleInvoice(callback) {
        const invoiceData = {
            currency: 'USD',
            taxNotation: 'vat', // or gst
            marginTop: 25,
            marginRight: 25,
            marginLeft: 25,
            marginBottom: 25,
            logo: 'path/to/your/logo.png', // optional
            background: 'path/to/your/background.png', // optional
            sender: {
                company: 'Your Company',
                address: '123 Main Street',
                zip: '12345',
                city: 'City',
                country: 'Country',
                phone: '123-456-789',
                email: 'info@yourcompany.com',
            },
            client: {
                company: 'Client Company',
                address: '456 Client Street',
                zip: '54321',
                city: 'Client City',
                country: 'Client Country',
                phone: '987-654-321',
                email: 'client@example.com',
            },
            invoiceNumber: 'INV001',
            invoiceDate: '2023-11-29',
            products: [
                {
                    quantity: 2,
                    description: 'Item 1',
                    tax: 10, // in percentage
                    price: 10,
                },
                {
                    quantity: 3,
                    description: 'Item 2',
                    tax: 15, // in percentage
                    price: 15,
                },
            ],
            bottomNotice: 'Thank you for your business!',
        };

        easyinvoice.createInvoice(invoiceData, (result) => {
            const pdfBase64 = result.pdf;
            callback(pdfBase64);
        });
    }
}
export default InvoiceFunction;
