// Cette version du jeu inclut l'acceleration
// Elle se fait à chaque astéroide et est donc rapidement injouable
let enPause = false
let enJeu = false
let posX = 0
let listeAsteroides: number[][] = []
let tempo:number = 50
let tick:number = tempo*100

/********************************************************************************************************
*                                    Définition des fonctions de jeu                                    *
********************************************************************************************************/
function gameOver() 
{
	enJeu = false
	listeAsteroides = []
	basic.clearScreen()
	basic.showIcon(IconNames.Sad)
}

function startGame() 
{
	basic.clearScreen()
	listeAsteroides = []
	basic.clearScreen()
	posX = 2
	allumerVaisseau()
	tick = tempo*2
	enJeu = true
}

function allumerVaisseau()
{
	led.plotBrightness(posX, 4, 125)
}


/********************************************************************************************************
*                                 Définition des actions sur les boutons                                *
********************************************************************************************************/
input.onButtonPressed(Button.A, function () {
	if (enJeu == true && enPause == false)
	{
		if (posX > 0)
		{
			led.unplot(posX, 4)
			posX += -1

			if (listeAsteroides[listeAsteroides.length - 1][1] == 4 && listeAsteroides[listeAsteroides.length - 1][0] == posX) 
			{gameOver()} 
			else 
			{
				allumerVaisseau()
			}
		}
	}
})

input.onButtonPressed(Button.B, function () {
	if (enJeu == true && enPause == false)
	{
		if (posX < 4)
		{
			led.unplot(posX, 4)
			posX += 1
			
			if (listeAsteroides[listeAsteroides.length - 1][1] == 4 && listeAsteroides[listeAsteroides.length - 1][0] == posX) 
			{gameOver()} 
			else
			{
				allumerVaisseau()
			}
		}
	}
})

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
	if (enJeu == false) 
	{startGame()} 
	else
	{
		if (enPause == false)
		{enPause = true}
		else
		{enPause = false}
	}
})



/********************************************************************************************************
*                                  Définition des boucles temporelles                                   *
********************************************************************************************************/
loops.everyInterval(10, function () {
	
	if (enJeu == true && enPause == false) 
	{
		tick--

		if(tick==tempo || tick==0)
		{
			for(let i = 0; i <= listeAsteroides.length - 1; i++)
			{
				if (listeAsteroides[i][1] >= 0) 
				{led.unplot(listeAsteroides[i][0], listeAsteroides[i][1])}
				
				if (listeAsteroides[i][1] < 4) 
				{
					if (listeAsteroides[i][1] == 3 && listeAsteroides[i][0] == posX) 
					{gameOver()} 
					else
					{
						listeAsteroides[i][1] += 1
						led.plot(listeAsteroides[i][0], listeAsteroides[i][1])
					}
				}
				else
				{
					listeAsteroides.removeAt(i)
					tempo--
				}
			}
		}	

		if(tick==0)
		{
			listeAsteroides.unshift([randint(0, 4), -1])
			tick = tempo*2
		}
		
	}
})


/********************************************************************************************************
*                   TOUT EST PRÊT, ON LANCE UNE PARTIE AU DEMARRAGE DE LA CARTE                         *
********************************************************************************************************/
startGame()
