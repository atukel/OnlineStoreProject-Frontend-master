import axios from 'axios'
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/test/getAllCategories"; // LEARN FROM BACKEND
const GET_PRODUCTS_OF_CATEGORY = "http://localhost:8080/api/test/getProductsByCat/";

class CategoriesService {
    fetchAllCategories() 
    { 
        console.log("Category Service:" , authHeader());
        return axios.get(API_URL, { headers: authHeader() }); 
    }

    getProductsOfCategory(categoryId)
    {
        return axios.get(GET_PRODUCTS_OF_CATEGORY + categoryId, { headers: authHeader() });
    }
}

export default new CategoriesService();