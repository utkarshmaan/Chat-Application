import React, { useContext } from 'react'
import { useState } from 'react'
import {db} from "../firebase"
import { collection,doc,getDoc,getDocs,query,serverTimestamp,setDoc,updateDoc,where } from 'firebase/firestore'
import {AuthContext} from '../Context/AuthContext'


const Search = () => {
  const [username,setUsername] = useState("");
  const [user,setUser] = useState(null); //because there is no user in the first place
  const [err,setErr] = useState(false);  //In the starting there is not errors
  const {currentUser} = useContext(AuthContext)
  const handleSearch = async()=>{
// here we are going to add the firebase queries to find the user
 const q = query(
  collection(db,"users"),
  where("displayName","==",username)  //this is the query to find the displayName same as the search

 );


 try {
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc)=>{     //this is to get the doc from the users db
    setUser(doc.data())
  });
 } catch (err) {
  setErr(true);
  
 }


  }
  const handleKey = (e)=>{
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async() =>{
    // check whether the group(chats in firestore) exist, if not create
    const combinedId = currentUser.uid>user.uid? 
    currentUser.uid+user.uid         //this is to load the chats of the user that is 
    : user.uid+currentUser.uid      //selected from the search pannel and the currentUser
    

    try {
      const res = await getDoc(doc(db,"chats",combinedId))

      if(!res.exists()){     //If initialy there is not chats between the user and the currentUser & exists() is a firebase function   

        // create a chat in the chats collection
        await setDoc(doc(db,"chats",combinedId),{messages:[]}); //created a chat collection between the user and currentUser


        // create user chats
        await updateDoc(doc(db,"userChats", currentUser.uid),{
          [combinedId+".userInfo"]:{   //this is a way to write the string and value combined
            uid:user.uid,
            displayName: user.displayName,
            photoURL:user.photoURL,
          },
          [combinedId+".date"]: serverTimestamp(),


        });
        await updateDoc(doc(db,"userChats", user.uid),{
          [combinedId+".userInfo"]:{   //this is a way to write the string and value combined
            uid:currentUser.uid,
            displayName: currentUser.displayName,
            photoURL:currentUser.photoURL,
          },
          [combinedId+".date"]: serverTimestamp(),


        });

      }
      
    } catch (error) {}

    setUser(null)
    setUsername("")


  }


  return (
    <div className='search'>
    <div className='searchForm'>
    <input type='text' placeholder='Find user' onKeyDown={handleKey} 
    onChange={e=>setUsername(e.target.value)} value={username} />  {/*here the onDownKey is a function to handle the keyboard event */}
    </div>
    {err && <span>User not found!</span>}

   {user && <div className='userChat' onClick={handleSelect}>
    <img src={user.photoURL} alt='' />
    <div className='userChatInfo'>
      <span>
        {user.displayName}
      </span>
    </div>
    </div>}
    </div>
  )
}

export default Search