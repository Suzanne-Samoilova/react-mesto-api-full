import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../context/CurrentUserContext";


function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);


    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }


    return (
        <PopupWithForm name="EditProfile"
                       title="Редактировать профиль"
                       buttonText="Сохранить"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}>
            <input className="popup__text popup__text_input_name"
                   type="text"
                   name="EditName"
                   placeholder="Имя"
                   minLength="2" maxLength="40"
                   value={name}
                   onChange={handleChangeName}
                   required />
            <span className="popup__form-error profile-name-error">Вы пропустили это поле.</span>
            <input className="popup__text popup__text_input_info"
                   type="text"
                   name="EditInfo"
                   placeholder="О себе"
                   minLength="2" maxLength="200"
                   value={description}
                   onChange={handleChangeDescription}
                   required />
            <span className="popup__form-error profile-info-error">Вы пропустили это поле.</span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
