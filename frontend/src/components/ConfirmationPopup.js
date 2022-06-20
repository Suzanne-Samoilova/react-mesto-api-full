import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup(props) {

    return (
        <PopupWithForm name="popup_confirm"
                       title="Вы уверены?"
                       buttonText="Да"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={props.onSubmit} />
    );
}

export default ConfirmationPopup;
