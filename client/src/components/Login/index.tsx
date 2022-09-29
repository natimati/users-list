import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { login } from "../../api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const onEmailChange: React.ChangeEventHandler<HTMLInputElement> = (event) => setEmail(event.target.value);
  const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => setPassword(event.target.value);
  const navigate = useNavigate()

  const onSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    setHasError(false);
    const loginResult = await login({ email, password });
    if (!loginResult) setHasError(true);
    else {
      navigate("/", { replace: true })
    }
  };

  return (
    <Container>
      <Card className="mt-5">
        <Card.Header as="h1">Login</Card.Header>
        <Card.Body>
          <Form className="w-100" onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={onEmailChange}
                value={email}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={onPasswordChange}
                value={password}
              />
            </Form.Group>
            {hasError && (
              <Alert variant={"danger"}>
                The email address and password you entered don't match any
                account. Please try again.
              </Alert>
            )}
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Form.Text className="text-muted">
              You don't have an account?
              <Link to="/register"> sign up</Link>
            </Form.Text>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;