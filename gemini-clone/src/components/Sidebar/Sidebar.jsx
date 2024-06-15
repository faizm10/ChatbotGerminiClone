import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

export const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt } = useContext(Context);
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt); // Update recent prompt in the context
    await onSent(prompt); // Send the selected prompt
  };
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu"
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="New Chat" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended 
          ?<div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item,index)=>{
              return(
                <div onClick={()=> loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0,18)}...</p>
                </div>
              )
            })}
            
          </div>
         : null
      }
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};
