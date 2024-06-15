import { createContext, useState } from "react";
import run from "../config/gemini";
export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]); //store all input history and display in recent tab
  const [showResult, setShowResult] = useState(false); //hide the cards once user sends something
  const [loading, setLoading] = useState(false); //display loading while chat is coming up with something
  const [resultData, setResultData] = useState(""); //display result on webpage

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (prompt) => {
    setResultData(""); //previous result will be removed
    setLoading(true); //display loading animation on screen
    setShowResult(true);

    let response;
    if (prompt !== undefined) {
      response = await run(prompt); // providing the responde from gemeni.js
      setRecentPrompt(prompt);
    } else {
      setPrevPrompt((prev) => {
        const updatedPrompts = [...prev, input]; // assuming 'input' is the prompt text
        console.log("Updated Prompts:", updatedPrompts); // Debugging
        return updatedPrompts;
      });
      setRecentPrompt(input);
      response = await run(input);
    }

    let responseArray = response.split("**"); //remove * and replace it with bold tag
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>"); //if we get * we replace with <br>
    let newResponseArray = newResponse2.split(" "); //set delay if theres space after like chatgpt style
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false); // hide loading animation
    setInput(""); //reset input field
  };
  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
