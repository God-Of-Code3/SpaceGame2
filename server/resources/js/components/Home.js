import React, { useEffect, useState } from 'react';
import { getToken } from '../api/Client';
import Container from './Container';

const Home = () => {
    const [tk, setTk] = useState("");

    useEffect(() => {
        setTk(getToken());
    }, []);

    return (
        <Container>
            <h1>Token: {tk}</h1> 
        </Container>
    );
};

export default Home;