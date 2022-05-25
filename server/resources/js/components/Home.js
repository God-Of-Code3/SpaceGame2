import React, { useEffect, useState } from 'react';
import Container from './Container';

const Home = () => {

    return (
        <Container>
            <div className="row">
                <div className="col-4">
                    <div className="card text-white bg-dark">
                        <div className="card-header">
                            Header 2
                        </div>
                        <div className="card-body">
                            <h2>Welcome to space game</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Home;