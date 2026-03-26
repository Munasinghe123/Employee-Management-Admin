import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:7000/auth/check-token',
                    { withCredentials: true }
                );

                console.log(response.data.accessToken)

                const token = response.data.accessToken;
                const decoded = jwtDecode(token);

                setUser(decoded);

            } catch (error) {
                console.log("Not logged in");
                setUser(null);
            } finally {
                setLoading(false); 
            }
        };

        fetchUser();

    }, []);

    const login = (accessToken) => {
        const decoded = jwtDecode(accessToken);
        console.log(decoded);
        setUser(decoded);
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:7000/auth/logout', {}, { withCredentials: true })
            setUser(null);
            navigate('/');
        } catch (err) {
            console.log(err);
        }

    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout,loading, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;