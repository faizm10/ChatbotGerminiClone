import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context); //display result on main component which is in this file
let ent;
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {/* the below code means once the user enters input, the cards and the greeting section will be gone. isnt this cool guy!! */}

        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Faiz</span>
              </p>
              <p>How can I assist you today</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road</p>
                <img src={assets.compass_icon} />
              </div>
              <div className="card">
                <p>Beifly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt=''/>
              {/* Same concept below */}
              {loading ? (
                <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                </div>
              ) : 
                <p dangerouslySetInnerHTML={{ __html: resultData }}>
                </p>
              }
            </div>
          </div>
        )}
        {/* End of commet */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Prompt Me"
            />
            <div>
              {/* <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" /> */}
              <img onClick={() => onSent()} key={ent} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Testing Purposes. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};
export default Main;
