import React from "react";
import { api } from "../utils/Api";
import { auth } from "../utils/Auth";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { Route, Switch, useHistory } from 'react-router-dom';

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";


function App() {
    const history = useHistory();
    const token = localStorage.getItem('jwt');

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [authorizationEmail, setAuthorizationEmail] = React.useState(null);
    const [isSuccessSignUp, setIsSuccessSignUp] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
    const [currentUser, setCurrentUser] = React.useState({name: '', about: ''});


    React.useEffect(() => {
        function getInfo() {
            if (token) {
                api
                    .getUserInfo()
                    .then((res) => {
                        setCurrentUser({name: res.user.name, about: res.user.about, avatar: res.user.avatar, _id: res.user._id});
                        console.log('useEffect getUserInfo СРАБОТАЛ, res = ', res);
                    })
                    .catch((err) => console.log(err));
            }
        }
        if (loggedIn === true) {getInfo();}
    }, [loggedIn]);


    React.useEffect(() => {
        function getInitialCards() {
            if (token) {
                api
                    .getCardList()
                    .then((data) => {
                        setCards(data);
                    })
                    .catch((err) => console.log(err));
            }
        }
        if (loggedIn === true) {getInitialCards();}
    }, [loggedIn]);


    const handleTokenCheck = React.useCallback(() => {
        auth
            .tokenCheck(token)
            .then((data) => {
                setAuthorizationEmail(data.user.email);
                setLoggedIn(true);
                history.push('/');
                console.log('handleTokenCheck СРАБОТАЛ');
            })
            .catch((err) => console.log(err));
        },[history]
    )


    React.useEffect(() => {
        if (token) {
            handleTokenCheck();
        }
    }, [handleTokenCheck])


    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleInfoTooltipPopupOpen() {
        setIsInfoTooltipOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({name: '', link: ''});
        setIsInfoTooltipOpen(false);
    }


    function handleUpdateUser({name, about}) {
        api
            .setUserInfo({name, about})
            .then((res) => {
                setCurrentUser(res.user);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar({avatar}) {
        api
            .setUserAvatar({avatar})
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit({name, link}) {
        api
            .postCard({name, link})
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i === currentUser._id);
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        api
            .deleteCard(card._id)
            .then(() => {
                setCards((state) =>
                    state.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(err));
    }

    function handleRegistration(data) {
        auth
            .register(data)
            .then((data) => {
                setIsSuccessSignUp(true);
                handleInfoTooltipPopupOpen();
                history.push('/sign-in')
            })
            .catch((err) => {
                console.log(err);
                setIsSuccessSignUp(false);
                handleInfoTooltipPopupOpen();
            });
    }

    function handleAuthorization(data) {
        auth
            .authorize(data)
            .then((data) => {
                setLoggedIn(true);
                localStorage.setItem('jwt', data.token);
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
                setIsSuccessSignUp(false);
                handleInfoTooltipPopupOpen();
            });
    }

    function handleLogOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setAuthorizationEmail(null);
        history.push('/sign-in');
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="content">
                    <Header loggedIn={loggedIn}
                            onLogOut={handleLogOut}
                            authorizationEmail={authorizationEmail} />

                    <Switch>
                        <Route path="/sign-up">
                            <Register onRegistration={handleRegistration} />
                        </Route>

                        <Route path="/sign-in">
                            <Login onAuthorization={handleAuthorization} />
                        </Route>

                        <ProtectedRoute path="/"
                                        component={Main}
                                        loggedIn={loggedIn}
                                        onEditProfile={handleEditProfileClick}
                                        onEditAvatar={handleEditAvatarClick}
                                        onAddPlace={handleAddPlaceClick}
                                        onCardClick={handleCardClick}
                                        onCardLike={handleCardLike}
                                        onCardDelete={handleCardDelete}
                                        cards={cards} />
                    </Switch>

                    <Footer />

                    <EditProfilePopup isOpen={isEditProfilePopupOpen}
                                      onClose={closeAllPopups}
                                      onUpdateUser={handleUpdateUser} />

                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                                     onClose={closeAllPopups}
                                     onUpdateAvatar={handleUpdateAvatar} />

                    <AddPlacePopup isOpen={isAddPlacePopupOpen}
                                   onClose={closeAllPopups}
                                   onAddPlace={handleAddPlaceSubmit} />

                    <InfoTooltip isOpen={isInfoTooltipOpen}
                                 onClose={closeAllPopups}
                                 isSuccess={isSuccessSignUp} />

                    <ImagePopup card={selectedCard}
                                onClose={closeAllPopups} />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
