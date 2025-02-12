import React, { useEffect, useState } from 'react'
import { useLocation,useNavigate} from 'react-router-dom'
import FoodService from '../../Services/FoodService';

function EditFoodComponent() {
const [food,setFood]=useState({id:0,name:"",description:"",price:0,imageURL:""})
const location=useLocation();
const navigate=useNavigate();

useEffect(()=>{
    setFood({...location.state.editFood})
},[])

const handleChange=(event)=>{
    let name=event.target.name;
    let value=event.target.value;
    console.log(name+" = "+value)
    setFood({...food,[name]:value})
}

const updateFood=()=>{
    FoodService.updateFood(food.id,1,food,sessionStorage.getItem("jwt"))
        .then((result)=>{
            console.log(result)
            alert("Updated")
            navigate("/restaurantfood")
        })
        .catch((err)=>{
            console.log(err)
            alert("Update Failed")
        })
}


  return (
    <div>
<form>
<div class="form-group">
    <label for="id">Food Id</label>
    <input type="text" class="form-control" readOnly={true} id="id" name="id" value={food.id}/>
  </div>
  <div class="form-group">
    <label for="name">Food Name</label>
    <input type="text" class="form-control" id="name" name="name" value={food.name} onChange={handleChange}/>
  </div>
  <div class="form-group">
    <label for="description">Food Description</label>
    <input type="text" class="form-control" id="description" name="description" value={food.description} onChange={handleChange}/>
  </div>
  <div class="form-group">
    <label for="price">Food Price</label>
    <input type="number" class="form-control" id="price" name="price" value={food.price} onChange={handleChange}/>
  </div>

  <div class="form-group">
    <label for="imageURL">Image URL</label>
    <input type="text" class="form-control" id="imageURL" name="imageURL" value={food.imageURL} onChange={handleChange}/>
  </div>

  <button type="button" class="btn btn-primary" onClick={updateFood}>Update</button>
</form>

    </div>
  )
}

export default EditFoodComponent