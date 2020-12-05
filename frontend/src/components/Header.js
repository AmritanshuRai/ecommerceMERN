import { Container, Navbar, Nav } from 'react-bootstrap';
const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>eCommerce</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='/cart'>
                {' '}
                <i className='fas fa-shopping-cart mr-1'></i>Cart
              </Nav.Link>
              <Nav.Link href='/login'>
                <i className='fas fa-user mr-1'></i>Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
