function SignForm({title, buttonHolder, question}) {
  return (
    <div className="sign-form">
      <h2 className="sign-form__title">{title}</h2>
      <input
        type="text"
        className="input input_theme_night"
        id="email-field"
        name="name"
        placeholder="Email"
        required />
      <span className="sign-form__error" id="email-field-error"></span>
      <input
        type="password"
        className="input input_theme_night"
        id="password-field"
        name="about"
        placeholder="Пароль"
        required />
      <span className="sign-form__error" id="email-field-error"></span>
      <button className="sign-form__button hover-animated">{buttonHolder}</button>
      {question}
    </div>
  );
}

export default SignForm;