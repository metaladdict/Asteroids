// Cette version du jeu inclut des sons

let enPause = false
let enJeu = false
let posX = 0
let listeAsteroides: number[][] = []

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
}

function startGame() 
{
	listeAsteroides = []
	basic.clearScreen()
	posX = 2
	led.plot(posX, 4)
	music.play(music.builtinPlayableSoundEffect(soundExpression.slide), music.PlaybackMode.UntilDone)
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
			{
				led.plot(posX, 4)
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
				led.plot(posX, 4)
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
				music.play(music.createSoundExpression(WaveShape.Sawtooth, 500, 500, 255, 98, 100, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
			}
		}
	}
})


/********************************************************************************************************
*                   TOUT EST PRÊT, ON LANCE UNE PARTIE AU DEMARRAGE DE LA CARTE                         *
********************************************************************************************************/
startGame()
