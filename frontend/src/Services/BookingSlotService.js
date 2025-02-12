import axios from "axios";
let baseUrl="http://localhost:8080/bookingslots"

class BookingSlotService{
    getAllSlots(jwt){
        let header={
            'Authorization':'Bearer '+jwt
        }
        return axios.get(baseUrl+"/all",{headers:header})
    }
}

export default new BookingSlotService();