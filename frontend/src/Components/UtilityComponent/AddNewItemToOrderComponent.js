import React, { useEffect, useState } from 'react'
import FoodService from '../../Services/FoodService';
import UserService from '../../Services/UserService';
import { useParams,useNavigate } from 'react-router-dom';

function AddNewItemToOrderComponent() {
    const [foodArr,setFoodArr]=useState([]);
    const [orderedFood,setOrderedFood]=useState([]);
    const [removeFood,setRemoveFood]=useState(0);
    const navigate=useNavigate();

    const {orderid}=useParams();

    useEffect(()=>{
        fetchdata()
    },[])

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

    const addItem=()=>{
        console.log(orderid)
        console.log(orderedFood)
        if(orderedFood.length==1){
            UserService.addNewFoodItem(sessionStorage.getItem("jwt"),orderid,orderedFood[0])
            .then((result)=>{
                console.log(result.data)
                alert(result.data)
                navigate("/myorders")
            }).catch((err)=>{
                console.log(err)
                alert("Failed To Add Food")
            })
        }else{
            alert("Select One Food Item Only")
        }
    }

  return (

    <div>
        <nav class="nav">
            <button type='button' onClick={addItem}>Add To Order</button>
        </nav>
        <div className="container-fluid">
            <div className="row">
                {foodArr.map((food)=>
                    <div key={food.id} className="card" style={{width: "18rem"}}>
                    <img src="..." className="card-img-top" alt={food.name}/>
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

export default AddNewItemToOrderComponent