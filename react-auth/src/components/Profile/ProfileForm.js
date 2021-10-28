import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react'
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {

  const authCtx = useContext(AuthContext);
  const newPasswordInputRef = useRef(null);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredPassword = newPasswordInputRef.current.value;
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCm0MjXZJojw8nKW0sQYAQcSp2h2sBylXc", {
      method: 'Post',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredPassword,
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
    }).then((data) => {

      alert("passowrd changed successfully");

    }).catch((err) => {
      alert(err.message);
    });
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
