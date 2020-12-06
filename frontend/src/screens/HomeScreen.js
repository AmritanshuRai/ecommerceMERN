import { useState, useEffect } from 'react';
// import products from '../products';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async function () {
      const url = '/api/products';
      let response = await fetch(url);
      const p = await response.json();
      setProducts(p);
    })();
  }, []);

  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product.name} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
