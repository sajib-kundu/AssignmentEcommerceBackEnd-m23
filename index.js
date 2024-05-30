const app = require('./app');
const port=5020;
app.listen(port,function (){
    console.log(`Application Running at port ${port}`);
})