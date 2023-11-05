import toastr from "toastr";
import { add as addComment, get } from "../../../api/comment";
import { checkUserRating, add as addRating, update as updateRating } from "../../../api/rating";
import { getUser, reRender } from "../../../utils";
import { get as getProduct } from "../../../api/product";
// eslint-disable-next-line import/no-cycle
import ProductDetailPage from "../../../pages/user/productDetails";

const FormComment = {
    async render(productId) {
        const { data: productData } = await getProduct(productId);
        const { data: listComment } = await get(productId);

        return /* html */`
        <div>
            <h2 class="mt-3 font-semibold text-xl">Đánh giá</h2>
            ${!listComment.length ? `<p>Chưa có đánh giá nào</p>` : ``}

            <form action="" class="px-3 py-2 border-2 border-[#D9A953] mt-3" id="form__comment">
                <h2 class="font-semibold text-xl">
                    ${!listComment.length ? `Hãy là người đầu tiên nhận xét "${productData.name}"` : `Nhận xét về "${productData.name}"`}
                </h2>

                <div class="mt-2">
                    <label for="" class="block text-sm font-semibold">Đánh giá của bạn *</label>
                    <div class="stars">
                        <input type="radio" hidden class="form__comment-star-number" name="star" id="star-5" value="5">
                        <label for="star-5" title="5 sao" class="star__item">
                            <i class="fas fa-star"></i>
                        </label>
                        <input type="radio" hidden class="form__comment-star-number" name="star" id="star-4" value="4">
                        <label for="star-4" title="4 sao" class="star__item">
                            <i class="fas fa-star"></i>
                        </label>
                        <input type="radio" hidden class="form__comment-star-number" name="star" id="star-3" value="3">
                        <label for="star-3" title="3 sao" class="star__item">
                            <i class="fas fa-star"></i>
                        </label>
                        <input type="radio" hidden class="form__comment-star-number" name="star" id="star-2" value="2">
                        <label for="star-2" title="2 sao" class="star__item">
                            <i class="fas fa-star"></i>
                        </label>
                        <input type="radio" hidden class="form__comment-star-number" name="star" id="star-1" value="1">
                        <label for="star-1" title="1 sao" class="star__item">
                            <i class="fas fa-star"></i>
                        </label>
                    </div>
                </div>

                <div class="mt-2">
                    <label for="form__comment-content" class="block text-sm font-semibold">Nhận xét của bạn</label>
                    <textarea name="form__comment-content" id="form__comment-content" cols="30" rows="10" class="w-full outline-none border mt-1 px-3 py-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc]" placeholder="Nhập nội dung bình luận"></textarea>
                </div>

                <button class="my-3 px-4 py-2 bg-[#D9A953] font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">Gửi đi</button>
            </form>
        </div>
        `;
    },
    afterRender(productId) {
        // get info current user
        const userLogged = getUser();

        if (userLogged) {
            // comment, rating
            const formComment = document.querySelector("#form__comment");
            const commentContent = formComment.querySelector("#form__comment-content");
            formComment.addEventListener("submit", async (e) => {
                e.preventDefault();

                const starNumber = formComment.querySelector(".form__comment-star-number:checked");
                if (!starNumber) {
                    toastr.info("Vui lòng chọn mức đánh giá");
                } else if (!commentContent.value) {
                    toastr.info("Vui lòng nhập nội dung bình luận");
                } else {
                    // kiểm tra user đã từng rating chưa
                    const { data: ratingData } = await checkUserRating(userLogged.id, productId);

                    if (ratingData.length) {
                        await updateRating(ratingData[0].id, {
                            ratingNumber: +starNumber.value,
                        });
                    } else {
                        await addRating({
                            userId: userLogged.id,
                            productId,
                            ratingNumber: +starNumber.value,
                            createdAt: new Date().toISOString(),
                        });
                    }

                    // insert comment
                    addComment({
                        userId: userLogged.id,
                        content: commentContent.value,
                        productId,
                        createdAt: new Date().toISOString(),
                    })
                        .then(() => formComment.reset())
                        .then(() => reRender(ProductDetailPage, "#app", productId))
                        .then(() => toastr.success("Gửi bình luận thành công"));
                }
            });
        }
    },
};

export default FormComment;