import { or } from "ajv/dist/compile/codegen";
import axios from "axios";
let baseUrl="http://localhost:8080/users";

class UserService{

    emailValidation(email){
        return axios.get()
    }

    otpValidation(otp){
        
    }

    registerUser(user){
        return axios.post(baseUrl+"/signup",user)
    }

    loginUser(credentials){
        return axios.post(baseUrl+"/signin",credentials)
    }

    placeOrder(jwt,order){
        let header={
            'Authorization':'Bearer '+jwt
        }
        return axios.post(baseUrl+"/orders",order,{headers:header})
    }

    getMyOrders(jwt){
        let header={
            'Authorization':'Bearer '+jwt
        }

        return axios.get(baseUrl+"/orders",{headers:header})
    }

    cancelMyOrder(jwt,orderId){
        let header={
            'Authorization':'Bearer '+jwt
        }
        return axios.delete(baseUrl+"/orders/"+orderId,{headers:header})
    }

    addNewFoodItem(jwt,orderId,food){
        let header={
            'Authorization':'Bearer '+jwt
        }
        return axios.post(baseUrl+"/orders/"+orderId+"/additem",food,{headers:header})
    }

    removeFoodItem(jwt,orderId,foodId){
        let header={
            'Authorization':'Bearer '+jwt
        }
        return axios.get(baseUrl+"/orders/"+orderId+"/removeitem/"+foodId,{headers:header})
    }
}

export default new UserService();