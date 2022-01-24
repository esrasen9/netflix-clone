import React, { useState } from 'react';
import { useStateValue } from '../../Context';

function SignForm() {
  const {
    handleSignUp, handleSignIn, username, setUsername,
  } = useStateValue();
  const [isSignUp, setIsSignUp] = useState(true);
  return (
    <div className="sign-form-container">
      <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="sign-form">
        {
            isSignUp ? <h1>Sign Up</h1> : <h1>Sign In</h1>
        }
        {
            isSignUp && (
            <input
              className="sign-input"
              placeholder="Username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            )
                }
        <input className="sign-input" placeholder="Email address" name="email" type="email" />
        <input className="sign-input" placeholder="Password" name="password" type="password" />
        {
            isSignUp
              ? (<button className="sign-button" type="submit">Sign Up</button>)
              : (<button className="sign-button" type="submit">Sign In</button>)
        }
        {
          isSignUp
            && (
            <div className="sign-in">
              You are already have an account?
              <button type="submit" className="sign-in-button" onClick={() => setIsSignUp(false)}>Sign In</button>
            </div>
            )
        }
      </form>
    </div>
  );
}

export default SignForm;
