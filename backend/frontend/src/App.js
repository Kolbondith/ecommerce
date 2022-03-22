import {Container  } from 'react-bootstrap'
import {HashRouter as Router, Route  } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import ProductScreen from './screens/ProductScreen'
import HomeScreen from './screens/HomeScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceorderScreen from './screens/PlaceorderScreen'
import OrderScreen from './screens/OrderScreen'
import UsersListScreen from './screens/UsersListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductsListScreen from './screens/ProductsListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrdersListScreen from './screens/OrdersListScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/placeorder' component={PlaceorderScreen} />
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/admin/orderslist' component={OrdersListScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/admin/userslist' component={UsersListScreen} />
            <Route path='/admin/users/:id/edit' component={UserEditScreen} />
            <Route path='/admin/productslist' component={ProductsListScreen} />
            <Route path='/admin/products/:id/edit' component={ProductEditScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
