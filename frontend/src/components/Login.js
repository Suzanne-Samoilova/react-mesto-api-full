import React from "react";
import Sign from "./Sign";


function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAuthorization({email, password});
        resetForm();
    }


    return (
        <Sign title="Вход"
              buttonText="Войти"
              linkLogin={false}
              onSubmit={handleSubmit} >
            <input className="popup__text sing__input"
                   type="email"
                   name="email"
                   aria-label="электронная почта"
                   placeholder="Email"
                   maxLength="30"
                   required
                   value={email}
                   onChange={handleChangeEmail} />
            <input className="popup__text sing__input"
                   type="password"
                   name="password"
                   aria-label="пароль"
                   placeholder="Пароль"
                   required
                   value={password}
                   onChange={handleChangePassword} />
        </Sign>
    )
}

export default Login;
