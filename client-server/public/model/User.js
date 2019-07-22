
class User {
    constructor( name, email, admin, gender, birth, country, password, photo ){
        this._name = name,
        this._email = email,
        this._admin = admin,
        this._gender = gender, 
        this._birth = birth,
        this._country = country,
        this._password = password,
        this._photo = photo;
        this._id;

    };//fecha o constructor
//////////////////////////////////////
get name(){
    return this._name;
}
set name ( value ){
    this._name = value;
}
get email(){
    return this._email;
}
set email( value ){
    this._email = value;
}
get admin(){
    return this._admin;
}
set admin( value ){
    this._admin = value;
}
get gender(){
    return this._gender;
}
set gender ( value ){
    this._gender = value;
}
get birth(){
    return this._birth;
}
set birth( value ){
    this._birth = value;
}
get country(){
    return this._country;
}
set country( value ){
    this._country = value;
}
get password(){
    return this._password;
}
set password( value ){
    this._password = value;
}
get photo(){
    return this._photo;
}
set photo( value ){
    this._photo = value;
}
get userID(){
    return this._id;
}
set userID( value ){
    this._id = value;
}

/////////////////////////////////////////////////
loadFromJSON(json){

    for( let name in json ){

        this[name] = json[name];
    }
};//fecha o loadFromJSON
static selectAllUsers(){

    return Fetch.get('/users');

};//fecha selectAllUsers
toJSON(){
    let json = {};

    Object.keys( this ).forEach( key =>{

        if( this[key] !== undefined ) json[key] = this[key];

    });

    return json;
};//fecha o toJSON
save(){

    return new Promise( (resolve, reject)=>{

        let promise; 
        if( !this._id ){

            promise = Fetch.post( `/users`, this.toJSON() );
            
    
        }else{
    
            promise = Fetch.put( `/users/${this._id}`, this.toJSON() );
           
        }

        promise.then( data =>{

            this.loadFromJSON( data );
            resolve( this );

        }).catch( e =>{

            reject( e );

        });
    });//fecha o Promise
    
};//fecha o método save

remove(){

    return Fetch.delete( `/users/${this._id}` );

};//fecha o método remove









};//fecha a classe User 