import axios from 'axios';
import authHeader from './auth-header';

const SORT_BY_PRICE_ASC = "http://localhost:8080/api/test/fetchProductsPriceAsc/";
const SORT_BY_PRICE_DESC = "http://localhost:8080/api/test/fetchProductsPriceDesc/";
const SORT_BY_RATING = "http://localhost:8080/api/test/fetchProductsRatingDsc/";
const SORT_ALPHABETICAL = "http://localhost:8080/api/test/fetchProductsNameAsc/";

class FilterService 
{
    SortProductsByPriceAsc()
    {
        return axios.get(SORT_BY_PRICE_ASC, { headers: authHeader() });
    }

    SortProductsByPriceDesc()
    {
        return axios.get(SORT_BY_PRICE_DESC, { headers: authHeader() });
    }

    SortProductsByRating()
    {
        return axios.get(SORT_BY_RATING, { headers: authHeader() });
    }

    SortProductsByAlphabetical()
    {
        return axios.get(SORT_ALPHABETICAL, { headers: authHeader() });
    }
}

export default new FilterService();