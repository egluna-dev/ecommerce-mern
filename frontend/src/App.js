import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-5">
        <Container>
          <Route path='/product/:id' component={ProductScreen}/>
          <Route path='/login' component={LoginScreen}/>
          <Route path='/cart/:id?' component={CartScreen}/>
          <Route exact path='/' component={HomeScreen}  />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
