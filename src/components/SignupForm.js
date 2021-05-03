import { AiFillFacebook } from 'react-icons/ai';

import
{
  AuthContainer,
  AuthForm,
  AuthError,
  LogoContainer,
  Logo,
  Divider,
  Text,
  Line,
  DisplayText,
  TermsText,
} from '../styles/authForm';
import logo from '../images/eduhub.png';

import InputField from './InputField';
import Button from './Button';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
function SignUp() {
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const emailRef = useRef();
const fullNameRef = useRef();
const passwordRef = useRef();
const { signup } = useAuth();
const history = useHistory();

const handleSignup = (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);
  const email = emailRef.current.value;
  const password = passwordRef.current.value;
  const fullName = fullNameRef.current.value;
  signup(email, password, fullName)
    .then((ref) => {
      setLoading(false);
      history.push('/');
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
};
  return (
    <AuthContainer>
      <LogoContainer>
        <Logo src={logo} alt="logo" />
      </LogoContainer>

      <DisplayText>
        Sign up to start learning
      </DisplayText>

      <Button
        color="#0095F6"
        icon={<AiFillFacebook fontSize="1.1rem" color="#ffffff" />}
        text="Log in with Facebook"
      />

      <Divider>
        <Line />
        <Text>OR</Text>
        <Line />
      </Divider>

      <AuthForm onSubmit={(e) => handleSignup(e)}>
        <InputField
          inputPlaceholder="Mobile Number or Email"
          inputType="email"
          labelText="Mobile Number or Email"
          inputRequired={true}
          inputRef={emailRef}
        />

        <InputField
          inputPlaceholder="Full Name"
          inputType="text"
          labelText="Full Name"
          inputRequired={true}
          inputRef={fullNameRef}
        />

        {/* <InputField
          inputPlaceholder="Username"
          inputType="text"
          labelText="Username"
        /> */}

        <InputField
          inputPlaceholder="Password"
          inputType="password"
          labelText="Password"
          inputRequired={true}
          inputRef={passwordRef}
        />

        <Button 
         disabled={loading}
         type="submit"  
         color="#0095F6" 
         text="Sign up" />
{error && <AuthError>{error}</AuthError>}
      </AuthForm>

      <TermsText>
        By signing up, you agree to our Terms , Data Policy and Cookies Policy .
      </TermsText>
    </AuthContainer>
  );
}

export default SignUp;
