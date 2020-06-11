const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const authMiddleware = require('./auth/middleware')

const imageRouter = require('./routers/image');
const userRouter = require('./routers/user');
const authRouter = require('./routers/auth');

const jsonParser = express.json();

app.use(jsonParser);

app.use('/users', userRouter);
app.use("/images", authMiddleware, imageRouter);
app.use('/auth', authRouter);


app.listen(port, () => console.log(`Listening on ${port} port...`));