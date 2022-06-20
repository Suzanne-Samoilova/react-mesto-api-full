import React from "react";
import { Link } from "react-router-dom";

const Sign = (props) => {
    return (
        <div className="sign">
            <h1 className="sign__title">{props.title}</h1>
            <form className="sign__form"
                  onSubmit={props.onSubmit} >

                {props.children}

                <button className="popup__button-save sign__button"
                        type="submit">
                    {props.buttonText}
                </button>

                {props.linkLogin &&
                    <p className="sign__text">
                        Уже зарегистрированы? <Link className="sign__link" to="/sign-in">Войти</Link>
                    </p>
                }
            </form>
        </div>
    )
}

export default Sign;
