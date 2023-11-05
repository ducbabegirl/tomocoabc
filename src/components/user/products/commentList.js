/* eslint-disable no-plusplus */
import Swal from "sweetalert2";
import { get as getRating } from "../../../api/rating";
import { get as getComment, remove as removeCmt } from "../../../api/comment";

import { getUser, reRender } from "../../../utils";

const CommentList = {
    async render(productId, pageNumber) {
        // phân trang
        const currentPage = pageNumber ?? 1;
        const { data } = await getComment(productId);
        const limit = 5;
        const totalPage = Math.ceil(data.length / limit);

        // ds cmt theo limit
        const { data: dataComment } = await getComment(productId, currentPage, limit);

        const { data: dataRating } = await getRating(productId);

        const formatDate = (dateString) => {
            const date = new Date(dateString);

            return `${date.getDate()} Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
        };

        const commentJoinRating = () => {
            const result = dataComment.map((cmt) => {
                const rating = dataRating.find((item) => item.userId === cmt.userId);

                return {
                    cmtId: cmt.id,
                    ratingId: rating.id,
                    userId: cmt.userId,
                    userAvatar: cmt.user.avatar,
                    content: cmt.content,
                    createdAt: cmt.createdAt,
                    fullName: cmt.user.fullName,
                    rating: rating.ratingNumber,
                };
            });

            return result;
        };

        const listComment = commentJoinRating();

        // get info current user
        const userLogged = getUser();

        let htmlPagination = "";
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= totalPage; i++) {
            htmlPagination += `
            <li class="">
                <a href="/#/product/${productId}/page/${i}"class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white ${+currentPage === i ? "border-[#D9A953] bg-[#D9A953] text-white" : "border-gray-500 text-gray-500"}">${i}</a>
            </li>
            `;
        }

        // render star
        const renderStar = (ratingNumber) => {
            let htmlRating = "";
            for (let i = 0; i < ratingNumber; i++) {
                htmlRating += /* html */`
                <div class="text-yellow-400">
                    <i class="fas fa-star"></i>
                </div>
                `;
            }

            for (let i = 0; i < 5 - ratingNumber; i++) {
                htmlRating += /* html */`
                <div class="text-gray-300">
                    <i class="fas fa-star"></i>
                </div>
                `;
            }

            return htmlRating;
        };

        return /* html */`
        <ul class="mt-4 grid grid-cols-1 divide-y divide-dashed">
            ${listComment.map((cmt) => /* html */`
                <li class="flex py-4">
                    <img src="${cmt.userAvatar}" alt="" class="w-16 h-16 rounded-full object-cover">
                    <div class="ml-2">
                        <div class="flex text-xs mb-0.5">
                            ${renderStar(cmt.rating)}
                        </div>

                        <div>
                            <span class="font-semibold">${cmt.fullName}</span>
                            <span class="text-sm text-gray-500">(${formatDate(cmt.createdAt)})</span>
                        </div>
                        <p class="text-gray-500">${cmt.content}</p>

                        <ul class="text-gray-500 flex text-sm mt-1">
                            ${userLogged && (userLogged.role || userLogged.id === cmt.userId) ? `
                            <li data-cmt-id="${cmt.cmtId}" class="btn-remove transition hover:text-black cursor-pointer">Xóa</li>
                            ` : ""}
                        </ul>
                    </div>
                </li>
                `).join("")}
        </ul>

        <!-- pagination -->
        <ul class="flex justify-center mt-5">
            ${currentPage > 1 ? `
            <li>
                <a href="/#/product/${productId}/page/${currentPage - 1}" class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold border-gray-500 text-gray-500 mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white">
                    <button>
                        <i class="fas fa-angle-left"></i>
                    </button>
                </a>
            </li>
            ` : ""}
            ${htmlPagination}
            
            ${currentPage <= totalPage - 1 ? `
            <li>
                <a href="/#/product/${productId}/page/${+currentPage + 1}" class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold border-gray-500 text-gray-500 mx-0.5 cursor-pointer transition ease-linear duration-200 hover:bg-[#D9A953] hover:border-[#D9A953] hover:text-white">
                    <button>
                        <i class="fas fa-angle-right"></i>
                    </button>
                </a>
            </li>
            ` : ""}
        </ul>
        `;
    },
    afterRender(productId) {
        const btnsRemove = document.querySelectorAll(".btn-remove");
        btnsRemove.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const { cmtId } = e.target.dataset;

                Swal.fire({
                    title: "Bạn có chắc chắn muốn xóa không?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        removeCmt(cmtId)
                            .then(() => reRender(CommentList, "#list-comment", productId))
                            .then(() => {
                                Swal.fire(
                                    "Thành công!",
                                    "Bình luận đã bị xóa.",
                                    "success",
                                );
                            });
                    }
                });
            });
        });
    },
};

export default CommentList;