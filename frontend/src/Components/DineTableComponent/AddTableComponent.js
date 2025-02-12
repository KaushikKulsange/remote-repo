import React,{useState} from 'react'
import DineTablesService from '../../Services/DineTablesService';
import { useNavigate } from 'react-router-dom';

function AddTableComponent() {
    const [table,setTable]=useState({tableNumber:0,seatingCapacity:0,location:""})

    const navigate=useNavigate();

    const handleChange=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        setTable({...table,[name]:value})
    }

    const addTable=()=>{
        DineTablesService.addTable(table,sessionStorage.getItem("jwt"))
        .then((result)=>{
            alert(result.data)
            navigate("/tables")
        })
        .catch((err)=>{
            alert("Something Went Wrong")
        })
    }
  return (
    <div>
        <form>
  <div class="form-group">
    <label htmlFor="tableNumber">Table Number</label>
    <input type="text" class="form-control" id="tableNumber" name="tableNumber" value={table.tableNumber} onChange={handleChange}/>
  </div>
  <div class="form-group">
    <label htmlFor="seatingCapacity">Seating Capacity</label>
    <input type="text" class="form-control" id="seatingCapacity" name="seatingCapacity" value={table.seatingCapacity} onChange={handleChange}/>
  </div>
  <div class="form-group">
    <label htmlFor="location">Table Location</label>
    <input type="text" class="form-control" id="location" name="location" value={table.location} onChange={handleChange}/>
  </div>

  {/* <div class="form-group">
    <label for="status">Table Status</label>
    <input type="text" class="form-control" id="status" name="status" value={table.status} onChange={handleChange}/>
  </div> */}

  <button type="button" class="btn btn-primary" onClick={addTable}>Add</button>
</form>
    </div>
  )
}

export default AddTableComponent