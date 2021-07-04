import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';
import { auth } from '../firebase';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [showSignUp,setShowSignUp]=useState(true)
  const history=useHistory()
  
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  const signOut=()=>{
    auth.signOut()
    setShowSignUp(true)
    history.push('/sign-up')
   
  }

  auth.onAuthStateChanged((user)=>{
    if(user){
      setShowSignUp(false)
    }else{
      setShowSignUp(true)
    }
  })

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            KRYPTOINN  
            <i class='fas fa-coins' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {/* <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li> */}
            {
              showSignUp &&
                  <li className='nav-item'>
                    <Link to='/register' className='nav-links' onClick={closeMobileMenu}>
                      Register
                    </Link>
                  </li>
            }
            {
              !showSignUp &&
                  <li className='nav-item'>
                    <Link to='/converter' className='nav-links' onClick={closeMobileMenu}>
                      Converter
                    </Link>
                  </li>
            }

          {
            showSignUp?
            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
             >
                Sign Up
              </Link>
            </li>:
            <li>
            <button
              className='nav-links-mobile'
              onClick={signOut}
           >
              Sign Out
            </button>
          </li>
          } 
          </ul>
          {
            showSignUp ?( button && <Button buttonStyle='btn--outline'>SIGN UP</Button>
            ):
            (
              button &&<Button buttonStyle='btn--outline' onClick={signOut}>Sign Out</Button>)
          }
         
          
        </div>
      </nav>
    </>
  );
}
export default Navbar;
