import React, { useEffect, useState } from 'react'
import OrdersService from './OrdersService';

function OrdersTab() {
  const [orders,setOrders]=useState([]);
  const [orderArr,setOrdersArr]=useState([]);

  useEffect(()=>{
    fetchData()
  },[])

  useEffect(()=>{
    
  },[orders,orderArr])

  const fetchData=()=>{
      OrdersService.getAllOrders(sessionStorage.getItem("jwt"))
      .then((result)=>{
        console.log(result.data)
        setOrders([...result.data])
        setOrdersArr([...result.data])
        console.log("orders")
        console.log(orders)
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  const fetchOrderByType=(orderType)=>{
    OrdersService.getOrderByType(orderType,sessionStorage.getItem("jwt"))
    .then((result)=>{
      setOrders([...result.data])
      setOrdersArr([...result.data])
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const cancelledOrders=()=>{
    let corders=orders.filter((order)=>order.status==='CANCELLED');
    setOrdersArr([...corders])
  }

  return (
    <div>
      <table>
        <tbody>
      <tr>
        {/* <td><button type="button" className="btn btn-primary" onClick={()=>{fetchOrderByType("SERVED")}}>Served Orders</button></td>
        <td><button type="button" className="btn btn-primary" onClick={()=>{fetchOrderByType("GETTINGREADY")}}>Ready Orders</button></td> */}
        <td><button type="button" className="btn btn-primary" onClick={()=>{fetchOrderByType("PLACED")}}>New Orders</button></td>
        <td><button type="button" className="btn btn-primary" onClick={cancelledOrders}>Cancelled Orders</button></td>
        <td><button type="button" className="btn btn-primary" onClick={()=>{fetchData()}}>All Orders</button></td>
      </tr>
      </tbody>
    </table>
      <div className="container-fluid">
  <div className="row mb-5 md-5">
    {/*  */}
        {orderArr.map((order)=>
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
    </tr>
  </thead>
  <tbody>
    {order.foods.map((food)=><tr>
    <td>{food.name}</td>
    <td>{food.quantity}</td>
    </tr>)}
    </tbody>
    </table>

            </div>
            <a href="#" className="card-link">Card link</a>
            <a href="#" className="card-link">Another link</a>
          </div>
        </div>

        )}
{/*  */}
</div>
  </div>
</div>
    // </div>
  )
}

export default OrdersTab