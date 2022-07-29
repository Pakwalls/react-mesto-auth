import SignForm from './SignForm.js'
import { Link } from 'react-router-dom';

function Register() {
  return (
    <SignForm 
      title={'Регистрация'}
      buttonHolder={'Зарегистрироваться'}
      question={<p className="sign-form__question">Уже зарегистрированы? <Link to="/sign-in" className="sign-form__link hover-animated">Войти</Link></p>}
    />
  );
}

export default Register;