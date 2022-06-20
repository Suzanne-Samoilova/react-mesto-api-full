import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }


    return (
        <PopupWithForm name="change-avatar"
                       title="Обновить аватар?"
                       buttonText="Сохранить"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}>
            <input className="popup__text link-avatar"
                   type="url"
                   name="EditAvatar"
                   placeholder="Ссылка на картинку"
                   ref={avatarRef}
                   required />
            <span className="popup__form-error link-avatar-error">Введите адрес сайта.</span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
