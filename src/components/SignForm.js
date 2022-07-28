function SignForm({title, buttonHolder}) {
  return (
    <div className="sign-form">
      <h2 className="sign-form__title">{title}</h2>
      <input
        type="text"
        className="sign-form__input"
        id="email-field"
        name="name"
        placeholder="Email"
        required />
      <span className="sign-form__error" id="email-field-error"></span>
      <input
        type="password"
        className="sign-form__input"
        id="password-field"
        name="about"
        placeholder="Пароль"
        required />
      <span className="sign-form__error" id="email-field-error"></span>
      <button className="sign-form__button">{buttonHolder}</button>
      <p className="sign-form__question">Уже зарегистрированы? <a className="sign-form__link">Войти</a></p>
    </div>
    
  );
}

export default SignForm;