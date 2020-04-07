function validate(){
    let regexUsername = /^[a-zA-Z0-9_.@-]{6,20}$/;
    let regexPassword = /^[a-zA-Z0-9_.@-]{6,20}$/;

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let error = document.getElementById('error');

    if(regexUsername.test(username)){
        if(regexPassword.test(password)){
            return true;
        } else {
            error.innerHTML = 'User and pass don\'t contain special characters, except: . _ @ - <br> Minimum of 6 and maximum of 20 characters';
            return false;
        }
    } else {
        error.innerHTML = 'User and pass don\'t contain special characters, except: . _ @ - <br> Minimum of 6 and maximum of 20 characters';
        return false;
    }
}