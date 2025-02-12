import React, { useEffect, useState } from 'react'
import RestaurantService from '../../Services/RestaurantService';
import FoodService from '../../Services/FoodService';
import { Link ,useNavigate} from 'react-router-dom';
function FoodComponent() {
    const [foodArr,setFood]=useState([]);
    const navigate=useNavigate();
    // Runs At Initialization Time
    useEffect(()=>{
        fetchData();
    },[])

    const fetchData=()=>{
        console.log("fetchData called")
        FoodService.getMenuCard(sessionStorage.getItem("jwt"))
        .then((result)=>{
            console.log(result.data);
            setFood([...result.data])
        }).catch((err)=>{
            console.log("error")
            console.log(err)
        })
       
    }

    const deleteFood=(id)=>{
      console.log("delete food "+id)
      FoodService.deleteFoodById(id,sessionStorage.getItem("jwt"))
      .then((result)=>{
        console.log(result.data)
        alert(result.data)
        fetchData();
      }).catch((err)=>{
        console.log(err)
      })
    }

    const logout=()=>{
      sessionStorage.clear();
      navigate("/signin")
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light  justify-content-end">
      <Link to="/add"><button className="btn btn-success" type="button" name="View" id="View" value="View">Add Food</button></Link>
      <button type="button" className="btn btn-primary" onClick={logout}>Logout</button>
      </nav>
   
<table className="table">
  <thead>
    <tr>
      <th scope="col">Food Id</th>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Price</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {foodArr.map((food)=><tr key={food.id}>
    <th scope="row">{food.id}</th>
      <td>{food.name}</td>
      <td>{food.description}</td>
      <td>{food.price}</td>
      <td>
        <Link to="/edit" state={{editFood:food}}>
        <button className="btn btn-success" type="button" name="View" id="View" value="View">Edit</button>
        </Link>&nbsp;&nbsp;
        <button className="btn btn-success" type="button" name="View" id="View" value="Delete"
        onClick={()=>{deleteFood(food.id)}}>Delete</button>
      </td>
    </tr>)}
  </tbody>
</table>

    </div>
  )
}

export default FoodComponent