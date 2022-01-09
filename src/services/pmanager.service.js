import axios from 'axios';
import authHeader from './auth-header';

const ADDITEM_URL = "http://localhost:8080/api/test/insertProduct/"; // LEARN FROM BACKEND
const UPDATE_ITEM_URL = "http://localhost:8080/api/test/updateProduct/";
const DELETE_ITEM_URL = "http://localhost:8080/api/test/deleteProductById/";
const getAllProducts = "http://localhost:8080/api/test/getAllProducts";
const GET_ALL_CATEGORIES = "http://localhost:8080/api/test/getAllCategories";
const ADDCATEGORY = "http://localhost:8080/api/test/addCategory/";



class pmanagerService
{
    

    AddItem(description,distribution_info,modal,Warrant_status,name,stock,price,catname)
    {
        console.log(ADDITEM_URL+description+"/"+distribution_info+"/"+modal+"/"+name+"/"+price+"/"+stock+"/"+Warrant_status + "/" + catname)
        return axios.post(ADDITEM_URL+description+"/"+distribution_info+"/"+modal+"/"+name+"/"+price+"/"+stock+"/"+Warrant_status + "/" + catname , { headers: authHeader() });
    }
    AddCategory(category)
    {
        return axios.post(ADDCATEGORY+category , { headers: authHeader() });
    }    
    UpdateItem(id,description,distribution_info,modal,Warrant_status,name,stock,price)
    {
        console.log(UPDATE_ITEM_URL+id+"/"+description+"/"+distribution_info+"/"+modal+"/"+name+"/"+price+"/"+stock+"/"+Warrant_status )
        return axios.post(UPDATE_ITEM_URL+id+"/"+description+"/"+distribution_info+"/"+modal+"/"+name+"/"+price+"/"+stock+"/"+Warrant_status , { headers: authHeader() });
    }
    DeleteItem(id)
    {   console.log(DELETE_ITEM_URL+id );
        return axios.post(DELETE_ITEM_URL+id , { headers: authHeader() });
    }
    getProducts(){
        return axios.get(getAllProducts, { headers: authHeader() });
        
    }

    getAllCategories()
    {
        return axios.get(GET_ALL_CATEGORIES, { headers: authHeader() });
    }
}

export default new pmanagerService();