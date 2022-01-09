import axios from 'axios';
import authHeader from './auth-header';

const REMOVE_DISCOUNT = "http://localhost:8080/api/test/removeDiscountItem/";
const SET_DISCOUNT_TO_PRODUCT = "http://localhost:8080/api/test/discountItem/";
const GET_ALL_INVOICES = "http://localhost:8080/api/test/fetchAllCheckedOutItems/";
const CREATE_COUPON = "http://localhost:8080/api/test/addCoupon/";

class SalesManagerServices
{
    createCoupon(coupon_string, discountRatio, productId)
    {
        return axios.post(CREATE_COUPON + coupon_string + "/" + discountRatio + "/" + productId, { headers: authHeader() });
    }

    removeDiscountFromProduct(productId)
    {
        return axios.get(REMOVE_DISCOUNT + productId, { headers: authHeader() });
    }

    setDiscountToProduct(productId, discountPercentage)
    {
        return axios.get(SET_DISCOUNT_TO_PRODUCT + productId + "/" + discountPercentage, { headers : authHeader() });
    }

    getAllInvoices()
    {
        return axios.get(GET_ALL_INVOICES, { header: authHeader() });
    }
}

export default new SalesManagerServices();