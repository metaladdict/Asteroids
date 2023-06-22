/* Cette version du jeu inclut 
- le score
- les sons
- l'acceleration (step à -10ms tous les 5 points)
*/
let enPause = false
let enJeu = false
let posX = 0
let listeAsteroides: number[][] = []
let score:number = 0
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
	music.play(music.createSoundExpression(WaveShape.Square, 1600, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
	basic.showIcon(IconNames.Sad)
	pause(1000)
	basic.clearScreen()
	basic.showNumber(score,100)
}

function startGame() 
{
	basic.clearScreen()
	listeAsteroides = []
	score = 0
	basic.clearScreen()
	posX = 2
	allumerVaisseau()
	music.play(music.builtinPlayableSoundEffect(soundExpression.slide), music.PlaybackMode.UntilDone)
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
				music.play(music.createSoundExpression(WaveShape.Square, 400, 600, 255, 0, 100, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
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
				music.play(music.createSoundExpression(WaveShape.Square, 400, 600, 255, 0, 100, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
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
		music.play(music.createSoundExpression(WaveShape.Noise, 54, 54, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
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
					score++
					if(score%5==0)
					{
						tempo--
						music.play(music.createSoundExpression(WaveShape.Sawtooth, 3042, 3569, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
					}
					else
					{
						music.play(music.createSoundExpression(WaveShape.Sawtooth, 500, 500, 255, 98, 100, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
					}
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
