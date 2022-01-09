import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/test/findBydescriptionOrNameContaining/"; // LEARN FROM BACKEND
const FETCH_COFFEE_MACHINES = "http://localhost:8080/api/test/getAllProducts"; // LEARN FROM BACKEND

class ProductsService
{
    getAllCoffeeMachines()
    {
        return axios.get(FETCH_COFFEE_MACHINES, { headers: authHeader() });
    }

    getRelatedCoffeeMachines(searchString)
    {
        return axios.get(API_URL + searchString, { headers: authHeader() });
    }
}

export default new ProductsService();