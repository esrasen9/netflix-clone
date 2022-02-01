import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useStateValue } from '../../Context';
import { auth } from '../../firebase';

function SignUp() {
  const { setOpenSignModal } = useStateValue();

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value,
    )
      .then(() => setOpenSignModal(false))
      .catch((error) => console.log(error.message));
  };

  return (
    <form onSubmit={handleSignIn}>
      <h1>Sign In</h1>
      <input className="sign-input" placeholder="Email address" name="email" type="email" />
      <input className="sign-input" placeholder="Password" name="password" type="password" />
      <button className="sign-button" type="submit">Sign In</button>
    </form>
  );
}

export default SignUp;
