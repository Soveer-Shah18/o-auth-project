const express = require('express')
const app = express();
require('dotenv').config();
const main =  require('./config/db')
const cookieParser =  require('cookie-parser');
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute")
const cors = require('cors')
const passport = require("./config/passport")

app.use(cors({
    origin: ['http://localhost:5173',
       "https://o-auth-project-theta.vercel.app"
    ],
    credentials: true 
}))

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/user',userRouter);
app.use('/auth',authRouter)

const InitializeConnection = async () => {
    try {
        await main(); 
        console.log("DB Connected");

        app.listen(process.env.PORT, () => {
            console.log("Server listening at port number: " + process.env.PORT);
        });

    } catch (err) {
        console.log("Error: " + err);
    }
};

InitializeConnection();