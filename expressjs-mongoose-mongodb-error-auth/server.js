
const dotenv= require('dotenv');
dotenv.config({path:'./config.env'});
const mongoose= require('mongoose');
process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('Uncaught Exception occured! Shutting down...');
    process.exit(1);
 })
const app= require('./app');
mongoose.connect(process.env.CONN_STR).then((conn)=>{
    console.log('database connected');
});

PORT= process.env.PORT;
app.listen(PORT,(req,res)=>{
    console.log('server connected');
})
process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('Unhandled rejection occured! Shutting down...');
 
    server.close(() => {
     process.exit(1);
    })
 })