import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./style.scss";

export const AppNavbar = () => {
  return (
    <div>
      <Navbar bg="light">
        <Container>
          <Link to="/">
            <Navbar.Brand className="brand">Quest Mongers 62</Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
    </div>
  );
};
