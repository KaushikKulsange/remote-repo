import axios from "axios";
let baseUrl="http://localhost:8080/orders"

class OrdersService{
    getAllOrders(jwt){
        let header={
            'Authorization':'Bearer '+jwt
        }
        return axios.get(baseUrl+"/all",{headers:header})
    }

    getOrderByType(orderType,jwt){
        let header={
            'Authorization':'Bearer '+jwt
        }
        return axios.get(baseUrl+"/"+orderType,{headers:header})
    }
}

export default new OrdersService();