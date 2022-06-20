import React from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }


    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);


    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: name,
            link: link
        });
    }


    return (
        <PopupWithForm name="add-card"
                       title="Новое место"
                       buttonText="Создать"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}>
            <input className="popup__text popup__text_input_name-place"
                   type="text"
                   name="AddNamePlace"
                   placeholder="Название"
                   minLength="2"
                   maxLength="30"
                   value={name}
                   onChange={handleChangeName}
                   required />
            <span className="popup__form-error new-place-error">Вы пропустили это поле.</span>
            <input className="popup__text popup__text_input_link"
                   type="url"
                   name="AddLinkPlace"
                   placeholder="Ссылка на картинку"
                   value={link}
                   onChange={handleChangeLink}
                   required />
            <span className="popup__form-error new-link-error">Введите адрес сайта.</span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
