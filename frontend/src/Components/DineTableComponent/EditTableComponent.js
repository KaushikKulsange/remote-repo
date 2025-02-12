import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DineTablesService from '../../Services/DineTablesService';

function EditTableComponent() {

    const [table,setTable]=useState({id:0,tableNumber:0,seatingCapacity:0,location:"",status:""})

    const navigate=useNavigate();
    const location=useLocation();

    useEffect(()=>{
      console.log(location.state.editTable)
        setTable({...location.state.editTable})
    },[])

    const handleChange=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        setTable({...table,[name]:value})
    }

    const updateTable=()=>{
        DineTablesService.updateTable(table.id,table,sessionStorage.getItem("jwt"))
        .then((result)=>{
          alert(result.data);
          navigate("/tables")
        }).catch((err)=>{
          alert("Table Update Failed")
        })
    }

  return (
    <div>
        <form>
<div class="form-group">
    <label htmlFor="id">Table Id</label>
    <input type="text" class="form-control" readOnly={true} id="id" name="id" value={table.id}/>
  </div>
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

  <div class="form-group">
    <label for="status">Table Status</label>
    <input type="text" class="form-control" id="status" name="status" value={table.status} onChange={handleChange}/>
  </div>

  <button type="button" class="btn btn-primary" onClick={updateTable}>Update</button>
</form>
    </div>
  )
}

export default EditTableComponent