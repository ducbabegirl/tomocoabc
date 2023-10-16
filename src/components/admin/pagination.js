const Pagination = {
    render(total, limit, currentPage, url) {
        // tính tổng số trang
        const totalPage = Math.ceil(total / limit);
        let htmlPagination = "";

        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= totalPage; i++) {
            htmlPagination += `
            <a href="/#/admin/${url}/page/${i}" class="${currentPage === i ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"} relative inline-flex items-center px-4 py-2 border text-sm font-medium"> ${i} </a>
            `;
        }

        return /* html */`
        <div class="border-t px-5 bg-white py-3 flex flex-col xs:flex-row items-center xs:justify-between" id="pagination">
            <div class="flex items-center">
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">

                    ${currentPage > 1 ? /* html */`
                    <a href="/#/admin/${url}/page/${currentPage - 1}" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span class="sr-only">Previous</span>
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                    </a>
                    ` : ""}

                    ${htmlPagination}

                    ${currentPage < totalPage ? /* html */`
                    <a href="/#/admin/${url}/page/${currentPage + 1}" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span class="sr-only">Next</span>
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </a>
                    ` : ""}
                </nav>
            </div>
        </div>
        `;
    },
};

export default Pagination;