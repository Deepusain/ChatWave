import React, { useState, useEffect, useRef} from "react";
import axios from "../utils/axiosInstance";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { getMessageRoute, sendMessageRoute } from "../utils/APIroute";
import { v4 as uuidv4 } from "uuid";
import {IoPersonCircle} from "react-icons/io5"

import "react-toastify/dist/ReactToastify.css";


export default function ChatContainer(props) {
    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);
    const [incoming, setIncoming] = useState(null);

    const getAllMessages = async()=>{
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
       
        const res = await axios.post(getMessageRoute,{
            from : user._id,
            to : props.currentChat._id
        })
        setMessages(res.data);
    }
    
    useEffect(()=>{
        if(props.currentChat){
            // clear old messages first so switching contacts doesn't
            // briefly show the previous conversation's messages
            setMessages([]);
            getAllMessages();
        }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.currentChat])


    const handleSend = async(msg) =>{
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));

        await axios.post(sendMessageRoute,{
            from : user._id,
            to : props.currentChat._id,
            message : msg
        });
        props.socket.current.emit("send-msg",{
            to : props.currentChat._id,
            from : user._id,
            message : msg
        });

        props.socket.current.emit("send-notification",{
            to : props.currentChat._id,
            from : user._id,
            message : msg
        });

        const updatedMessages = [...messages];
        updatedMessages.push({fromSelf : true, message : msg});
        setMessages(updatedMessages)
    }

    useEffect(()=>{
        if(props.socket.current){
            const handler = (data)=>{
                // only show the message if it belongs to the chat
                // that's currently open, otherwise it leaks into the
                // wrong conversation
                if(props.currentChat && data.from === props.currentChat._id){
                    setIncoming({fromSelf : false, message: data.message})
                }
            };
            props.socket.current.on("msg-recieve", handler);
            return () => {
                props.socket.current.off("msg-recieve", handler);
            };
        }
    },[props.currentChat, props.socket]);

    useEffect(()=>{
        incoming && (setMessages((prev) => [...prev, incoming]));
    },[incoming]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
      <>        
        <Container>
            <div className="chat-header">
                <div className="user-details">
                <div className="avatar">
                  {
                     props.currentChat.avatarImage ? 
                    (<img src={props.currentChat.avatarImage} alt=""/>) : 
                    (<IoPersonCircle/>)
                  }
                </div>
                <div className="username">
                    <h3>{props.currentChat.username}</h3>
                </div>
                </div>
            </div>
            <div className="chat-messages">
                {
                    messages.map((message)=>{
                        return(
                            <div ref={scrollRef} key={uuidv4()}>
                                <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <ChatInput sendMessage={handleSend}/>
        </Container>
        {/* <ToastContainer/> */}
      </>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 10% 75% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem 0 1rem;
    background-color :#075e54;
    border-left-width: medium
    border-color : white;
    .user-details {
      display: flex;
      align-items: center;
      height : 0.5rem;
      .avatar {
        img {
          height: 3rem;
          width : 3rem;
          border-radius : 3rem;
        }
        svg {
          color : #A0A0A0;
          font-size: 3rem;
          cursor: pointer;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    color : black;
    background-color : #ece5dd;
    &::-webkit-scrollbar {
      margin-top: 10px;
      margin-bottom: 10px;
      width: 0.2rem;
     
      &-thumb {
        background-color: grey;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: inline-block;
      align-items: center;
      height : 100%;
      border-radius : 0.8rem;
      padding : 0.6rem 0.9rem;
      box-shadow: 0 1px 2px rgba(0,0,0,0.15);
      p {
        overflow-wrap: break-word;
        font-size: 1rem;
        color: #222;
      }
    }
    .sended {
      float : right;
      justify-content: flex-end;
      background-color: #dcf8c6;
      max-width : 60%;
      border-bottom-right-radius: 0.2rem;
    }
    .recieved {
      justify-content: flex-start;
      max-width : 60%;
      background-color: #ffffff;
      border-bottom-left-radius: 0.2rem;
    }
  }
`;
