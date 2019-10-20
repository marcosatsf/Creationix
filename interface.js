const downloadTimer = 5;


window.addEventListener("load", function(){
    const canvas = document.querySelector('#canv');
    const ctx = canvas.getContext("2d");
    let paint = false;
    let buttonDown = document.querySelector('#downButton');
    let buttonUp = document.getElementById('imageLoader');
    let timeId;

    let boolDown = false;
    let timer = 0;

    //for(var i=0; i <  window.innerHeight/1.5; i++){setTimeout(function(){canvas.height = i}, 1000);}
    canvas.height = window.innerHeight/1.5;
    canvas.width  = window.innerWidth/2;

    function startP(e){
        paint=true;
        draw(e);
    }
    function endP(){
        paint=false;
        ctx.beginPath();
    }

    function draw(e){
        if(!paint) return;
        ctx.lineCap = "round";
        ctx.lineWidth = document.getElementById("strokeW").value;
        ctx.strokeStyle = document.getElementById("strokeC").value;
        ctx.lineTo(e.clientX-window.innerWidth/4, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(e.clientX-window.innerWidth/4, e.clientY);
    }

    
    function loadingDownload(){
        buttonDown.disabled = true;
        setTimeout(function (){buttonDown.disabled = false;},2000);
    }
    
    function resetLoadingDownload(){
        clearTimeout(timeId);
        buttonDown.disabled = true;
    }

    function doAnimation(){
        var bg = document.getElementById("corpo").style;
        bg.backgroundImage = "linear-gradient(90deg, rgb(254, 255, 210), rgb(209, 153, 0))";
        var img = document.querySelector('#canv').toDataURL("image/png").replace("image/png","image/octet-stream");
        var download = document.getElementById("download");
        download.setAttribute("href", img);
        setTimeout(clearAnimation, 2000);
    }
    
    function clearAnimation(){
        var bg = document.getElementById("corpo").style;
        bg.backgroundImage = "linear-gradient(-90deg, rgb(254, 255, 210), rgb(209, 153, 0))";
    }

    function handleImage(e){
        var reader = new FileReader();
        reader.onload = function(event){
            var img = new Image();
            img.onload = function(){
                if((img.height/img.width)%1 > 0 && (img.height/img.width)%1 < 0.3) ctx.drawImage(img,0,0,canvas.width*0.6,canvas.height);
                else if((img.width/img.height)%1 > 0 && (img.width/img.height)%1 < 0.3) ctx.drawImage(img,0,0,canvas.width*0.7,canvas.height*0.95);
                else ctx.drawImage(img,0,0,canvas.width,canvas.height);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);    
    }

    canvas.addEventListener("mousedown", startP);
    canvas.addEventListener("mouseup", endP);
    canvas.addEventListener("mousemove", draw);
    //buttonDown.addEventListener("mouseenter", loadingDownload); //OBRIGADO CHROME POR SER TÃO PRESTATIVO E FUNCIONAR COMO NO MOZILLA
    //buttonDown.addEventListener("mouseout", resetLoadingDownload);
    buttonDown.addEventListener("click", doAnimation);
    buttonUp.addEventListener("change", handleImage,false);
});




