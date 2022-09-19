import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-5">
        <Container>
          <Route exact path='/' component={HomeScreen}  />
          <Route path='/product/:id' component={ProductScreen}/>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
