const express = require('express');
const connectDB = require('./Config/dbConnection');
const UserRouter = require('./Routes/UserRoutes');
const AdminRouter = require('./Routes/AdminRoutes');
const cors = require('cors');


const app = express();
app.use(cors())
app.use(express.json())

connectDB();


app.use('/',UserRouter);
app.use('/admin', AdminRouter);



const PORT = process.env.PORT || 8080;


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});