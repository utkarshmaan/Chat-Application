import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

// const Message = () => {
//   return (
//     <div className='message owner'>
//       <div className="messageInfo">
//         <img src='https://images.pexels.com/photos/13417556/pexels-photo-13417556.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt="" />
//         <span>just now</span>
//       </div>
//       <div className="messageContent">
//         <p>hello</p>
//         <img src="https://images.pexels.com/photos/13417556/pexels-photo-13417556.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />

//       </div>
//     </div>
//   )
// }

export default Message