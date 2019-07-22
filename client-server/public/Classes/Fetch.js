class Fetch{

    static get( url, params = {} ){

        return Fetch.request( 'GET', url, params );

    };//fecha o static get
    
    static post( url, params = {} ){

        return Fetch.request( 'POST', url, params );
        
    };//fecha o static post

    static put( url, params = {} ){

        return Fetch.request( 'PUT', url, params );
        
    };//fecha o static get

    static delete( url, params = {} ){

        return Fetch.request( 'DELETE', url, params );
        
    };//fecha o static get
    
    static request( method, url, params = {} ){
            console.log( method );
            let request;

            switch( method.toLowerCase() ){

                case 'get':
                    console.log( 'here3')
                    request = url;

                break;
                
                default:
                    request = new Request( url, {
                        method,
                        body: JSON.stringify( params ),
                        headers: new Headers({
                            'Content-Type' : 'application/json'
                        })
                    });

            };//fecha o switch do method
            return new Promise( (resolve, reject)=>{
                console.log( request );
                fetch( request ).then( response =>{

                    response.json().then( json =>{
                        
                        resolve( json );
    
                    });
    
                }).catch( e =>{
    
                    reject( e );
                });
            });//fecha o Promise pro fetch(request)
            
        

    };//fecha o static request
};//fecha a class Fetch