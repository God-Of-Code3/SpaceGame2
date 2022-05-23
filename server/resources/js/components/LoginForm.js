import React from 'react';
import Container from './Container';
import Form from './form/Form';
import Btn from './form/Btn';
import Input from './form/Input';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../api/Client';

const LoginForm = () => {

    const nav = useNavigate();
    const handle = r => {
        if (r.status == "OK") {

            nav("/home");
        }
    }

    return (
        <Container>
            <h1>Login</h1>
            <div className="bg-dark text-light p-4 rounded mt-5">
                <Form action={"/api/login"} callback={handle}>
                    <Input name={"email"} label={"Email:"}></Input>
                    <Input name={"password"} label={"Password:"} type={"password"}></Input>
                    <Btn>Login</Btn>
                </Form>
            </div>
        </Container>
    );
};

export default LoginForm;