const NeDB = require( 'nedb' );
const db = new NeDB({
    filename: 'users.db',
    autoload: true
});

module.exports = app =>{
    
    let route = app.route( '/users' );
    let routeID = app.route( '/users/:id' );    

    route.get( (req, res)=>{

        db.find( {}, (err, user)=>{

            app.utils.Execute.exec( err, req, res, user );            

        });
    });//fecha o route.get 

    route.post( (req, res)=>{
        console.log( req );
        db.insert( req.body, (err, user)=>{

            app.utils.Execute.exec( err, req, res, user );

        });
    });//fecha o route.post

    routeID.get( (req, res)=>{

        db.findOne( {_id:req.params.id}, ( err, user )=>{

            app.utils.Execute.exec( err, req, res, user );

        });
    });//fecha o routeID.get

    routeID.put( (req, res)=>{

        db.update( {_id:req.params.id}, req.body, err=>{

            app.utils.Execute.exec( err, req, res );

        });
    });//fecha o routeID.put

    routeID.delete( (req, res)=>{

        db.remove( {_id:req.params.id}, err =>{

            app.utils.Execute.exec( err, req, res );

        });
    });//fecha o routeID.delete

};//fecha o module.exports