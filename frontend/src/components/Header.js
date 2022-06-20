import React from 'react';
import logo from "../images/logo_white.svg";
import {NavLink, Route, Switch, useLocation} from "react-router-dom";


function Header(props) {
    const route = useLocation();

    return (
        <header className="header">
            <img className="header__logo"
                 src={logo}
                 alt="Логотип сервиса Место" />

            {props.loggedIn &&
            <div className="header__container">
                <p className="header__email">{props.authorizationEmail}</p>
                <button className="header__button"
                        onClick={props.onLogOut} >
                    Выйти
                </button>
            </div>}

            {!props.loggedIn &&
                <div className="header__container">
                    <nav>
                        <Switch>
                            <Route path="/sign-in">
                                <NavLink className="header__button header__link"
                                         to="/sign-up" >
                                    Регистрация
                                </NavLink>
                            </Route>
                            <Route path="/sign-up">
                                <NavLink className="header__button header__link"
                                         to="/sign-in">
                                    Войти
                                </NavLink>
                            </Route>
                        </Switch>
                    </nav>
                </div>}
        </header>
    );
}

export default Header;
