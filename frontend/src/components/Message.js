import { Alert } from 'react-bootstrap';

const Loader = ({ variant = 'info', children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Loader;
