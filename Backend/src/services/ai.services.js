const  { GoogleGenAI } = require("@google/genai");
const  { _config } =require( "../config/config.js");

const ai = new GoogleGenAI({ apiKey: _config.GEMINI_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "write a function to add to number",
    config:{
      systemInstruction : "you are an experienced software engineer with expert in mern stack you are developing web application from 7 years, you write code in such a way that no error will be their in production . it is easy to understand "

    }
  });
  console.log(response.text);
}

 main();