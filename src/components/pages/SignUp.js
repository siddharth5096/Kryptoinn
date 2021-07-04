import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SignUp.css'
import '../../App.css';
import { auth, googleProvider } from '../../firebase';
import googleIcon from '../../images/google-logo-9827.png'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const resetValues = () => {
    setEmail('')
    setPassword('')
  }

  const loginHandler = () => {
    console.log(email, password)
    auth.signInWithEmailAndPassword(email, password).then((response) => {
      console.log(response)

    }).catch(err => {
      alert(err.message)
      console.log(err)
    })
    resetValues()
  }

  const loginWithGoogle=()=>{
    auth.signInWithPopup(googleProvider).then((userCredentials)=>{
      console.log(userCredentials)
    }).catch(err=>{
      alert(err.message)
    })
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      history.push('/coin-page')
    }
  })

  return (
    <div >
      <div className='Login'>
        <div className="sign-in">
          <h1>Login</h1>
          <p>Email</p>
          <input type='email' placeholder='Email' value={email} onChange={(e) => {
            setEmail(e.target.value)
          }} />

          <p>Password</p>
          <input type='password' placeholder='Password'
            value={password} onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <div className='authButtons'>
            <button onClick={loginHandler}>Sign In</button>
            <div className='googleImage' onClick={loginWithGoogle}>
              <img src={googleIcon} alt='' />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}