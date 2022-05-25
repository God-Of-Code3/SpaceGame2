import React from 'react';
import Container from './Container';
import Form from './form/Form';
import Input from './form/Input';
import Btn from './form/Btn';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { authContext } from './App';
import Block from './Block';

const RegisterForm = () => {
    const nav = useNavigate();
    const {setAuth} = useContext(authContext);

    const handle = r => {
        if (r.status == "OK") {
            setAuth(r.content.user.role.level);
            nav("/");
        }
    }

    return (
        <Container>
            <h1>Registration</h1>
            <Block>
                <Form action={"/api/register"} callback={handle}>
                    <Input name={"name"} label={"Name:"}></Input>
                    <Input name={"email"} label={"Email:"}></Input>
                    <Input name={"password"} label={"Password:"} type={"password"}></Input>
                    <Btn>Register</Btn>
                </Form>
            </Block>
        </Container>
    );
};

export default RegisterForm;