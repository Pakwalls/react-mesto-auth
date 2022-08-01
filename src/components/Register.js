import SignForm from './SignForm.js'
import { Link, withRouter } from 'react-router-dom';
import { useState } from 'react';


function Register({ onRegister }) {
  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister(registrationData)
  }

  return (
    <SignForm 
      title={'Регистрация'}
      buttonHolder={'Зарегистрироваться'}
      question={<p className="sign-form__question">Уже зарегистрированы? <Link to="/sign-in" className="sign-form__link hover-animated">Войти</Link></p>}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      data={registrationData}
    />
  );
}

export default withRouter(Register);