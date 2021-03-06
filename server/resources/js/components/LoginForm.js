import React from 'react';
import Container from './Container';
import Form from './form/Form';
import Btn from './form/Btn';
import Input from './form/Input';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { authContext } from './App';
import Block from './Block';

const LoginForm = () => {

    const {setAuth} = useContext(authContext);

    const nav = useNavigate();
    const handle = r => {
        if (r.status == "OK") {
            
            setAuth(r.content.user.role.level);
            nav("/");
        }
    }

    return (
        <Container>
            <h1>Login</h1>
            <Block>
                <Form action={"/api/login"} callback={handle}>
                    <Input name={"email"} label={"Email:"}></Input>
                    <Input name={"password"} label={"Password:"} type={"password"}></Input>
                    <Btn>Login</Btn>
                </Form>
            </Block>
        </Container>
    );
};

export default LoginForm;