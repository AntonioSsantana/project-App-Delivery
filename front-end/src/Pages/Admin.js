import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiPostGeneric from '../Helpers/apiPostGeneric';
import NavBarAdmin from '../Components/navBarAdmin';
import emailVal from '../Helpers/emailVal';

export default function Admin() {
  const [enableButton, setButton] = useState(true);
  const [userName, setuserName] = useState('');
  const [isLoading, setisLoading] = useState(true);
  const [isLogged, setisLogged] = useState(true);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [failedRegister, setfailedRegister] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validEmail = regexEmail.test(newEmail);
    const minPassword = 6;
    const doze = 12;
    const validPassword = newPassword.length >= minPassword;
    const finalValidation = validEmail && validPassword;

    if (newPassword.length < minPassword || newName.length < doze || !finalValidation) {
      setButton(true);
    }
    if (finalValidation && newName.length >= doze) {
      setButton(false);
    }

    setisLoading(false);
    const validateUsers = async () => {
      if (JSON.parse(localStorage.getItem('user')) !== null) {
        const { token, name } = JSON.parse(localStorage.getItem('user'));
        const response = await apiPostGeneric('validateUsers', { token });
        setisLogged(false);
        setuserName(name);
        if (!response) {
          history.push('/login');
        }
      }
    };
    validateUsers();
  }, [setisLogged, history, isLogged, newEmail, newPassword, newName]);

  const handleRole = (event) => {
    setRole(event.target.value);
  };

  // const cleanInputs = () => {
  //   setNewName('');
  //   setNewEmail('');
  //   setNewPassword('');
  //   setRole('seller');
  // };

  const register = async () => {
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    console.log(userLocalStorage);
    console.log('local storage de user');
    if (!userLocalStorage.token) { return 'token is required'; }

    const response = await emailVal(
      { name: newName,
        email: newEmail,
        password: newPassword,
        role,
        token: userLocalStorage.token },
    );
    const { token } = response;
    if (!response.user) {
      setfailedRegister(true);
    }
    if (response.user.id !== undefined) {
      localStorage.setItem('user', JSON.stringify(
        {
          email: response.email,
          nome: newName,
          role,
          token },
      ));
      // cleanInputs();
    }
  };

  return (
    <>
      <NavBarAdmin nome={ userName } />
      <div>
        <h3>Cadastrar novo usuário</h3>
        {
          isLoading ? (
            <h1>is loading..</h1>
          )
            : (
              <form className="RegisterAdminFormComponent">
                <label htmlFor="name-input">
                  name
                  <input
                    type="text"
                    id="name-input"
                    data-testid="admin_manage__input-name"
                    value={ newName }
                    onChange={ (e) => setNewName(e.target.value) }
                  />
                </label>
                <label htmlFor="email-input">
                  email
                  <input
                    type="email"
                    id="email-input"
                    data-testid="admin_manage__input-email"
                    value={ newEmail }
                    onChange={ (e) => setNewEmail(e.target.value) }
                  />
                </label>
                <label htmlFor="pssword-input">
                  senha
                  <input
                    id="pssword-input"
                    type="password"
                    data-testid="admin_manage__input-password"
                    value={ newPassword }
                    onChange={ (e) => setNewPassword(e.target.value) }
                  />
                </label>
                <label htmlFor="type-input">
                  <select
                    data-testid="admin_manage__select-role"
                    value={ role }
                    onChange={ handleRole }
                  >
                    <option value="seller">seller</option>
                    <option value="customer">customer</option>
                    <option value="administrator">administrator</option>
                  </select>
                </label>
                <br />
                <br />
                <button
                  type="button"
                  data-testid="admin_manage__button-register"
                  onClick={ () => register() }
                  disabled={ enableButton }
                >
                  Cadastrar
                </button>
              </form>
            )
        }
        {
          (failedRegister)
            ? (
              <p data-testid="admin_manage__element-invalid-register">
                {
                  `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                }
              </p>
            )
            : null
        }
      </div>

    </>
  );
}
