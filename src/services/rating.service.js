import axios from 'axios';
import authHeader from './auth-header';

const INSERT_RATING_TO_PRODUCT = "http://localhost:8080/api/test/createRating/";
const FETCH_RATINGS_OF_PRODUCT = "http://localhost:8080/api/test/showRating/";
const GET_ALL_RATINGS = "http://localhost:8080/api/test/showAllProductsRating/";
const CHECK_IF_USER_RATED_PRODUCT = "http://localhost:8080/api/test/showUsersRating/";

class RatingService 
{
    insertRatingToProduct(productId, userId, rating)
    {
        return axios.post(INSERT_RATING_TO_PRODUCT + productId + "/" + userId + "/" + rating, { headers: authHeader() });
    }

    fetchRatingsOfProduct(productId)
    {
        return axios.get(FETCH_RATINGS_OF_PRODUCT + productId, { headers: authHeader() });
    }

    fetchAllRatings()
    {
        return axios.get(GET_ALL_RATINGS, {headers: authHeader()});
    }

    checkIfUserSubmittedProduct(userId, productId)
    {
        return axios.get(CHECK_IF_USER_RATED_PRODUCT + userId + "/" + productId);
    }
}

export default new RatingService();