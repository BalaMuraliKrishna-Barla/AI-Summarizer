const express = require("express");
const summarizeText = require("./summarize");
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors()); 
app.use(express.json());
app.use(express.static("public"));


app.post('/summarize', async(req, res) => {
    const text = req.body.text_to_summarize;

    try {
        const response = await summarizeText(text);
        res.send(response);
    } catch (error) {
        console.log(error.message);
    }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
