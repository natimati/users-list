import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { register } from "../../api";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const onNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => setName(event.target.value);
    const onEmailChange: React.ChangeEventHandler<HTMLInputElement> = (event) => setEmail(event.target.value);
    const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => setPassword(event.target.value);


    const onSubmit: React.FormEventHandler = async (event) => {
        event.preventDefault();
        try {
            await register({ name, email, password });

            return navigate("/login");
        } catch (e) {
            console.log(e)
        }
    };
    return (
        <Container>
            <Card className="mt-5">
                <Card.Header as="h1">Register</Card.Header>
                <Card.Body>
                    <Form className="w-100" onSubmit={onSubmit}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                onChange={onNameChange}
                                value={name}
                            />
                        </Form.Group>
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
                        <Button variant="primary" type="submit" >
                            Register
                        </Button>
                        <Form.Text className="text-muted">
                            You have an account?
                            <Link to="/login"> sign in</Link>
                        </Form.Text>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
export default Register;