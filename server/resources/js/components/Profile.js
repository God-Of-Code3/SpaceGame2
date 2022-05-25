import React, {useEffect, useState} from 'react';
import Container from './Container';
import request from '../api/Request';
import Block from './Block';

const Profile = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        request("/api/user", {}, r => {
            if (r.message) {
                setUser({
                    name: "Unauthorized",
                    email: "----"
                })
            } else {
                setUser(r);
            }
        }, "GET");
    }, []);

    return (
        <Container>
            <h3>Profile</h3>
            <Block>
                {
                    user ? 

                        <div className="">
                            <h1>{user.name}</h1>
                            <p className="text-muted mt-2">{user.email}</p>
                        </div>
                        
                    : null
                }
            </Block>
                
        </Container>
    );
};

export default Profile;