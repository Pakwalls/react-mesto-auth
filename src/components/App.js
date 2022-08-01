import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import ConfirmPopup from './ConfirmPopup.js';
import ImagePopup from './ImagePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import { register, authorize, getUserData } from '../utils/auth.js';

function App() {
  // -------------------------------------------------------------------------------------------------------------------------- переменная стейта авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // -------------------------------------------------------------------------------------------------------------------------- переменная стейта авторизации
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({name:'', about:''});
  const [cards, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  const history = useHistory();
  
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isInfoToolTipOpen

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
  
  useEffect(() => {
    tokenCheck();
  },[])


  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      getUserData(jwt)
      .then(({ email }) => {
        setUserEmail(email);
        setIsLoggedIn(true);
        history.push('/');
      })
    } 
  }

  const handleAuthorization = (data) => {
    return authorize(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        history.push('/');
      })
      .catch((err) => console.log(err));
  }

  const handleRegistration = (data) => {
    return register(data)
      .then(() => {
        history.push('/sign-in');
      })
      .catch((err) => console.log(err));
  }

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

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
    setIsInfoToolTipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
          isLoggedIn={isLoggedIn}
          email={userEmail}
          onLogout={handleLogOut}
        />
        <Switch>
          <ProtectedRoute 
            exact
            path="/"
            component={Main}
            loggedIn={isLoggedIn}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}>
          </ProtectedRoute>

          <Route path="/sign-up">
            <Register
              onRegister={handleRegistration}
            />
          </Route>

          <Route path="/sign-in">
            <Login
              onLogin={handleAuthorization}
            />
          </Route>
        </Switch>
        <Footer />
        
        <InfoTooltip 
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopup}
          isConfirmed={true}
        />

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

export default withRouter(App);
