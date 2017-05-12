	var page = document.querySelector('body');
	var divBouge = document.querySelector('.cat');
	var shut = document.querySelector('.tir');
	var style = window.getComputedStyle(divBouge, false);
	var cpt = 8;

	var startScreen = document.querySelector('.letsplay');
	var playButton = document.querySelector('.playbutton');
	var gameScreen = document.querySelector('.game');
	var looseScreen = document.querySelector('.loose');



	setTimeout("tirEnnemis()", 4000);

	page.addEventListener("keydown", fleches);			// Ecouteur d'evenement pour les touches du clavier
	page.addEventListener("keyup", espace);
	playButton.addEventListener("click", start);




	function start (){
		startScreen.classList.add('hidden');
		gameScreen.classList.remove('hidden');
	}




	function fleches (event){							// Function déclenchée par l'evenement keydown

		var posLeft = parseInt(style.left);
    	var posRight = parseInt(style.right);

		if(event.keyCode === 37){								// Si la touche pressée est la 37 (fleche droite)
			 if(posLeft > 20){
				var positionLeft = parseInt(style.left);

				divBouge.style.left = positionLeft - 15 + "px";				// Modifie la position
			}
		 }

		else if(event.keyCode === 39){							// Si la touche pressée est la 39 (fleche gauche)

			 if(posRight > 20){
			 	var positionLeft = parseInt(style.left);

				divBouge.style.left = positionLeft + 15 + "px";				// Modifie la position
			}

		} 
	}

	
	function espace (event){
		if(event.keyCode === 32){							// Si la touche pressée est espace
			
			tir();

		}
	}









	function tir (){
		var bulletsDiv = document.querySelector('.bulletsdiv');
		var bulletsDivWidth = window.getComputedStyle(bulletsDiv, false).width;
		var header = document.querySelector('.gameTitle');
		var headerHeight = header.getBoundingClientRect();
		var pos = 0;
		var id = setInterval(animBullets, 1);
		var newBullet =  document.createElement("div");

			
			newBullet.classList.add('tir');
			bulletsDiv.appendChild(newBullet);
			newBullet.style.left = parseInt(divBouge.style.left) - parseInt(newBullet.getBoundingClientRect().left) + (parseInt(bulletsDivWidth)/2.7) + "px";


			function animBullets() {										// fonction qui bouge la div tir
				if (newBullet.getBoundingClientRect().top == parseInt(headerHeight.height) + parseInt(headerHeight.top) + parseInt(newBullet.getBoundingClientRect().height)) {
				    clearInterval(id);									// arrete le setInterval quand on arrive a 70px du top de la page
				    deleteBullet();

				} else {
				    pos++; 												// ajoute 1 a pos
				    newBullet.style.top = - pos + 'px';						// modifie la position top de la div tir
				    killInvader();
				}
			}
	}




	function tirEnnemis (){
		var tabBulletsEnnemis = document.querySelectorAll('.invaderlaser');
		var x = parseInt(Math.random()*(tabBulletsEnnemis.length));
		var ennemiSelected = tabBulletsEnnemis[x];
		var header = document.querySelector('.gameTitle');
		var headerHeight = header.getBoundingClientRect();
		var pos = 0;
		var id = setInterval(animBullets, 1);
		var newBullet =  document.createElement("div");
			
			newBullet.classList.add('laserennemi');
			tabBulletsEnnemis[x].appendChild(newBullet);

			for(var w=0; w<tabBulletsEnnemis.length; w++){
				tabBulletsEnnemis[w].style.left = - parseInt(document.querySelector('.invader').getBoundingClientRect().width) + "px";
			}


			function animBullets() {										// fonction qui bouge la div tir
				if (newBullet.getBoundingClientRect().top == -(parseInt(headerHeight.height) + parseInt(headerHeight.top) + parseInt(newBullet.getBoundingClientRect().height))) {
				    clearInterval(id);									// arrete le setInterval quand on arrive a 70px du top de la page
				    deleteBullet();

				} else {
				    pos++; 												// ajoute 1 a pos
				    newBullet.style.top = pos + 'px';						// modifie la position top de la div tir
				    perdu();
				}
			}

		setTimeout("tirEnnemis()", 3000);
	}






	function deleteBullet(){
		var bulletsDiv = document.querySelector('.bulletsdiv');
		var shuts = document.querySelectorAll('.tir');
				
		if(bulletsDiv.hasChildNodes()){
			bulletsDiv.removeChild(bulletsDiv.firstChild);

			for(var v=0; v<bulletsDiv.length; v++){

				if(shuts[v].getBoundingClientRect().top == parseInt(headerHeight.height) + parseInt(headerHeight.top) + parseInt(shuts[v].getBoundingClientRect().height)){
					bulletsDiv.removeChild(shuts[v])
				}
			}
		}
	}




	function killInvader(){
		var bulletsDiv = document.querySelector('.bulletsdiv');
		var shuts = document.querySelectorAll('.tir');
		var invaders = document.querySelectorAll('.invader');

		for(j=0; j<shuts.length; j++){

			for(i=0; i<invaders.length; i++){

				if(parseInt(shuts[j].getBoundingClientRect().left) >= parseInt(invaders[i].getBoundingClientRect().left)  && parseInt(shuts[j].getBoundingClientRect().right) <= parseInt(invaders[i].getBoundingClientRect().right)){
					if(parseInt(shuts[j].getBoundingClientRect().top) >= parseInt(invaders[i].getBoundingClientRect().top) && parseInt(shuts[j].getBoundingClientRect().bottom) <= parseInt(invaders[i].getBoundingClientRect().bottom)){
						invaders[i].classList.add('invader-hidden');
						invaders[i].classList.remove('invader');

						shuts[j].classList.add('hidden');
						bulletsDiv.removeChild(shuts[j]);

					}
				} 
			}
		}
	}




	function perdu() {

		var allLaserEnnemi = document.querySelectorAll('.laserennemi');

		for(var y=0; y<allLaserEnnemi.length; y++){

			if(parseInt(allLaserEnnemi[y].getBoundingClientRect().left) >= parseInt(divBouge.getBoundingClientRect().left)  && parseInt(allLaserEnnemi[y].getBoundingClientRect().right) <= parseInt(divBouge.getBoundingClientRect().right)){
				
				if(parseInt(allLaserEnnemi[y].getBoundingClientRect().top) >= parseInt(divBouge.getBoundingClientRect().top) && parseInt(allLaserEnnemi[y].getBoundingClientRect().bottom) <= parseInt(divBouge.getBoundingClientRect().bottom)){
					
					looseScreen.classList.remove('hidden');
					gameScreen.classList.add('hidden');

				}
			} 
		}
	}