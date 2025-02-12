import axios from "axios";
let baseUrl="http://localhost:8080/restaurants";

class RestaurantService{
    constructor(){
        console.log("Restaurant Service Started")
    }

    getMenuCard(){
        return axios.get(baseUrl+"/1/menu")
    }
}

export default new RestaurantService();