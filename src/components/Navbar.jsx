import React from 'react'

// import homeLogo from '../images/Chatto.png'
import {signOut} from 'firebase/auth'
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className='navbar'>
    {/* <img src={homeLogo}  className='homelogo' /> */}
    <div className='user'>

    <img src={currentUser.photoURL} alt=''></img>
    <span>{currentUser.displayName}</span>
    <button onClick={()=> signOut(auth)}>Logout</button>    {/*this is the signout button to sign out as the user  */ }
    </div>
    </div>
  )
}

export default Navbar