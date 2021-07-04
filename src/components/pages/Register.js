import React, { useState } from 'react'
import './Register.css';
import { auth } from '../../firebase'

function Register() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')

    const passwordMatching=()=>{
        if(password===confirmPassword){
            return true;
        }else{
            alert('Password is not matching')
            return false;
        }
    }
    const resetValues=()=>{
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    const registerHandler=()=>{
        passwordMatching()
        auth.createUserWithEmailAndPassword(email,password).then((response)=>{
            console.log(response)
        }).catch(err=>{
            alert(err.message)
        })
        resetValues()
    }

    return (
      <li className='Register'>
        <div className="login"> 
        <h1>REGISTER </h1>
            <div className="email-container">
                <p>Email</p>
                <input type='email' placeholder='Email' value={email} onChange={(e)=>{
                setEmail(e.target.value)
                }}/>
            
            <div classname="password-container">
                <p>Password</p>
                <input type='password' placeholder='Password' 
                    value={password} onChange={(e)=>{
                    setPassword(e.target.value)
                    }}
                />
            
            <div>
                <p>Confirm Password</p>
                <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>{
                    setConfirmPassword(e.target.value)
                }}/>
            </div>
            </div>
            </div>
            <div className="btn">
            <button onClick={registerHandler}>Register</button>
            </div>
        </div>
        </li>
    )
}

export default Register