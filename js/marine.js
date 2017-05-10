	var page = document.querySelector('body');
	var divBouge = document.querySelector('.cat');
	var shut = document.querySelector('.tir');
	var style = window.getComputedStyle(divBouge, false);


	page.addEventListener("keydown", fleches);			// Ecouteur d'evenement pour les touches du clavier


	





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


		else if(event.keyCode === 32){							// Si la touche pressée est espace
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
				} /*else if {


				}*/ else {
				    pos++; 												// ajoute 1 a pos
				    newBullet.style.top = - pos + 'px';						// modifie la position top de la div tir
				    testkillInvader()
				}
			}


			function deleteBullet(){
				if(bulletsDiv.hasChildNodes()){
					bulletsDiv.removeChild(bulletsDiv.firstChild);
				}
			}
	}


	function testkillInvader(){
		var shut = document.querySelector('.tir');


		var vingtun = document.getElementById('21');
		var vingtdeux = document.getElementById('22');
		var vingttrois = document.getElementById('23');



		var posBullet = shut.getBoundingClientRect();
		var posVingtun = vingtun.getBoundingClientRect();

		if(parseInt(posBullet.right) <= parseInt(posVingtun.right) || parseInt(posBullet.left) <= parseInt(posVingtun.left)){
			vingtun.classList.add('hidden');
			vingtun.classList.remove('invader');

			// CA TOUCHE MAIS SUR TOUTE LA HAUTEUR DE LA PAGE.
		}
	}

	