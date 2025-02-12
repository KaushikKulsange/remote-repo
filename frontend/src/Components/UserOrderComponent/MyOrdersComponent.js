import React ,{ useEffect, useState } from 'react'
import UserService from '../../Services/UserService';
import { or } from 'ajv/dist/compile/codegen';
import { Link, Outlet,useNavigate } from 'react-router-dom';

function MyOrdersComponent() {
    const [orders,setOrders]=useState([]);
    const [ordersByStatus,setOrdersByStatus]=useState([])
    const navigate=useNavigate();

    useEffect(()=>{
        fetchData();
    },[])

    

    const fetchData=()=>{
        UserService.getMyOrders(sessionStorage.getItem("jwt"))
        .then((result)=>{
            console.log(result.data)
            setOrders([...result.data])
            setOrdersByStatus([...result.data])
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const cancelOrder=(orderId)=>{
        UserService.cancelMyOrder(sessionStorage.getItem("jwt"),orderId)
        .then((result)=>{
            console.log(result.data)
            alert(result.data)
        })
        .catch((err)=>{
            console.log(err)
            alert("Order Can Not Be Cancelled")
        })
    }

    const removeFood=(orderId,foodId)=>{
        UserService.removeFoodItem(sessionStorage.getItem("jwt"),orderId,foodId)
        .then((result)=>{
          console.log(result.data)
          alert(result.data)
          fetchData()
        }).catch((err)=>{
          console.log(err)
          alert("Food Removal Failed")
        })
    }

    const fetchOrderByType=(orderType)=>{
      console.log(orders)
       let updatedOrders= orders.filter((order)=>order.status===orderType);
       setOrdersByStatus([...updatedOrders])
      }
    
      useEffect(()=>{
        console.log(ordersByStatus)
      },[ordersByStatus])

      const logout=()=>{
        sessionStorage.clear();
        navigate("/signin")
    }

  return (
    <div>
      <nav className="navbar navbar-light bg-light  justify-content-end">
      <table>
        <tbody>
      <tr>
        {/* <td><button type="button" className="btn btn-primary" onClick={()=>{fetchOrderByType("SERVED")}}>Served Orders</button></td> */}
        {/* <td><button type="button" className="btn btn-primary" onClick={()=>{fetchOrderByType("GETTINGREADY")}}>Ready Orders</button></td> */}
        <td><button type="button" className="btn btn-primary" onClick={()=>{fetchOrderByType("PLACED")}}>New Orders</button></td>
        <td><button type="button" className="btn btn-primary" onClick={()=>{fetchOrderByType("CANCELLED")}}>Cancelled Orders</button></td>
        <td><button type="button" className="btn btn-primary" onClick={()=>{fetchData()}}>All Orders</button></td>
        <td><button type="button" className="btn btn-primary" onClick={logout}>Logout</button></td>
      </tr>
      </tbody>
    </table>
    </nav>
         <div className="container-fluid">
  <div className="row mb-5 md-5">
    {/*  */}
        {ordersByStatus.map((order)=>
          <div key={order.id} className="card col-sm-auto-md-4-mb-4" style={{width: "18rem",padding:"0rem"}}>
          <div className="card-body">
            <h5 className="card-title">Order {order.id}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Table Number = {order.tableNumber}</h6>
            <h6 className="card-subtitle mb-2 text-muted">Reservation Time = {order.reservationTime}</h6>
            <h6 className="card-subtitle mb-2 text-muted">Booked Time = {order.bookedTime}</h6>
            <h6 className="card-subtitle mb-2 text-muted">Total Price = {order.price}</h6>
            <h6 className="card-subtitle mb-2 text-muted">Order Status = {order.status}</h6>
            <div>
              
            <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Quantity</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {order.foods.map((food)=><tr key={food.id}>
    <td>{food.name}</td>
    <td>{food.quantity}</td>
    <td><button type='button' onClick={()=>{removeFood(order.id,food.id)}}>Remove</button></td>
    </tr>)}
    </tbody>
    </table>

            </div>
            <button type="button" onClick={()=>{cancelOrder(order.id)}}>Cancel</button>
            {/* <button type="button" onClick={()=>{addFood(order.id)}}>Add Food</button> */}
            <Link to={"/addnewitem/"+order.id}>Add Food</Link>
          </div>
        </div>

        )}

</div>
  </div>
  <di>
   
  </di>
    </div>
  )
}

export default MyOrdersComponent