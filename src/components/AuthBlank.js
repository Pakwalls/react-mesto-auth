function AuthBlank({title, buttonHolder, children}) {
  return (
    <div className="blank__container">
      <h2 className="blank__title">{title}</h2>
      <input
        type="text"
        className="blank__input"
        id="email-field"
        name="name"
        placeholder="Email"
        required />
      <span className="blank__error" id="email-field-error"></span>
      <input
        type="text"
        className="blank__input"
        id="password-field"
        name="about"
        placeholder="Пароль"
        required />
      <span className="blank__error" id="email-field-error"></span>
      <button>{buttonHolder}</button>
      {children}
    </div>
    
  );
}

export default AuthBlank;