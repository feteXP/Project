const express = require("express");

const app = express();

app.get("/fetch", async (req,res) => {
    const uri = req.query.url;

    if (!uri) {
        return res.status(400).json({error: "Missing URL query. Please add the URL to the query."})
    }
    
    try {
        const response = await fetch(uri);
        const data = response.text;
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.listen(3000);
