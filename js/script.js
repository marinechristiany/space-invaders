var chat = document.querySelector(".cat");
var styleChat = getComputedStyle(chat);

var header =document.querySelector("header");
var section = document.querySelector("section");
var hHeader = parseInt(getComputedStyle(header).height) + 25;
var hSection = parseInt(getComputedStyle(section).height);
var hChat = parseInt(getComputedStyle(chat).height);

var invadersGroup = document.querySelector(".invadersGroup");
var hInvaderGroup = parseInt(getComputedStyle(invadersGroup).height);

var hUse = hSection - hHeader - hChat;
var hdownInv = hUse - hInvaderGroup ;



window.addEventListener("keydown", go)





function go(){
    var x = event.keyCode;
    var posLeft = parseInt(styleChat.left);
    var posRight = parseInt(styleChat.right);

    
    if (x == 39) {
        moveRight()
            
        function moveRight(){
            if(posRight > 20){
            chat.style.left = posLeft + 15 + "px";
            console.log(posRight);
            }
        }
    }
    else if(x == 37){
        moveLeft()
            
        function moveLeft(){
            if(posLeft > 20){
                chat.style.left = posLeft - 15 + "px";
                console.log(chat.style.left)
            }
        }
    }
    else if(x == 32){
        doshoot()
            
        function doshoot(){
            var tir = document.createElement("div");
            tir.setAttribute('class', 'balle');
            chat.appendChild(tir);
            var styleTir = getComputedStyle(tir);
            var id = setInterval(moveShoot, 01);
            var pos = 0;
            
            

            
                function moveShoot(){
                var posTirTop = parseInt(styleTir.top);

                if (posTirTop == - hUse) {
				    clearInterval(id);									
				    deleteBullet();
                    
				} else {
				    pos++; 												
				    tir.style.top = - pos + 'px';						
				}
			}


			function deleteBullet(){
				if(chat.hasChildNodes()){
					chat.removeChild(chat.firstChild)
				}
			}
                
            
        }

    }
}

/* deplacement de la grosse div invadersGROUP*/

var direction = "droite";
var wScreen = window.innerWidth;
var margeGauche = invadersGroup.offsetLeft;
var wInvaders = invadersGroup.offsetWidth;
/*var posGaucheInvaders = parseInt(getComputedStyle(invadersGroup).left);*/
var wMove = wScreen - wInvaders - (margeGauche*2);

var pos = margeGauche;
var id = setInterval(move, 10);
var direction = "droite";


function move(){

    if(direction == "droite"){
        
        if (pos < wMove){
            pos++;
            invadersGroup.style.left = pos + "px";
        }
        else{
            invadersGroup.style.top = invadersGroup.offsetTop + 10 + "px";
            direction = "gauche";
        }

    }else{
        
        if (pos > margeGauche){
            pos--;
            invadersGroup.style.left = pos + "px";
        }
        else{
            invadersGroup.style.top = invadersGroup.offsetTop + 10 + "px";
            direction = "droite";
        }   
    }
}




/*
var idD = setInterval(down, 300);
var idM = setInterval(mouvement, 3000);

var pos = hHeader;
   

    function mouvement() {
        console.log(pos + "-" + hdownInv + "-" + invadersGroup.offsetLeft)
        
        if((invadersGroup.style.left == 5+"%") && (pos < hdownInv)){
            invadersGroup.style.left = 35+"%";
            down(); 
            
        } 
        
        else if((invadersGroup.style.left == 35+ "%") && (pos < hdownInv)){
            invadersGroup.style.left = 5+"%";
            down();
            
        }
        
        else if(pos >= hdownInv) {
           clearInterval(idM);
            
        }
   }    


    function down() {
        
        if (pos >= hdownInv) {
            clearInterval(idD);
            
        } 
        else {
            pos++;
            invadersGroup.style.top = pos + 'px';
            
        }
       
   }
*/



/*

    var pain = document.querySelectorAll(".invader");
    var tirs = document.querySelectorAll(".tir");


function touch(){
    for(var i=0; i<pain.length; i++){
        
    }
}

*/




/*fontion touché
si le left du tir se trouve dans un interval compris entre le left et le right dun invader, alors crochet
si le top du tir est égal au bottom du invader, alors tu ajoute la class hidden au tir et au invader*/












