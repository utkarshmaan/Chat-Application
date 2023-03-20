import { onAuthStateChanged } from "firebase/auth";
import { useEffect,useState } from "react";
import { createContext } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{

    const [currentUser,setCurrentUser] = useState({});

    useEffect(()=>{

       const unsub =  onAuthStateChanged(auth,(user)=>{  //it check if there is a user or not(logged in)

            setCurrentUser(user);
            console.log(user);

        });
        return () =>{    //this is a function to stop the memory leaking
            unsub();
        };
    },[]);

    return (

    <AuthContext.Provider value={{currentUser}} >
        {children}
    </AuthContext.Provider>

    );


};
