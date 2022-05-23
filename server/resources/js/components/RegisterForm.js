import React from 'react';
import Container from './Container';
import Form from './form/Form';
import Input from './form/Input';
import Btn from './form/Btn';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const nav = useNavigate();
    const handle = r => {
        if (r.status == "OK") {

            nav("/home");
        }
    }

    return (
        <Container>
            <h1>Registration</h1>
            <div className="bg-dark text-light p-4 rounded mt-5">
                <Form action={"/api/register"} callback={handle}>
                    <Input name={"name"} label={"Name:"}></Input>
                    <Input name={"email"} label={"Email:"}></Input>
                    <Input name={"password"} label={"Password:"} type={"password"}></Input>
                    <Btn>Register</Btn>
                </Form>
            </div>
        </Container>
    );
};

export default RegisterForm;