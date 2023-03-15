import { config } from "./config.js";
import fetch from 'node-fetch';

let apiKey = config.openai_api_key;
let model = config.model;
const sendMessage = async (message: string) => {
  try {
    // var fetch = require('whatwg-fetch')
    console.log("start");
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            "role": "user",
            "content": message
          }
        ],
        temperature: 0.6
      }),
    });
    console.log("end");
    return response.json()
      .then((data: any) => data.choices[0].message.content);
  } catch (e) {
    console.error(e)
    return "Something went wrong"
  }
}

export { sendMessage };