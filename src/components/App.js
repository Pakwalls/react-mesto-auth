import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import ConfirmPopup from './ConfirmPopup.js';
import ImagePopup from './ImagePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({name:'', about:''});
  const [cards, setCards] = useState([]);

  // -------------------------------------------------------------------------------------------------------------------------- переменная стейта авторизации
  const [loggedIn, setLoggedIn] = useState(true);
  
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.error(err))
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopup();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  useEffect(() => {
    Promise.all([api.fetchCardsList(), api.fetchUserInfo()])
    .then(([cards, user]) => {
      setCards(cards);

      setCurrentUser(user)
    })
    .catch((err) => console.error(err))
  },[])

  function handleUpdateUser(name, description) {
    api.patchUserInfo(name, description)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopup();
      })
      .catch((err) => console.error(err))
  }
  
  function handleUpdateAvatar(avatar){
    api.patchAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopup();
      })
      .catch((err) => console.error(err))
  }

  function handleAddPlaceSubmit(name, link) {
    api.postCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]); 
        closeAllPopup();
      })
      .catch((err) => console.error(err))
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopup() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsImagePopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Switch>
          <Route path="/sign-in">
            <Login
              // onLogin={handleAuthorization}
            />
          </Route>

          <Route path="/sign-up">
            <Register
              // onRegister={handleRegistration}
            />
          </Route>

          <ProtectedRoute 
            path="/main"
            component={Main}
            loggedIn={loggedIn}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}>
          </ProtectedRoute>

          <Route exact path="/">
            {!loggedIn? <Redirect to="/sign-in" />: <Redirect to="/main" />}
          </Route>
        </Switch>
        <Footer />
        
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
        />

        <ConfirmPopup
        />

        <ImagePopup
          selectedCard={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
