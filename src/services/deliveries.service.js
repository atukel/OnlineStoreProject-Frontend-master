import axios from 'axios';
import authHeader from './auth-header';

const GET_ALL_PENDING_DELIVERIES = "http://localhost:8080/api/test/returnAllPendingDelivery";
const SET_DELIVERY_STATUS = "http://localhost:8080/api/test/deliveryStatusChange/";

class DeliveriesService 
{
    getAllPendingDeliveries()
    {
        return axios.get(GET_ALL_PENDING_DELIVERIES, {headers: authHeader()});
    }

    setDeliveryStatus(checkoutId, deliveryStatus)
    {
        return axios.get(SET_DELIVERY_STATUS + checkoutId + "/" + deliveryStatus, { headers: authHeader() });
    }
}

export default new DeliveriesService();