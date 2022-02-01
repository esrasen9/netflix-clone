import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

function SignForm() {
  const [isSignUp, setIsSignUp] = useState(true);
  return (
    <div className="sign-form-container">
      {isSignUp ? <SignUp setIsSignUp={setIsSignUp} /> : <SignIn />}
    </div>
  );
}

export default SignForm;
