let button = document.querySelector(".btn");

button.addEventListener('click' , function(e){
    e.preventDefault();
    let Username = document.querySelector("#Username").value;
    let Password = document.querySelector("#Password").value;

    var userName = localStorage.getItem('user')
    if(userName === '' || Password === ''){
        alert('please fill all data')
    }else{
        if(userName){
                let parsedUser = JSON.parse(userName)
                if(parsedUser.password === Password){
                    localStorage.setItem('userName' , JSON.stringify(parsedUser))
                    alert(`Welcome ${parsedUser.username}`)

                    setTimeout(()=>{
                        window.location='index.html'
                    },1500)
                } 
                else{
                    alert('Wrong Password')
                }
        }
        else{
            alert('User not Found')
    }}
})