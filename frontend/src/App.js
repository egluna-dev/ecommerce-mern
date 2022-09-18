import './App.css';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <Header />
      <main className="py-5">
        <Container>
          <h1>Wecome to ProShop</h1>
        </Container>
      </main>
    <Footer />
    </>
  );
}

export default App;
