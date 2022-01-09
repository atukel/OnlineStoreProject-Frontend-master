import axios from 'axios';
import authHeader from './auth-header';

const FETCH_CHECKEDOUT_ITEMS = "http://localhost:8080/api/test/fetchAllProductsInCarts/"; // LEARN FROM BACKEND
const REMOVE_FROM_CART = "http://localhost:8080/api/test/removeItemFromCart/";
const ADD_TO_CART = "http://localhost:8080/api/test/addToCart/";
const DECREMENT_PRODUCT_QUANTITY_OF_USER = "http://localhost:8080/api/test/removeQuantityFromCart/";
const INCREMENT_PRODUCT_QUANTITY_OF_USER = "http://localhost:8080/api/test/incrementQuantityFromCart/";
const FINALIZE_CHECKOUT = "http://localhost:8080/api/test/finalizeCheckout/";
const CHECK_FOR_COUPON = "http://localhost:8080/api/test/testApplyCoupon/";

class CartService
{
    applyCouponIfAvailable(coupon_string)
    {
        return axios.post(CHECK_FOR_COUPON + coupon_string, { headers: authHeader() });
    }

    getCheckedOutItems(userId)
    {
        return axios.get(FETCH_CHECKEDOUT_ITEMS + userId, { headers: authHeader() });
    }

    removeFromCart(userId, productId)
    {
        return axios.post(REMOVE_FROM_CART + userId + "/" + productId, { headers: authHeader() });
    }

    addToCart(userId, productId, quantity)
    {
        return axios.post(ADD_TO_CART + userId + "/" + productId + "/" + quantity, { headers: authHeader() });
    }

    decrementUserQuantityOfProduct(userId, productId)
    {
        return axios.post(DECREMENT_PRODUCT_QUANTITY_OF_USER + userId + "/" + productId, { headers: authHeader() });
    }

    incrementUserQuantityOfProduct(userId, productId)
    {
        return axios.post(INCREMENT_PRODUCT_QUANTITY_OF_USER + userId + "/" + productId, { headers: authHeader() });
    }

    finalizeCheckout(userId)
    {
        return axios.get(FINALIZE_CHECKOUT + userId, {headers: authHeader()});      
    }
}

export default new CartService();