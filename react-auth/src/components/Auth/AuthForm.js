import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const authCtx=useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = ((event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let url;
    if (isLogin) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCm0MjXZJojw8nKW0sQYAQcSp2h2sBylXc";

    } else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCm0MjXZJojw8nKW0sQYAQcSp2h2sBylXc";
    }
    fetch(url, {
      method: 'Post',
      body: JSON.stringify({
        "email": enteredEmail,
        "password": enteredPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-type': "application/json"
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        return res.json().then((data) => {
          let errorMessage = "Authentication Failed"
          alert(errorMessage);
        });
      }
    }).then((data)=>{
      
      authCtx.login(data.idToken);

    }).catch((err)=>{
      alert(err.message);
    });
  });

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
