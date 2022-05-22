import React from 'react';
import Container from './Container';
import Form from './form/Form';
import Input from './form/Input';
import Btn from './form/Btn';

const RegisterForm = () => {

    return (
        <Container>
            <h1>Registration</h1>
            <div className="bg-dark text-light p-4 rounded mt-5">
                <Form action={"/api/user"} callback={r => console.log(r)}>
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