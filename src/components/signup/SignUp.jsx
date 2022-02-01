import React from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useStateValue } from '../../Context';
import { auth } from '../../firebase';

function SignUp({ setIsSignUp }) {
  const {
    username, setOpenSignModal, setUsername,
  } = useStateValue();

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value,
    )
      .then((authUser) => {
        updateProfile(authUser.user, {
          displayName: username,
        }).catch((error) => console.log(error.message));
      })
      .then(() => setOpenSignModal(false))
      .catch((error) => console.log(error.message));
  };

  return (
    <form onSubmit={handleSignUp} className="sign-form">
      <h1>Sign Up</h1>
      <input
        className="sign-input"
        placeholder="Username"
        name="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input className="sign-input" placeholder="Email address" name="email" type="email" />
      <input className="sign-input" placeholder="Password" name="password" type="password" />
      <button className="sign-button" type="submit">Sign Up</button>
      <div className="sign-in">
        You are already have an account?
        <button type="submit" className="sign-in-button" onClick={() => setIsSignUp(false)}>Sign In</button>
      </div>
    </form>
  );
}

export default SignUp;
