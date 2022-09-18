import products from '../products';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';

const HomeScreen = () => {
  return (
    <>
        <h1 className='mb-4'>Latest Products</h1>
        <Row>
            {products.map(product => (
                <Col key={product.id} sm={12} md={6} lg={4}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
    </>
  )
}

export default HomeScreen