!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/8fa7a38a54cc69f68e5be0b75/b7ac124db40290e30195476e8.js");

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