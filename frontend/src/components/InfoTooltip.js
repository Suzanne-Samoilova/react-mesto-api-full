import signUpSuccessImage from "../images/sign-up-success.svg"
import signUpFailImage from "../images/sign-up-fail.svg"

function InfoTooltip(props) {

    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : null}`}>
            <div className="popup__container">
                <button className="popup__button-close"
                        type="button"
                        aria-label="Закрыть попап"
                        onClick={props.onClose} />
                <img className="popup__icon"
                    src={props.isSuccess ? signUpSuccessImage : signUpFailImage}
                    alt={props.isSuccess ? 'Чёрная галочка' : 'Красный крестик'} />
                <h3 className="popup__title popup__title-auth">
                    {props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h3>
            </div>
        </div>
    )
}

export default InfoTooltip;
