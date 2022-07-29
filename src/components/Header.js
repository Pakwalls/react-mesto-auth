import { Link, useHistory } from 'react-router-dom';
import headerLogo from '../images/header_logo.svg';


function Header({isLoggedIn, email}) {
  const history = useHistory();
  const currentLocation = history.location.pathname;

  function handleLogOut() {

  }
  
  return (
    <header className="header">
      <a href="#">
        <img src={headerLogo} alt="логотип страницы" className="header__logo" />
      </a>
      <div className="header__container">
        <p className="header__email">{email}</p>
        {currentLocation === "/sign-in" && <Link to="sign-up" className="header__page-link hover-animated">Регистрация</Link>}
        {currentLocation === "/sign-up" && <Link to="sign-in" className="header__page-link hover-animated">Войти</Link>}
        {isLoggedIn && <button onClick={handleLogOut} className="header__exit-btn">Выйти</button>}
      </div>
    </header>
  );
}

export default Header;
