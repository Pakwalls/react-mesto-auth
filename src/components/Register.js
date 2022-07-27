import AuthBlank from './AuthBlank.js'

function Register() {
  return (
    <AuthBlank 
      title={'Регистрация'}
      buttonHolder={'Зарегистрироваться'}   
      children={<p className="blank__question">Уже зарегистрированы?<a className="blank__link">Войти</a></p>}
    />
  );
}

export default Register;