import React, {FC} from 'react';
import './navbar.css'
import {NavLink} from "react-router-dom";
import {useAuth} from "../../App";


const Navbar:FC = () => {

    const {token, setToken} = useAuth();

    const quit = () => {
        setToken('');
    }

    return (
        <ul className='navbar'>
            <li>
                <NavLink to={'/'} >Main</NavLink>
            </li>

            {token ?
                <li>
                    <a onClick={() => quit()} >Выйти</a >
                </li>
                : ''
            }
        </ul>
    );
};

export default Navbar;