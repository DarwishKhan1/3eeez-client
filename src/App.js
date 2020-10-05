import React, { Fragment } from 'react';
import jwt_decode from 'jwt-decode'
import './App.css';
import Home from './Components/Home/Home'
import Aboutus from './Components/AboutUs/Aboutus';
import Navbar from './Components/Layout/Navbar'
import Footer from './Components/Layout/Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import setAuthToken from './utility/setAuthToken'

import ShopComponent from './Components/Store/Shop/Shop'
import ProductsComponent from './Components/Store/Product/Products'
import SelectedProductComponent from './Components/Store/Product/SelectedProduct'
import ShoppingCartComponent from './Components/Store/ShoppingCart/ShoppingCart'
import ShippingDetailsComponent from './Components/Store/ShippingDetails/ShippingDetails'
import PaymentOptionsComponent from './Components/Store/PatmentOption/PaymentOptions'
import OrderConfirmationComponent from './Components/Store/OrderConfirmation/OrderConfirmation'
import LoginComponent from './Components/Auth/Login'
import RegisterComponent from './Components/Auth/Register'
import ProfileComponent from './Components/Auth/Profile'
import S_P_RegisterComponent from './Components/Auth/ServiceProviderRegister'
import CreateProfileComponent from './Components/Auth/CreateProfile'
import AddLocationComponent from './Components/Auth/AddLocation'
import EditProfileComponent from './Components/Auth/EditProfile'
import AddServicesComponent from './Components/Auth/AddServices'
import ServicerAppointments from './Components/ServicerProfile/ServicerAppointments';
import SpecificAppointment from './Components/ServicerProfile/SpecificAppointment';
import PrivateRoute from './Components/common/privateRoute'

//Services Components
import FeatureddServicesComponents from './Components/Services/FeatureddServices/FeaturedServices'
import ServicesComponents from './Components/Services/ServicesStore/Services'
import SelectedProfileComponent from './Components/Services/ServicesStore/SelectedProfile'
import AppointmentComponent from './Components/Services/Appointment/appointment'
import ServicesPaymentOptions from './Components/Services/Appointment/PatmentOption/PaymentOptions'
import AppointmentConfirmation from './Components/Services/Appointment/appointmentConfirmation'
import ShowLocation from './Components/ServicerProfile/ShowLocation';




//connect redux with react
import { Provider } from 'react-redux';
import Store from './store';

// Check for token
if (localStorage.token) {
  // Set auth token header auth
  setAuthToken(localStorage.token);
  const decoded = jwt_decode(localStorage.token);


  if(decoded.isServiceProvider){
    
    window.location.href = '/service-provider/profile';
  }
 
}

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Switch>
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/register" component={RegisterComponent} />
            <Route exact path="/service-provider-register" component={S_P_RegisterComponent} />
            <Route exact path="/store" component={ShopComponent} />
            <Route exact path="/store/products" component={ProductsComponent} />
            <Route exact path="/aboutus" component={Aboutus} />
            <Route exact path="/store/selected-product/:id" component={SelectedProductComponent} />
            <PrivateRoute exact path="/store/shopping-cart" component={ShoppingCartComponent} />
            <PrivateRoute exact path="/store/shipping-details" component={ShippingDetailsComponent} />
            <PrivateRoute exact path="/store/payment-options" component={PaymentOptionsComponent} />
            <PrivateRoute exact path="/store/order-confirmation" component={OrderConfirmationComponent} />
            <PrivateRoute exact path="/service-provider/profile" component={ProfileComponent} />
            <PrivateRoute exact path="/service-provider/create-profile" component={CreateProfileComponent} />
            <PrivateRoute exact path="/service-provider/edit-profile" component={EditProfileComponent} />
            <PrivateRoute exact path="/service-provider/add-services" component={AddServicesComponent} />
            <PrivateRoute exact path="/service-provider/add-location" component={AddLocationComponent} />
            <PrivateRoute exact path="/service-provider/appointments" component={ServicerAppointments} />
            <PrivateRoute exact path="/service-provider/appointment/:id" component={SpecificAppointment} />
            <PrivateRoute exact path="/service-provider/appointment/:lat/:lng" component={ShowLocation} />
            {/* Services Routes */}
            <Route exact path="/services/feature-services" component={FeatureddServicesComponents} />
            <Route exact path="/services/services-store" component={ServicesComponents} />
            <Route exact path="/services/services-store/:profileId/:serviceId" component={SelectedProfileComponent} />
            <PrivateRoute exact path="/services/services-cart/:servicerId" component={AppointmentComponent} />
            <PrivateRoute exact path="/services/payment-options" component={ServicesPaymentOptions} />
            <PrivateRoute exact path="/services/appointment-confirmation" component={AppointmentConfirmation} />
            
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
