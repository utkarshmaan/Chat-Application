import React from 'react'
import logo  from '../images/form-animation.jpg'
import Add from '../images/addAvatar.png'
import {auth, storage,db} from '../firebase'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc,setDoc} from 'firebase/firestore';
import { useNavigate,Link } from 'react-router-dom'

const Register = () => {
  const [err,setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const  password = e.target[2].value;
    const file = e.target[3].files[0];
  
    try {
      const res = await createUserWithEmailAndPassword(auth,email,password);

   
const storageRef = ref(storage, displayName);


await uploadBytesResumable(storageRef, file).then(() => {
  getDownloadURL(storageRef).then(async (downloadURL) => {
    try {
      //Update profile
      await updateProfile(res.user, {
        displayName,
        photoURL: downloadURL,
      });
      //create user on firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
      });

      //create empty user chats on firestore
      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");
    } catch (err) {
      console.log(err);
      setErr(true);
      // setLoading(false);
    }
  });
});
} catch (err) {
setErr(true);
// setLoading(false);
}
};
  return (
    <div className='formContainer'>
    <div className='formWrapper'>
    <img className='logo' src={logo} alt=''/>
    <span className='title'>Register</span>
      <form onSubmit={handleSubmit}>
        <input type="text"  placeholder='display Name'/>
        <input type="email" placeholder='email' />
        <input type="password" placeholder='password'/>
        <input type="file" style={{display:"none"}} id="file"/>
        <label htmlFor='file'>
            <img src={Add} alt='' />
            <span>Add an avatar</span>
        </label>
        <button >Sign Up</button>
        {err && <span>Something went wrong? </span>}
      </form>
      <p>You do have an account? <Link to="/login">Login</Link></p>

    </div>

    </div>
  )
}

export default Register
