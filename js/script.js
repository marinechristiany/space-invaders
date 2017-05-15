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
            var id = setInterval(moveShoot, 001);
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
var wMove = wScreen - wInvaders - (margeGauche*2);

var pos = margeGauche;
var interval = setInterval(move, 10);
var direction = "droite";

console.log(margeGauche)
function move(){
console.log("coucou")
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
