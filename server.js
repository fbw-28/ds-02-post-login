module.exports = app =>{

    const port = 3000;
    
    app.listen(port,(err)=>{
        if (err){
            console.log(err.message);
        }
        console.log(`Serving port: ${port}`)
    })
}