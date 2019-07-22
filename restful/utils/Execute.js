module.exports = {

    exec: ( err, req, res, user = null )=>{

        if( err ){

            res.status( 400 ).json( err );
            return false;

        }else{

            if( !user || user == undefined ){

                res.status( 200 ).json( req.body );

            }else{

                res.status( 200 ).json( user );

            }

        }
    }//fecha o exec
};//fecha o module.exports