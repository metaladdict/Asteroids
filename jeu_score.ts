// Cette version du jeu inclut le score

let enPause = false
let enJeu = false
let posX = 0
let listeAsteroides: number[][] = []
let score:number = 0

/********************************************************************************************************
*                                    Définition des fonctions de jeu                                    *
********************************************************************************************************/
function gameOver() 
{
	enJeu = false
	listeAsteroides = []
	basic.clearScreen()
	basic.showIcon(IconNames.Sad)
	pause(1000)
	basic.clearScreen()
	basic.showNumber(score,100)
}

function startGame() 
{
	listeAsteroides = []
	score = 0
	basic.clearScreen()
	posX = 2
	led.plot(posX, 4)
	enJeu = true
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
			{led.plot(posX, 4)}
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
			{led.plot(posX, 4)}
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
loops.everyInterval(1000, function () {
	if (enJeu == true && enPause == false) {
		listeAsteroides.unshift([randint(0, 4), -1])
	}
})


loops.everyInterval(500, function () {
	if (enJeu == true && enPause == false) 
	{
		for (let i = 0; i <= listeAsteroides.length - 1; i++) 
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
				score++
			}
		}
	}
})


/********************************************************************************************************
*                   TOUT EST PRÊT, ON LANCE UNE PARTIE AU DEMARRAGE DE LA CARTE                         *
********************************************************************************************************/
startGame()
