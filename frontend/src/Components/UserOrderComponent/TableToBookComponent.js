import React, { useEffect,useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import DineTablesService from '../../Services/DineTablesService'
import BookingSlotService from '../../Services/BookingSlotService'

function TableToBookComponent() {
    const [tablesArr,setTableArr]=useState([])
    const [slots,setSlot] =useState([]);
    const [selectedSlot,setSelectedSlot]=useState("");
    const navigate=useNavigate();

    useEffect(()=>{
        fetchdata()
        getSlots()
    },[])


    useEffect(()=>{
      console.log("Selected Slot "+selectedSlot)
    },[selectedSlot])

    const fetchdata=()=>{
            console.log("Get All DineTables")
            DineTablesService.getAllTables(sessionStorage.getItem("jwt"))
            .then((result)=>{
                console.log(result.data)
                setTableArr([...result.data])
            })
            .catch((err)=>{
                console.log(err)
            })
        }

  const getSlots=()=>{
    BookingSlotService.getAllSlots(sessionStorage.getItem("jwt"))
    .then((result)=>{
        console.log(result.data)
        setSlot([...result.data])
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  const handleSelect=(event)=>{
    let value=event.target.value;
    setSelectedSlot(value);
  }

  const tableAvailability=(event,id)=>{
    if(selectedSlot==""){
      alert("Select Slot")
    }else{
    DineTablesService.checkAvailable(id,selectedSlot,sessionStorage.getItem("jwt"))
    .then((result)=>{
        console.log(result.data)
        alert("Table Available")
    })
    .catch((err)=>{
      alert("Table Not Available At Given Time")
      console.log(err)
    })
  } 
  }

  const logout=()=>{
      sessionStorage.clear();
      navigate("/signin")
  }

  return (
    <div>
      <div>
      <nav className="navbar navbar-light bg-light">
      <Link to="/myorders">My Orders</Link>
      {console.log(slots.length)}
      <select id="time" name="time" onChange={handleSelect}>
        <option id="dummy" name="dummy">Select Time</option>
      {slots.forEach((slot)=>
        {
          let option=document.createElement("option");
          option.text=slot.bookingSlot+"  " +"    "+slot.dayTime;
          option.value=slot.id;
          document.getElementById("time").appendChild(option)
        }
      )}
      </select>
      <button className='btn btn-primary' id="logout" name="logout" onClick={logout}>Logout</button>
   </nav>
      </div>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">Table Number</th>
      <th scope="col">Seating Capacity</th>
      <th scope="col">Location</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {tablesArr.map((table)=><tr key={table.id}>
      <td>{table.tableNumber}</td>
      <td>{table.seatingCapacity}</td>
      <td>{table.location}</td>
      <td>{table.status}</td>
      <td>
        <button type='button' onClick={(event)=>{tableAvailability(event,table.id)}}>Available</button><br></br>
        <Link to="/foods" state={{booking:{table:table,slot:selectedSlot}}} >Book
        </Link>
      </td>
    </tr>)}
  </tbody>
</table>

    </div>
  )
}

export default TableToBookComponent