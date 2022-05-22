import Canvas from "../components/canvas/Canvas";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Home from "../components/Home";

export const routes = [
    {path: '', element: Welcome, exact: true, label: 'Welcome', show: true},
    {path: '/home', element: Home, exact: true, label: 'Home', show: true},
    {path: '/contacts', element: Contacts, exact: true, label: 'Contacts', show: true},
    {path: '/canvas', element: Canvas, exact: true, label: 'Canvas', show: true},
    {path: '/login', element: LoginForm, exact: true, label: 'Login', show: true},
    {path: '/register', element: RegisterForm, exact: true, label: 'Register', show: true},
];