import SignForm from './SignForm.js';
import { withRouter } from 'react-router-dom';

function Login() {
  return (
    <SignForm 
      title={'Вход'}
      buttonHolder={'Войти'}
    />
  );
}

export default withRouter(Login);