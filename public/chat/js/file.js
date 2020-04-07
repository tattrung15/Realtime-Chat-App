const fileSelect = document.getElementById('fileSelect');
const resultShow = document.getElementById('result');

function showFile(input){
    
    if(document.getElementById('img-item')){
        resultShow.removeChild(document.getElementById('img-item'));
    }

    let reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.onload = (event) => {
        let img = document.createElement('img');
        img.id = 'img-item';
        img.src = event.target.result;
        img.style.width = '100%';
        img.style.marginTop = '20px';
        resultShow.appendChild(img);
    }
}