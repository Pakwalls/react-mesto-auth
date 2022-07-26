import headerLogo from '../images/header_logo.svg';

function Header() {
  return (
    <header className="header">
      <a href="#">
        <div src={headerLogo} alt="логотип страницы" className="header__logo" />
      </a>
    </header>
  );
}

export default Header;
