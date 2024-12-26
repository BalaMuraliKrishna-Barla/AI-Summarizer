const axios = require("axios");
const summarizeText = async (text) => {
    
    let data = JSON.stringify({
      inputs: text, 
      parameters: {
        max_length: 100,
        min_length: 30,
      },
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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",
      },
      data: data,
    };

    try {
        const res = await axios.request(config);
        return res.data[0].summary_text;
        
    } catch (error) {
        console.log("err: ",error.message);
    }
};

module.exports = summarizeText;





