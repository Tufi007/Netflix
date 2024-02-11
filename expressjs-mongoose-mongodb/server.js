
const dotenv= require('dotenv');
dotenv.config({path:'./config.env'});
const mongoose= require('mongoose');
const app= require('./app');
mongoose.connect(process.env.CONN_STR).then((conn)=>{
    console.log('database connected');
});

PORT= process.env.PORT;
app.listen(PORT,(req,res)=>{
    console.log('server connected');
})