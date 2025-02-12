import axios from "axios";
let baseUrl="http://localhost:8080/food";

class FoodService{
    constructor(){
        console.log("FoodService Started")
        // axios.defaults.withCredentials=false;
    }

    getMenuCard(jwt){
        let header={
            'Authorization':'Bearer '+jwt
        }
        console.log("header "+header.Authorization)
        return axios.get(baseUrl+"/getAllFood",{headers:header});
    }

    addFood(food,jwt){
        let header={
            'Authorization':'Bearer '+jwt
        }
        return axios.post(baseUrl+"/addfood",food,{headers:header})
    }

    updateFood(foodid,restroId,food,jwt){
        let header={
            'Authorization':'Bearer '+jwt
        }
        return axios.put(baseUrl+"/updateFood/"+foodid,food,{headers:header})
    }

    deleteFoodById(foodid,jwt){
        let header={
            'Authorization':'Bearer '+jwt
        }
        console.log(baseUrl+"/deleteFood"+foodid)
        return axios.delete(baseUrl+"/deleteFood/"+foodid,{headers:header})
    }
}

export default new FoodService();