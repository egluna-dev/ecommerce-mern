import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='my-3'>
        <Container>
            <Row>
                <Col className='text-center py-r'>
                    Copyright &copy; ProShop
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer