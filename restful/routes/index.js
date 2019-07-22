module.exports = app =>{

    app.get( '/', (req, res)=>{

        res.status( 200 ).end( '<h1>Hello World!</h1>' );
        
    });

};//fecha o module.exports