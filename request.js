const axios = require('axios');

const apiKey = "AIzaSyAfxlWigF8eiTxcnjcgSDTTa2FmpgfQ8q4";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

const data = {
  contents: [{
    parts: [{ text: "Explain how AI works" }]
  }]
};

axios.post(url, data, {
  headers: { 'Content-Type': 'application/json' }
})
.then(response => {
  // Format the output to display the full response
  console.log("Response:", JSON.stringify(response.data, null, 2));
})
.catch(error => {
  console.error("Error:", error.response ? error.response.data : error.message);
});
