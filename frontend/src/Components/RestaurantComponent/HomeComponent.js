import React from 'react'
import { Link ,useNavigate} from 'react-router-dom';

function HomeComponent() {
  const navigate=useNavigate();
  const logout=()=>{
    sessionStorage.clear();
    navigate("/signin")
}
  return (
    
    <div>
      <nav className="navbar navbar-light bg-light  justify-content-end">
      <button type="button" className="btn btn-primary" onClick={logout}>Logout</button>
      </nav>
      <br>
      </br>
      <br>
      </br>
      <div className="container justify-content-center">
      <div className="container-fluid">
      <div className="row mb-5 md-5">
    
        <div className="card" style={{width: "18rem"}}>
  <img src="/images/general_food.jpg" className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Foods</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

    <Link to="/restaurantfood">
    <button className="btn btn-success" type="button" name="View" id="View" value="View">Foods</button></Link>
  </div>
</div>

<div className="card" style={{width: "18rem"}}>
  <img src="/images/dine_table.jpg" className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Dine Tables</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <Link to="/tables">
    <button className="btn btn-success" type="button" name="View" id="View" value="View">Tables</button></Link>
  </div>
</div>


<div className="card" style={{width: "18rem"}}>
  <img src="/images/bookings.jpg" className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Bookings</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

    <Link to="/orders">
    <button className="btn btn-success" type="button" name="View" id="View" value="View">Bookings</button></Link>
  </div>
</div>

</div>
</div>
</div>
    </div>
  )
}

export default HomeComponent;