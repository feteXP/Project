const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

app.get("/fetch", async (req,res) => {
    const uri = req.query.url;

    if (!uri) {
        return res.status(400).json({error: "Missing URL query. Please add the URL to the query."})
    }
    
    try {
        const response = await fetch(uri);
        const data = await response.text();
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

const limiter = rateLimit({
    windowMs: 10 * 1000,
    max: 5,
    message: {
        error: "Too many requests. Try again later."
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening!")
});

app.use("/fetch", limiter);
