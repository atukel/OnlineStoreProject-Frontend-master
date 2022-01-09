import axios from 'axios';
import authHeader from './auth-header';

const GET_REVIEWS_OF_PRODUCT = "http://localhost:8080/api/test/returnReviewByProductId/";
const SUBMIT_REVIEW = "http://localhost:8080/api/test/createReview/";
const GET_PENDING_REVIEWS = "http://localhost:8080/api/test/returnAllPendingReviews";
const CHANGE_REVIEW_STATUS = "http://localhost:8080/api/test/reviewStatusChange/";

class ReviewsService
{
    getReviewsOfProduct(productId)
    {
        return axios.get(GET_REVIEWS_OF_PRODUCT + productId, { headers: authHeader() });
    }

    submitReview(productId, userId, reviewText)
    {
        return axios.post(SUBMIT_REVIEW + productId + "/" + userId + "/" + reviewText, { headers: authHeader() });
    }

    getPendingReviews()
    {
        return axios.get(GET_PENDING_REVIEWS, { headers: authHeader() });
    }

    setReviewStatus(reviewId, reviewStatus)
    {
        return axios.get(CHANGE_REVIEW_STATUS + reviewId + "/" + reviewStatus, { headers: authHeader() });
    }
}

export default new ReviewsService();