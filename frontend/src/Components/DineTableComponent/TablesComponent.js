import React, { useEffect, useState } from 'react'
import DineTablesService from '../../Services/DineTablesService';
import { Link ,useNavigate} from 'react-router-dom';

function TablesComponent() {
    const [dineTables,setDineTables]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        fetchdata()
    },[])

    const logout=()=>{
      sessionStorage.clear();
      navigate("/signin")
  }

    const fetchdata=()=>{
        console.log("Get All DineTables")
        DineTablesService.getAllTables(sessionStorage.getItem("jwt"))
        .then((result)=>{
            console.log(result.data)
            setDineTables([...result.data])
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const deleteTable=(tableId)=>{
          DineTablesService.deleteTable(tableId,sessionStorage.getItem("jwt"))
          .then((result)=>{
            alert("Deleted")
            fetchdata()
          }).catch((err)=>{
            alert("Deletionn Failed")
          })
        }
    
        const empty=()=>{
          DineTablesService.emptySlots(sessionStorage.getItem("jwt"))
          .then((result)=>{
            alert(result.data)
          }).catch((err)=>{
            console.log(err);
            alert("Try Again")
          })
        }

  return (
    <div>
      <nav className="navbar navbar-light bg-light justify-content-end">
      <form className="form-inline">
      <Link to="/addtable">Add Table</Link>
    <button className='ml-2 mr-2' id="btn2" name="btn2" onClick={empty}>Empty Table Slots</button>
    <button type="button" className="btn btn-primary ml-2 mr-2" onClick={logout}>Logout</button>
    </form>
</nav>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">Table Id</th>
      <th scope="col">Table Number</th>
      <th scope="col">Seating Capacity</th>
      <th scope="col">Location</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {dineTables.map((table)=><tr key={table.id}>
    <th scope="row">{table.id}</th>
      <td>{table.tableNumber}</td>
      <td>{table.seatingCapacity}</td>
      <td>{table.location}</td>
      <td>{table.status}</td>
      <td>
        <Link to="/edittables" state={{editTable:table}}>
        <button className="btn btn-success" type="button" name="View" id="View" value="View">Edit</button>
        </Link>&nbsp;&nbsp;
        <button className="btn btn-success" type="button" name="View" id="View" value="Delete"
        onClick={()=>{deleteTable(table.id)}}>Delete</button>
      </td>
    </tr>)}
  </tbody>
</table>

    </div>
  )
}

export default TablesComponent