import axios from "axios";
let baseUrl="http://localhost:8080/smartdine/dinetables";

class DineTablesService{
    constructor(){
        console.log("DineTablesService Started")
    }

    addTable(table,jwt){
        let header={
            'Authorization':'Bearer '+jwt
        }
        return axios.post(baseUrl,table,{headers:header})
    }

    checkAvailable(tableId,slotId,jwt){
        let header={
            'Authorization':'Bearer '+jwt
        }
        return axios(baseUrl+"/isavailable/"+tableId+"/"+slotId,{headers:header})
    }

    getAllTables(jwt){
        let header={
            'Authorization':'Bearer '+jwt
        }
        return axios.get(baseUrl,{headers:header})
    }

    updateTable(tableId,table,jwt){
        let header={
            'Authorization':'Bearer '+jwt
        }
        return axios.put(baseUrl+"/"+tableId,table,{headers:header})
    }

    deleteTable(tableId,jwt){
        let header={
            'Authorization':'Bearer '+jwt
        }
        return axios.delete(baseUrl+"/"+tableId,{headers:header})
    }

    updateTableSlot(tableId,slotId,jwt){
        let header={
            'Authorization':'Bearer '+jwt
        }
        return axios.patch(baseUrl+"/removeslot/"+tableId/slotId,{headers:header})
    }

    emptySlots(jwt){
        let header={
            'Authorization':'Bearer '+jwt
        }
        return axios.get(baseUrl+"/emptyslots",{headers:header})
    }
}

export default new DineTablesService();