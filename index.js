const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const OpenAi = require("openai")
const port = 5000

const app = express()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

const openai = new OpenAi({
    apikey:process.env.OPENAI_API_KEY,
})

app.post("/api/chat" , async (req , res)=> {
    try {
       const {message} = req.body
    //    console.log(req.body)
       const completion = await openai.chat.completions.create({
        model:"gpt-4o-mini",
        messages:[{role:"user" , content:message}],
       });
       res.json({reply:completion.choices[0].message.content})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

app.listen(port , ()=>{
    console.log(`server running on http://localhost:${port}`)
})

app.get("/" , (req , res)=>{
    res.send("Server Running Successfully")
})


