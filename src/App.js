
import './App.css';
import './common.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Contactus from './Pages/Contactus/Contactus';
import Notfound from './Pages/Notfound/Notfound';
import Login from './Pages/User/Login/Login';
import AuthProvider from './Hooks/Context/AuthProvider';
import LoginRedirect from './component/LoginRedirect';
import PrivateRoute from './component/PrivateRoute';
import Signin from './Pages/User/Email/Signin/Signin';
import Signup from './Pages/User/Email/Signup/Signup';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import UpdateProduct from './Pages/Dashboard/Product/ManageProduct/UpdateProduct';
import ProductDetails from './Pages/Product/ProductDetails/ProductDetails';
import Product from './Pages/Product/Product/Product';
import PlaceOrder from './Pages/Dashboard/Order/PlaceOrder/PlaceOrder';
import UpdateStatus from './Pages/Dashboard/Order/ManageOrder/UpdateStatus';
import AboutUs from './Pages/Aboutus/AboutUs';
import PaymentMethod from './Pages/Dashboard/Order/PlaceOrder/PaymentMethod/PaymentMethod';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/home">
            <Home></Home>
          </Route>
          <Route exact path="/aboutus">
           <AboutUs/>
          </Route>
          <PrivateRoute exact path="/contactus">
            <Contactus></Contactus>
          </PrivateRoute>
          <PrivateRoute  path="/dashboard">
           <Dashboard></Dashboard>
          </PrivateRoute>
          <PrivateRoute exact path="/updateproduct/:ID">
     <UpdateProduct></UpdateProduct>
          </PrivateRoute>
          <PrivateRoute exact path="/productDetails/:ID">
     <ProductDetails></ProductDetails>
          </PrivateRoute>
          <PrivateRoute exact path="/product">
    <Product></Product>
          </PrivateRoute>
            <PrivateRoute exact path="/placeorder/:orderID">
              <PlaceOrder></PlaceOrder>
          </PrivateRoute>
            <PrivateRoute exact path="/updatestatus/:id">
            <UpdateStatus></UpdateStatus>
          </PrivateRoute>
            <PrivateRoute exact path="/paymentmethod">
            <PaymentMethod/>
          </PrivateRoute>
          <LoginRedirect exact path="/login">
            <Login></Login>
          </LoginRedirect>
          <LoginRedirect exact path="/signin">
            <Signin></Signin>
          </LoginRedirect>
          <Route exact path="/signup">
           <Signup></Signup>
          </Route>
          <Route exact path="*">
            <Notfound></Notfound>
          </Route>
        </Switch>
      </Router>
      
      </AuthProvider>
    </div>
  );
}

export default App;
