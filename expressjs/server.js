
const dotenv= require('dotenv');
dotenv.config({path:'./config.env'});
const app= require('./app');
PORT= process.env.PORT;
app.listen(PORT,(req,res)=>{
   
    console.log('server connected');
})