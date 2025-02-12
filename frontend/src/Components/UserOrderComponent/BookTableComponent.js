import React, { useEffect, useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import FoodService from '../../Services/FoodService';
import UserService from '../../Services/UserService';

function BookTableComponent() {
    const [foodArr,setFoodArr]=useState([]);
    const [orderedFood,setOrderedFood]=useState([]);
    const [removeFood,setRemoveFood]=useState(0);
    const [quantity,setQuantity]=useState(0);
    const [temp,setTemp]=useState(0);
    const location =useLocation();
    const navigate=useNavigate();

useEffect(()=>{
    console.log("Booked Table")
    console.log(location.state.booking.table)
    console.log(location.state.booking.slot)
    fetchdata()
},[])

useEffect(()=>{
    console.log(orderedFood)
},[orderedFood])

const fetchdata=()=>{
    FoodService.getMenuCard(sessionStorage.getItem("jwt"))
    .then((result)=>{
        console.log(result.data)
        setFoodArr([...result.data])
    })
    .catch((err)=>{
        console.log(err);
        alert("Couldn't fetch menu card. Try Again.")
    })
}

const toggleQuantity=(id)=>{
    document.getElementById(id).hidden=false;
}

const placeOrder=()=>{
    let myorder={
        tableId:location.state.booking.table.id,
        "bookingSlotId":location.state.booking.slot,
        foodDtoList:orderedFood
    }

    console.log(myorder)

    UserService.placeOrder(sessionStorage.getItem("jwt"),myorder)
    .then((result)=>{
        console.log(result.data)
        alert("Order Placed Successfully")
        navigate("/myorders")
    })
   .catch((err)=>{
    console.log(err)
   })
}

const addFood=(food)=>{
    let q=document.getElementById(food.name).value;
    let order={
        foodId:food.id,
        quantity:q
    }
    setOrderedFood([...orderedFood,order])
    alert(food.name+" added to food cart")
}

const removeItem=(foodId)=>{
    foodArr.filter((food)=>food.id!==removeFood)
    .forEach((food)=>{
        setOrderedFood([...orderedFood,food])
    })
}

const addToOrder=()=>{
    
}

  return (
    <div>
        <button type="button" onClick={placeOrder}>Place Order</button>
        {/* <button type="button" onClick={addToOrder}>Add Food To Order</button> */}
        <div className="container-fluid">
            <div className="row">
                {foodArr.map((food)=>
                    <div key={food.id} className="card" style={{width: "18rem"}}>
                    <img src={food.imageURL} className="card-img-top" alt={food.name}/>
                    <div className="card-body">
                    <table>
                        <tbody>
                            <tr><td><h5 className="card-title">{food.name}</h5></td></tr>
                            <tr><td><p className="card-text">{food.description}</p></td></tr>
                            <tr><td><label htmlFor='price'>Price</label></td>
                            <td><button type='button' className='btn btn-outline-secondary' >{food.price}</button></td>
                            </tr>
                            <tr>
                                <td><button onClick={()=>{toggleQuantity(food.name)}}>Add Quantity</button></td></tr>
                                <tr><td><input type='text' id={food.name} name={food.name} hidden></input></td>
                            </tr>
                            {/* //for Error handling */}
                            {/* <tr><td><input type='text'  id={food.name} name={food.name}></input></td></tr> */} 
                            <tr><td><button type='button' className='btn btn-primary' 
                      onClick={()=>{addFood(food)}}>Add</button></td>
                     <td><button type='button' className='btn btn-primary m-2' onClick={()=>removeItem(food.id)}>Remove</button></td></tr>
                        </tbody>
                    </table>
                      
                      
                        
                      
                      
                    </div>
                  </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default BookTableComponent