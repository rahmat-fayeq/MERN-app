const path = require('path');
const express = require('express');
const {errorHandler} = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const color = require('colors');
const connectDB = require('./config/db');
const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/goals', require('./routes/goalRoutes'));

// serve frontend in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html')));
}else{
    app.get('/',(req,res)=>res.send('You are in development mode, please change to production mode!'));
}

app.use(errorHandler);
app.listen(port, () => {
    console.log('listening on port ' + port)
});