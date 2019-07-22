
class UserController{
    constructor( formID, tableID ){
        this._formEl = document.querySelector( formID );
        this._tableEl = document.querySelector( tableID );
        this._arrayForm = [ ...this._formEl.elements ];
        this._btnSubmit = this.formEl.querySelector('[type=submit]');
        this._onEdit;
        this._idUser;
        this._userMemory;
        //////////////
        this.onSubmit();
        this.selectAll();
        
    };//fecha o constructor
////////////////////////////////////////////
get formEl(){
    return this._formEl;
}
get tableEl(){
    return this._tableEl;
}
get arrayForm(){
    return this._arrayForm;
}
/////////////////////////////////////////////

selectAll(){
    
    User.selectAllUsers().then( data =>{
        data.filter( item=>{
            
            if( !item._photo ) item._photo = 'dist/img/boxed-bg.jpg';

            this.addTr( item );

        })
    });
        
};//fecha o selectAll
onSubmit(){

    this.formEl.addEventListener( 'submit', event =>{
        event.preventDefault();
        
        this._btnSubmit.disabled = true;

        if( !this._onEdit ){

            let values = this.getValues();
            if(!values)return false;
            

            this.getPhoto().then( content=>{
                
                values._photo = content;
                
                let user = new User();
                user.loadFromJSON( values );
                user.save().then( data =>{
                    this._userMemory = data;
                    this.addTr( data );
                });
                this.formEl.reset();
                this._btnSubmit.disabled = false;
            

            }, error =>{
                
                console.log( error );
            });//fecha o getPhoto

        }else{

            let values = this.getValues();
            if(!values)return false;
            let newUser = Object.assign( {}, this._userMemory, values );
            this.getPhoto().then( content=>{
                if( !values._photo ){
                    newUser._photo = this._userMemory._photo;
                }else{
                    newUser._photo = content;
                }
                let index = parseInt(this.formEl.dataset.trIndex);
                let tr = this.tableEl.rows[index];
                
                let user = new User();
                user.loadFromJSON( newUser );
                user.save().then( data =>{

                    tr.dataset.user = JSON.stringify( data );
                    tr.innerHTML = `
                        <td><img src="${data._photo}" alt="User Image" class="img-circle img-sm"></td>
                        <td>${data._name}</td>
                        <td>${data._email}</td>
                        <td>${(data._admin) ? 'Sim' : 'Não'}</td>
                        <td>${ this.currentDate() }</td>
                        <td>
                            <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                            <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
                        </td>
                    `;
                    this.addEventsTr( tr );
                    this.formEl.querySelector('.oldPhoto').style.display = 'none';
                    this.formEl.reset();
                    this._btnSubmit.disabled = false;
                    this.updateCount();
                });//fecha o user.save

            }, error=>{
                console.log( error );
            });


        }
        
        

    });//fecha o formEl.addEventListener
};//fecha o onSubmit
addTr( dataUser, tr = null ){

    if( !tr ) tr = document.createElement( 'tr' );

    tr.dataset.user = JSON.stringify( dataUser );

    tr.innerHTML = `
            <td><img src="${dataUser._photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser._name}</td>
            <td>${dataUser._email}</td>
            <td>${(dataUser._admin) ? 'Sim' : 'Não'}</td>
            <td>${ this.currentDate() }</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
            </td>
        `;
        this.tableEl.appendChild( tr );
        this.addEventsTr( tr );
        this.updateCount();
};//fecha o addTr
getValues(){
    
    let user = {};

    this.arrayForm.forEach( element =>{

        switch( element.name ){

            case 'gender':

                if( element.checked ){

                    user[element.name] = element.value;

                }
                
            break;
            case 'admin':

                if( element.checked ){

                    user[element.name] = true;

                }else{

                    user[element.name] = false;

                }

            break;
            default:

                user[element.name] = element.value;

        };//fecha o switch( element.name )

        if( ['name','email','password'].indexOf( element.name ) > -1 && !element.value ){

            element.parentElement.classList.add( 'has-error' );
            this._btnSubmit.disabled = false;

        }else{

            element.parentElement.classList.remove( 'has-error' );

        }
    });//fecha o arrayForm.forEach
    let hasError = this.formEl.querySelector( '.has-error' );
    
    if( !hasError ){

        return new User( 

            user.name,
            user.email,
            user.admin,
            user.gender,
            user.birth,
            user.country,
            user.password,
            user.photo

        );//fecha o return new User

    }else{

        return false;
    }
    
};//fecha o getValues
getPhoto(){
    
    return new Promise( (resolve, reject)=>{

        let fileReader = new FileReader();
        let photo = this.arrayForm.filter( item =>{

            if( item.name == 'photo' ) return item;

        });//fecha a variável photo
        let file = photo[0].files[0];

        fileReader.onload = ()=>{

            resolve( fileReader.result );

        };//fecha o fileReader.onload
        fileReader.onerror = error =>{

            reject( error );

        };//fecha o fileReader.onerror
        if( !file ){

            resolve( 'dist/img/boxed-bg.jpg' );

        }else{

            fileReader.readAsDataURL( file );
            
        }

    });//fecha o Promise
};//fecha o getPhoto
addEventsTr( tr ){
    
    tr.querySelector('.btn-edit').addEventListener( 'click', event =>{

        this._onEdit = true;
        this._userMemory = JSON.parse( tr.dataset.user );
        this.formEl.dataset.trIndex = tr.sectionRowIndex;
        let json = this._userMemory;
        for( let name in json ){

            let newName;
            if( name.indexOf('_') == 0 ){
                newName = name.replace('_','');
            }

            let field = this.formEl.querySelector(`[name=${newName}]`);

            if( field ){
                switch( field.type ){

                    case 'file':
                        this.formEl.querySelector('.oldPhoto').src = `${json[name]}`;
                        this.formEl.querySelector('.oldPhoto').style.display = '';
                    break;
                    case 'radio':

                        field = this.formEl.querySelector( `[name=${newName}][value=${json[name]}]`);
                        console.log( 'aqui')
                        field.checked = true;
                        
                    break;
                    case 'checkbox':
    
                        if( json[name] ){
    
                            field.checked = true;
    
                        }else{
    
                            field.checked = false;
    
                        }
    
                    break;
                    default:
    
                        field.value = json[name];
    
                };//fecha o switch
            };//fecha o for in
            };//fecha a verificação do field
            
    });//fecha o addeventListener do btn-edit
    
    tr.querySelector('.btn-delete').addEventListener('click', event=>{

        if( confirm( 'Realemente deseja excluir' ) ){

            let user = new User();
            user.loadFromJSON( JSON.parse( tr.dataset.user) );
            user.remove().then( data =>{

                tr.remove();
                this.updateCount();

            });

        }

    });//fecha o addEventListener do  btn-del
    
};//fecha o addEventsTr
updateCount(){

    let userCount = 0;
    let adminCount = 0;

    [ ...this.tableEl.children ].forEach( tr =>{

        userCount++;

        if ( tr.innerText.indexOf('Sim') > -1 ){

            adminCount++;
        }
    });//fecha o forEach
    document.querySelector('#userCount').innerHTML = userCount;
    document.querySelector('#adminCount').innerHTML = adminCount;
};//fecha o updateCount
currentDate(){
    let date = new Date();
    let current = date.toLocaleDateString({
        day:'2-digit',
        month:'short',
        year: 'numeric'
    });

    return current;
};//fecha o currentDate




















};//fecha a classe 