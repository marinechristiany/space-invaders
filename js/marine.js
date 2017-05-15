	var page = document.querySelector('body');
	var divBouge = document.querySelector('.cat');
	var shut = document.querySelector('.tir');
	var style = window.getComputedStyle(divBouge, false);

	var startScreen = document.querySelector('.letsplay');
	var playButton = document.querySelector('.playbutton');
	var gameScreen = document.querySelector('.game');
	var looseScreen = document.querySelector('.loose');




	playButton.addEventListener("click", start);  // ajoute l'écouteur d'évenement click sur le bouton de la page accueil




	function start (){
	
		startScreen.classList.add('hidden');
		gameScreen.classList.remove('hidden');

		setTimeout("tirEnnemis()", 4000);
		
		page.addEventListener("keydown", fleches);			// Ecouteur d'evenement pour les touches du clavier
		page.addEventListener("keyup", espace);

		var interval = setInterval(move, 10);
		var invadersGroup = document.querySelector(".invadersGroup");
		var margeGauche = invadersGroup.offsetLeft;


		var wScreen = window.innerWidth;
		var pos = margeGauche;
		var direction = "droite";

		var invaders = document.querySelectorAll('.invader'); // recupere tous les pains de mie


		function move(){ 									// Fait bouger les pains de mie

			var wInvaders = invadersGroup.offsetWidth;
			var wMove = wScreen - wInvaders - (margeGauche*2);


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

			if(invadersGroup.getBoundingClientRect().bottom >= parseInt(divBouge.offsetTop + 25)){    // affiche perdu si l'un des pains de mie touchent le chat

				for(var g=0; g<invaders.length; g++){
					if(invaders[g].getBoundingClientRect().bottom >= divBouge.getBoundingClientRect().top){
						looseScreen.classList.remove('hidden');
						gameScreen.classList.add('hidden');
					}
				}
			}

		}
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









	function tir (){                                                        // Permet au chat de tirer
		var bulletsDiv = document.querySelector('.bulletsdiv');
		var bulletsDivWidth = window.getComputedStyle(bulletsDiv, false).width;
		var header = document.querySelector('.gameTitle');
		var headerHeight = header.getBoundingClientRect();
		var pos = 0;
		var id = setInterval(animBullets, 1);
		var newBullet =  document.createElement("div");
		var invaders = document.querySelectorAll('.invader');

			if(invaders.length == 0){											// Si il n'y a plus de pain de mie, affiche gagné

				console.log("gagné");
				looseScreen.classList.add('hidden');
				gagne();

			}

		newBullet.classList.add('tir');									// creation des missiles
		bulletsDiv.appendChild(newBullet);
		newBullet.style.left = parseInt(divBouge.style.left) - parseInt(newBullet.getBoundingClientRect().left) + (parseInt(bulletsDivWidth)/2.7) + "px";   // deplacement des missiles en mm temps que le chat


			function animBullets() {											// fonction qui bouge la div tir
				if (newBullet.getBoundingClientRect().top == parseInt(headerHeight.height) + parseInt(headerHeight.top) + parseInt(newBullet.getBoundingClientRect().height)) {
				    clearInterval(id);									// arrete le setInterval quand on arrive a 70px du top de la page
				    deleteBullet();

				} else {

				    pos = pos - 1; 												// ajoute 1 a pos
				    newBullet.style.top =  pos + 'px';									// modifie la position top de la div tir
				    killInvader();	

				}
			}



		}





		function tirEnnemis (){					//tirs ennemis
			var tabBulletsEnnemis = document.querySelectorAll('.invader');
			var x = parseInt(Math.random()*(tabBulletsEnnemis.length));  // permettra le choix aleatoire du pain de mie qui tir
			var ennemiSelected = tabBulletsEnnemis[x];
			var header = document.querySelector('.gameTitle');
			var headerHeight = header.getBoundingClientRect();
			var pos = 0;
			var id = setInterval(animBullets, 1);
			var newBullet =  document.createElement("div");
			var invadersGroup = document.querySelector(".invadersGroup");

			newBullet.classList.add('laserennemi');   // creation des lasers ennemis
			tabBulletsEnnemis[x].appendChild(newBullet);


			function animBullets() {								// fonction qui bouge le laser ennemi
				if (newBullet.getBoundingClientRect().top == -(parseInt(headerHeight.height) + parseInt(headerHeight.top) + parseInt(newBullet.getBoundingClientRect().height))) {   //quand le laser touche le bas de l'ecran il se suppr
				    clearInterval(id);									// arrete le setInterval quand on arrive a 70px du top de la page
				    deleteBullet();

				} else {
				    pos++; 												// ajoute 1 a pos
				    newBullet.style.top = pos + 'px';						// modifie la position top de la div tir
				    perdu();

				}
			}

			setTimeout("tirEnnemis()", 3000);   // declenche la fonction tir ennemis toutes les 3secondes.
		}






		function deleteBullet(){   // suppression de la confiture quand elle touche la border bottom du header
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




		function killInvader(){					// fonction qui efface le pain de mie touché
			var bulletsDiv = document.querySelector('.bulletsdiv');
			var shuts = document.querySelectorAll('.tir');
			var invaders = document.querySelectorAll('.invader');




				for(j=0; j<shuts.length; j++){   //boucle qui vérifie toute la confiture

					for(i=0; i<invaders.length; i++){		//boucle qui vérifie tous les pains de mie



						if(parseInt(shuts[j].getBoundingClientRect().left) >= parseInt(invaders[i].getBoundingClientRect().left)  && parseInt(shuts[j].getBoundingClientRect().right) <= parseInt(invaders[i].getBoundingClientRect().right)){		// si la confiture est comprise entre gauche et droite du pain de mie
							if(parseInt(shuts[j].getBoundingClientRect().top) >= parseInt(invaders[i].getBoundingClientRect().top) && parseInt(shuts[j].getBoundingClientRect().bottom) <= parseInt(invaders[i].getBoundingClientRect().bottom)){		// si la confiture est comprise entre haut et bas du pain de mie
								invaders[i].classList.add('invader-hidden');	//ajoute la classe cachée au pain de mie
								invaders[i].classList.remove('invader');		// suppr la class pain de mie

								shuts[j].classList.add('hidden');		// ajoute la classe cachée à la confiture
								bulletsDiv.removeChild(shuts[j]);			// supprime la div de la confiture
							}
						}
					}
				}

		}







		function perdu() {		//fonction perdu quand touché par un laser ennemi

			var allLaserEnnemi = document.querySelectorAll('.laserennemi');

			for(var y=0; y<allLaserEnnemi.length; y++){			//boucle qui compare tous les lasers ennemis

				if(parseInt(allLaserEnnemi[y].getBoundingClientRect().left) >= parseInt(divBouge.getBoundingClientRect().left)  && parseInt(allLaserEnnemi[y].getBoundingClientRect().right) <= parseInt(divBouge.getBoundingClientRect().right)){ // si la confiture est comprise entre gauche et droite du chat

					if(parseInt(allLaserEnnemi[y].getBoundingClientRect().top) >= parseInt(divBouge.getBoundingClientRect().top) && parseInt(allLaserEnnemi[y].getBoundingClientRect().bottom) <= parseInt(divBouge.getBoundingClientRect().bottom)){ //si la confiture est comprise entre bas et haut du chat

						looseScreen.classList.remove('hidden');  //enlève la classe cachée à l'écran perdu
						gameScreen.classList.add('hidden');			// ajoute la classe cachée à l'écran du jeu

					}
				} 
			}
		}


		function gagne() {			// fonction gagné

			var invaders = document.querySelectorAll('.invader');
			var winScreen = document.querySelector('.gagne');
			var looseScreen = document.querySelector('.loose')

				winScreen.classList.remove('hidden');		//enleve la classe cachée à l'écran gagné
				gameScreen.classList.add('hidden');			// ajoute la classe cachée à l'écran du jeu
				looseScreen.classList.add('hidden');		// par sécurité, ajoute la classe cachée à l'écran perdu
		}









