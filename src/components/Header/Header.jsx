import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../../redux/authSlice';
import "./Header.css"
const Header = () => {
    const { auth } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(logoutSuccess());
        localStorage.removeItem('auth');
        navigate("/signin");

    }
    return (
        <div>
            <nav className='header'>
                <div className="header__logo">
                    <h3>Project Manager Tools</h3>
                </div>
                <div className="header__buttons">
                    {auth.currentUser && auth.currentUser.token ? (
                        <Link to='/signin' className='button' onClick={handleSubmit}>SignOut</Link>
                    ) : (
                        <>
                            <Link to='/signin' className='button'>SignIn</Link>
                            <Link to='/signup' className='button'>SignUp</Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Header
