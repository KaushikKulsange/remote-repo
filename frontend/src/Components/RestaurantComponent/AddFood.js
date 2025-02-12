import React, { useEffect } from 'react'
import { useState} from 'react'
import FoodService from '../../Services/FoodService'
import { useNavigate } from 'react-router-dom'

function AddFood() {
    const [food,setFood]=useState({id:0,name:"",description:"",price:0,imageURL:""})
    const navigate=useNavigate();
    useEffect(()=>{

    },[])

    const handleChange=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        setFood({...food,[name]:value})
        console.log(food)
    }

    const addFood=()=>{
        if(food.name==="" || food.description==="" || food.price==0 ||food.imageURL===""){
            alert("All The fields should be field properly")
        }else{
            FoodService.addFood(food,sessionStorage.getItem("jwt"))
        .then((result)=>{
            console.log(result.data)
            alert(result.data)
            navigate("/restaurantfood")
        }).catch((err)=>{
            console.log(err)
        })
        }
    }

  return (
    <div>
        <form>
  <div className="form-group">
    <label htmlFor="name">Food Name</label>
    <input type="text" className="form-control" id="name" name="name" value={food.name} onChange={handleChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="description">Food Description</label>
    <input type="text" className="form-control" id="description" name="description" value={food.description} onChange={handleChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="price">Food Price</label>
    <input type="number" className="form-control" id="price" name="price" value={food.price} onChange={handleChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="imageURL">Image URL</label>
    <input type="text" className="form-control" id="imageURL" name="imageURL" value={food.imageURL} onChange={handleChange}/>
  </div>

  <button type="button" className="btn btn-primary" onClick={addFood}>Add</button>
</form>
    </div>
  )
}

export default AddFood