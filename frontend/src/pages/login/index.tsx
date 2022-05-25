import React from 'react';
import './style.css';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { useLogin } from '../../providers/login';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { signIn } = useLogin();

  const { register, handleSubmit } = useForm();

  const { ref: mailRef, ...emailField } = register('email');
  const { ref: passwordRef, ...passwordField } = register('password');

  return (
    <Container className="loginContainer">
      <Row className="w-100 center">
        <Col
          xs={{ offset: 1, size: 10 }}
          sm={{ offset: 2, size: 8 }}
          md={{ offset: 3, size: 6 }}
          lg={{ offset: 4, size: 4 }}
        >
          <Form
            onSubmit={handleSubmit(signIn)}
            className="loginForm p-3 rounded"
          >
            <h1 className="text-center">Login</h1>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email here"
                type="email"
                innerRef={mailRef}
                {...emailField}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password here"
                type="password"
                innerRef={passwordRef}
                {...passwordField}
              />
            </FormGroup>
            <Button className="btn w-100 btn-md btn-dark " type="submit">
              Access
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
