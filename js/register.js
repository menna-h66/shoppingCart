let button = document.querySelector("#btn");

button.addEventListener('click', function(e){
    e.preventDefault();
    let Username = document.querySelector("#Username").value;
    let Email = document.querySelector("#Email").value;
    let Password = document.querySelector("#Password").value;
    let checkbox = document.querySelector(".form-check-input").value;
    
    const user = {
        username: Username,
        email: Email,
        password: Password,
    };
    

    if(Username === '' ||  Email === '' || Password === ''  ||  checkbox === 'true'  ){
        alert("Please fill all data .")
    }else{
        localStorage.setItem( 'user' , JSON.stringify(user) );
        alert("Registration successful! Please login.")

        setTimeout(() => {
        window.location= 'login.html'
        }, 1500      )
    }
})