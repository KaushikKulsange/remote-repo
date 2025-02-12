import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import NavBar from './Components/NavBar';
import FoodComponent from './Components/RestaurantComponent/FoodComponent';
import {Routes,Route,Navigate} from 'react-router-dom'
import HomeComponent from './Components/RestaurantComponent/HomeComponent';
import EditFoodComponent from './Components/RestaurantComponent/EditFoodComponent';
import AddFood from './Components/RestaurantComponent/AddFood';
import SignInComponent from './Components/UserComponents/SignInComponent';
import OrdersTab from './Components/Orders/OrdersTab';
import BookTableComponent from './Components/UserOrderComponent/BookTableComponent';
import TableToBookComponent from './Components/UserOrderComponent/TableToBookComponent';
import MyOrdersComponent from './Components/UserOrderComponent/MyOrdersComponent';
import UserRegistrationForm from './Components/UserComponents/UserRegistrationForm';
import TablesComponent from './Components/DineTableComponent/TablesComponent';
import AddNewItemToOrderComponent from './Components/UtilityComponent/AddNewItemToOrderComponent';
import EditTableComponent from './Components/DineTableComponent/EditTableComponent';
import AddTableComponent from './Components/DineTableComponent/AddTableComponent';

function App() {
  return (
    <div >
      {/* <NavBar></NavBar> */}
      <Routes>
        <Route path="/" element={<Navigate replace to="/signin"></Navigate>}></Route>
        <Route path="/signin" element={<SignInComponent></SignInComponent>}></Route>
        <Route path="/home" element={<HomeComponent></HomeComponent>}></Route>
        <Route path="/restaurantfood" element={<FoodComponent></FoodComponent>}></Route>
        <Route path="/edit" element={<EditFoodComponent></EditFoodComponent>}></Route>
        <Route path="/add" element={<AddFood></AddFood>}></Route>
        <Route path="/orders" element={<OrdersTab></OrdersTab>}></Route>
        <Route path="/foods" element={<BookTableComponent></BookTableComponent>}></Route>
        <Route path="/booktable" element={<TableToBookComponent></TableToBookComponent>}></Route>
        <Route path="/myorders" element={<MyOrdersComponent></MyOrdersComponent>}></Route>
        <Route path="/register" element={<UserRegistrationForm></UserRegistrationForm>}></Route>
        <Route path='/tables' element={<TablesComponent></TablesComponent>}></Route>
        <Route path='/edittables' element={<EditTableComponent></EditTableComponent>}></Route>
        <Route path="/addtable" element={<AddTableComponent></AddTableComponent>}></Route>
        <Route path="/addnewitem/:orderid" element={<AddNewItemToOrderComponent></AddNewItemToOrderComponent>}></Route>
      </Routes>
    </div>
  );
}

export default App;
