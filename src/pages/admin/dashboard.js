import HeaderTop from "../../components/admin/headerTop";
import AdminNav from "../../components/admin/nav";
import { getAll as getAllPost } from "../../api/news";
import { getAll as getAllUser } from "../../api/user";
import { getAll as getAllProduct } from "../../api/product";
import { getAll as getAllOrder } from "../../api/order";
import { formatCurrency } from "../../utils";
import { statistical_news, statistical_account, statistical_product, statistical_order, annual_revenue_statistics } from "../../api/dashboard"
const DashboardPage = {
    getTitle() {
        return "Dashboard | Administrator";
    },
    async render() {
        const { data: posts } = await statistical_news();
        const { data: users } = await statistical_account();
        const { data: products } = await statistical_product();

        // thống kê doanh thu
        const { data: orderList } = await statistical_order();
        const orderSuccess = orderList.filter((order) => order.status === 3);
        // eslint-disable-next-line max-len
        const totalPrice = orderSuccess.reduce((total, order) => total + (order.total_price - order.price_decrease), 0);


        return /* html */ `
        
        <section class="min-h-screen bg-gray-50 dashboard">
            ${AdminNav.render("dashboard")}

            <div class="ml-0 transition md:ml-60">
                <header>
                    ${HeaderTop.render()}

                    <div class="px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
                        <div class="flex items-center text-sm text-gray-600">
                            <h5>Dashboard</h5>
                        </div>

                        <button type="button" class="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Dashboard
                        </button>
                    </div>
                </header>
                <div class="p-6">
                <section>
                <form id="dateFilterForm" class="mt-4">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label for="startDate" class="block text-sm font-medium text-gray-600">Từ ngày</label>
                        <input type="date" id="startDate" name="startDate" class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                    </div>
                    <div>
                        <label for="endDate" class="block text-sm font-medium text-gray-600">Đến ngày</label>
                        <input type="date" id="endDate" name="endDate" class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                    </div>
                    <div style="margin:25px;">
                        <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-blue-300">Lọc</button>
                    </div>
                </div>
            </form>
                </section>
                    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div class="flex bg-white">
                            <div class="bg-red-500 flex items-center px-3 text-white rounded-l-md">BV</div>
                            <div class="rounded-r-md flex shadow-sm items-center flex-1 justify-between px-3 py-2 leading-snug border-y border-r">
                                <div>
                                    <span class="block font-semibold">Bài viết</span>
                                    <span  id="postCount" class="block text-gray-500">${posts.length} Posts</span>
                                </div>
                                <div class="text-gray-500">
                                    <i class="fas fa-ellipsis-v"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex bg-white">
                            <div class="bg-indigo-500 flex items-center px-3 text-white rounded-l-md">TK</div>
                            <div class="rounded-r-md flex shadow-sm items-center flex-1 justify-between px-3 py-2 leading-snug border-y border-r">
                                <div>
                                    <span class="block font-semibold">Tài khoản</span>
                                    <span id="userCount" class="block text-gray-500">${users.length} Members</span>
                                </div>
                                <div class="text-gray-500">
                                    <i class="fas fa-ellipsis-v"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex bg-white">
                            <div class="bg-yellow-500 flex items-center px-3 text-white rounded-l-md">SP</div>
                            <div class="rounded-r-md flex shadow-sm items-center flex-1 justify-between px-3 py-2 leading-snug border-y border-r">
                                <div>
                                    <span class="block font-semibold">Sản phẩm</span>
                                    <span id="productCount" class="block text-gray-500">${products.length} Sản phẩm</span>
                                </div>
                                <div class="text-gray-500">
                                    <i class="fas fa-ellipsis-v"></i>
                                </div>
                            </div>
                        </div>
                        <div id="thongkedoanhthu" class="flex bg-white">
                            <div class="bg-green-500 flex items-center px-3 text-white rounded-l-md">DT</div>
                            <div class="rounded-r-md flex shadow-sm items-center flex-1 justify-between px-3 py-2 leading-snug border-y border-r">
                                <div>
                                    <span class="block font-semibold">Doanh thu</span>
                                    <span id="totalPrice" class="block text-gray-500">${formatCurrency(totalPrice)}</span>
                                </div>
                                <div class="text-gray-500">
                                    <i class="fas fa-ellipsis-v"></i>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            
            <section id="bieuDoDoanhThu" style="display:none">
                <canvas style="padding-bottom:280px" id="myChart" ></canvas>
            </section>
            
            <div class="fixed inset-0 z-10 w-screen h-screen bg-black bg-opacity-25 hidden dashboard__overlay">
                
            </div>

            
        </section>

        <section>
        
        </section>
        `;
    },
    afterRender() {
        HeaderTop.afterRender();
        AdminNav.afterRender();

        const totalPriceElement = document.getElementById('thongkedoanhthu');
        const chartSection = document.getElementById('bieuDoDoanhThu');

        totalPriceElement.addEventListener('click', (event) => {
            event.preventDefault();
            chartSection.style.display = 'block'
        });

        const form = document.getElementById('dateFilterForm');
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const startDateString = document.getElementById('startDate').value;
            const endDateString = document.getElementById('endDate').value;

            const startDate = new Date(startDateString);
            const endDate = new Date(endDateString);

            const { data: posts } = await statistical_news(startDate, endDate);
            const { data: users } = await statistical_account(startDate, endDate);
            const { data: products } = await statistical_product(startDate, endDate);
            const { data: orderList } = await statistical_order(startDate, endDate);
            const orderSuccess = orderList.filter((order) => order.status === 3);
            const totalPrice = orderSuccess.reduce((total, order) => total + (order.total_price - order.price_decrease), 0);

            document.getElementById('productCount').textContent = `${products.length} Sản phẩm`;
            document.getElementById('userCount').textContent = `${users.length} Members`;
            document.getElementById('postCount').textContent = `${posts.length} Posts`;
            document.getElementById('totalPrice').textContent = `${formatCurrency(totalPrice)}`;

            console.log(`${products.length}`, `${users.length}`, `${posts.length}`);
        });


        function calculateMonthlyRevenue(data) {
            const monthlyRevenue = Array.from({ length: 12 }).fill(0);

            data.forEach(item => {
                if (item.status === 3) {
                    const createdAt = new Date(item.createdAt);
                    const month = createdAt.getMonth();
                    monthlyRevenue[month] += item.total_price;
                }
            });

            return monthlyRevenue;
        }

        // Hàm vẽ biểu đồ
        function drawChart(monthlyRevenueArray) {
            let myChart = document.getElementById('myChart').getContext('2d');

            Chart.defaults.global.defaultFontFamily = 'Lato';
            Chart.defaults.global.defaultFontSize = 18;
            Chart.defaults.global.defaultFontColor = '#777';

            let massPopChart = new Chart(myChart, {
                type: 'bar',
                data: {
                    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
                    datasets: [{
                        label: 'Doanh Thu',
                        data: monthlyRevenueArray,
                        backgroundColor: [
                            'rgba(255, 87, 51, 0.6)',
                            'rgba(52, 152, 219, 0.6)',
                            'rgba(243, 156, 18, 0.6)',
                            'rgba(26, 188, 156, 0.6)',
                            'rgba(142, 68, 173, 0.6)',
                            'rgba(231, 76, 60, 0.6)',
                            'rgba(46, 204, 113, 0.6)',
                            'rgba(243, 156, 18, 0.6)',
                            'rgba(22, 160, 133, 0.6)',
                            'rgba(192, 57, 43, 0.6)',
                            'rgba(243, 156, 18, 0.6)',
                            'rgba(52, 152, 219, 0.6)',
                        ],
                        borderWidth: 1,
                        borderColor: '#777',
                        hoverBorderWidth: 3,
                        hoverBorderColor: '#000'
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Thống Kê Doanh Thu Trong Năm Qua',
                        fontSize: 25
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontColor: '#000'
                        }
                    },
                    layout: {
                        padding: {
                            left: 300,
                            right: 0,
                            bottom: 0,
                            top: 0
                        },
                    },
                    tooltips: {
                        enabled: true
                    }
                }
            });
        }

        // Hàm xử lý thống kê
        async function handleThongKe() {
            const { data: revenueData } = await annual_revenue_statistics();
            const monthlyRevenueArray = calculateMonthlyRevenue(revenueData);
            drawChart(monthlyRevenueArray);
        }

        handleThongKe();
    },
};

export default DashboardPage;



