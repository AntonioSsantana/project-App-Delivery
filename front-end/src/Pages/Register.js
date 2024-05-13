import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import emailVal from '../Helpers/emailVal';

export default function Register() {
  const [enableButton, setButton] = useState(true);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [name, setname] = useState('');
  const [failedRegister, setfailedRegister] = useState(false);

  useEffect(() => {
    const regex = /^\S+@\S+\.\S+$/;
    const min = 6;
    const twelve = 12;

    if (password.length < min || !regex.test(email)) {
      setButton(true);
    }

    if (name.length >= twelve) {
      setButton(false);
    }
  }, [email, password, name]);

  const history = useHistory();

  const register = async () => {
    const role = 'customer';
    const response = await emailVal({ name, email, password, role });
    const { token } = response;
    if (!response.user) {
      setfailedRegister(true);
    }
    if (response.user.id !== undefined) {
      localStorage.setItem('user', JSON.stringify(
        {
          email: response.email,
          name,
          role: 'customer',
          token },
      ));
      history.push('/customer/products');
    }

    setfailedRegister(true);
  };

  return (
    <div className="registerForm">
      <form className="RegisterFormComponent">
        <label htmlFor="name-input">
          name
          <input
            type="text"
            id="name-input"
            data-testid="common_register__input-name"
            onChange={ (e) => setname(e.target.value) }
          />
        </label>
        <label htmlFor="email-input">
          email
          <input
            type="email"
            id="email-input"
            data-testid="common_register__input-email"
            onChange={ (e) => setemail(e.target.value) }
          />
        </label>
        <label htmlFor="pssword-input">
          senha
          <input
            id="pssword-input"
            type="password"
            data-testid="common_register__input-password"
            onChange={ (e) => setpassword(e.target.value) }
          />
        </label>
        <br />
        <br />
        <button
          type="button"
          data-testid="common_register__button-register"
          onClick={ () => register() }
          disabled={ enableButton }
        >
          Cadastrar
        </button>
        {
          (failedRegister)
            ? (
              <p data-testid="common_register__element-invalid_register">
                {
                  `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                }
              </p>
            )
            : null
        }
      </form>
    </div>
  );
}
