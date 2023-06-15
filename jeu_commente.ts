/********************************************************************************************************
*                                       Définition des variables                                        *
********************************************************************************************************/
let enPause = false // définit l'état "jeu en pause"
let enJeu = false // définit l'état "partie en cours"
let posX = 0 // position X du vaisseau
let listeAsteroides: number[][] = [] // tableau contenant les coordonnées des astéroides [positionX , positionY]


/********************************************************************************************************
*                                    Définition des fonctions de jeu                                    *
********************************************************************************************************/
/*************** Fonction de fin de partie ***************
Passage de enJeu à false
On vide l'écran et on affiche un smiley de fin de partie
*/
function gameOver() {
    enJeu = false
    listeAsteroides = []
    basic.clearScreen()
    basic.showIcon(IconNames.Sad)
}

/*************** Fonction de début de partie ***************
Vidage de la liste des astéroides
On vide l'écran
On initialise la position initiale du vaisseau au centre (2)
On allume la LED du vaisseau
Passage de enJeu à true
*/
function startGame() {
    listeAsteroides = []
    basic.clearScreen()
    posX = 2
    led.plot(posX, 4)
    enJeu = true
}



/********************************************************************************************************
*                                 Définition des actions sur les boutons                                *
********************************************************************************************************/
/*************** Action sur la bouton A - mouvement à gauche ***************/
input.onButtonPressed(Button.A, function () {
    // on agit que si une partie est en cours ET que l'on n'est pas en pause
    if (enJeu == true && enPause == false) {
        // on ne bouge que si le vaisseau peut bouger à gauche
        if (posX > 0) {
            // extinction de la LED de position actuelle
            led.unplot(posX, 4)
            //calcul de la nouvelle position
            posX += -1
            /* On contrôle si le vaisseau s'écrase sur le dernier astéroide (le seul qui peut être sur la dernière ligne)
            Les coordoonées du dernier astéroide sont dans le tableau listeAsteroides[listeAsteroides.length - 1], on compare donc :
            position Y : listeAsteroides[listeAsteroides.length - 1][1] == 4 (position Y du vaisseau => dernière ligne de la matrice)
            position X : listeAsteroides[listeAsteroides.length - 1][0] == posX (position X du vaisseau)
            */
            if (listeAsteroides[listeAsteroides.length - 1][1] == 4 && listeAsteroides[listeAsteroides.length - 1][0] == posX) {
                gameOver() // lancement de la fonction de fin de partie
            } else {
                led.plot(posX, 4) // on allume la LED de nouvelle position
            }
        }
    }
})

/*************** Action sur la bouton B - mouvement à droite ***************/
input.onButtonPressed(Button.B, function () {
    // on agit que si une partie est en cours ET que l'on n'est pas en pause
    if (enJeu == true && enPause == false) {
        // on ne bouge que si le vaisseau peut bouger à droite
        if (posX < 4) {
            // extinction de la LED de position actuelle
            led.unplot(posX, 4)
            //calcul de la nouvelle position
            posX += 1
            /* On contrôle si le vaisseau s'écrase sur le dernier astéroide (le seul qui peut être sur la dernière ligne)
            Les coordoonées du dernier astéroide sont dans le tableau listeAsteroides[listeAsteroides.length - 1], on compare donc :
            position Y : listeAsteroides[listeAsteroides.length - 1][1] == 4 (position Y du vaisseau => dernière ligne de la matrice)
            position X : listeAsteroides[listeAsteroides.length - 1][0] == posX (position X du vaisseau)
            */
            if (listeAsteroides[listeAsteroides.length - 1][1] == 4 && listeAsteroides[listeAsteroides.length - 1][0] == posX) {
                gameOver() // lancement de la fonction de fin de partie
            } else {
                led.plot(posX, 4) // on allume la LED de nouvelle position
            }
        }
    }
})

/*************** Action sur la bouton tactile - start / pause ***************/
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    // s'il n'y a pas de partie en cours, on démarre une nouvelle partie
    if (enJeu == false) {
        startGame()
    } else {
    // si une partie est en cours, le bouton active/désactive la pause
        if (enPause == false) {
            enPause = true
        } else {
            enPause = false
        }
    }
})



/********************************************************************************************************
*                                  Définition des boucles temporelles                                   *
*********************************************************************************************************
Dans notre jeu, on crée des astéroides, placé aléatoirement sur la ligne du haut, puis, à intervalle 
régulier, on fait "avancer" (déscendre) tous les astéroides à l'écran. On place donc les coordonnées des 
astéroides dans un tabeau et on fait évoluer la postion Y uniquement à chaque boucle de mouvement. Pour 
avoir un espace de déplacement entre chaque astéroide, s'assure que l'intervalle de création d'astéroide 
est la double de l'intervalle de déplacement.
*/

/*************** Boucle de création d'astéroide ***************/
loops.everyInterval(1000, function () {
    // on agit que si une partie est en cours ET que l'on n'est pas en pause
    if (enJeu == true && enPause == false) {
        /* on ajoute, au début de la liste des astéroides, un tableau de coordonnées:
        X = randint(0, 4) => nombre aléatoire entre 0 et 4
        Y = -1 
        on initialise le Y à -1 car cette boucle ne se charge pas d'allumer les LED des astéroides, 
        c'est la boucle de mouvement qui s'en charge, après avoir incrémenté tous les Y, les nouveaux 
        astéroides s'allumeront donc bien en position 0 à leur premier affichage
        */
        listeAsteroides.unshift([randint(0, 4), -1])
    }
})


/*************** Boucle de progression des astéroides ***************/
loops.everyInterval(500, function () {
    // on agit que si une partie est en cours ET que l'on n'est pas en pause
    if (enJeu == true && enPause == false) {
        /* on parcours le tableau listeAsteroides  dans l'ordre (du haut au bas de la matrice de LEDs)
        Dans cette boucle, à chaque passage, i est l'index de l'astéroide que l'on traite. Si on a 3 
        astéroides dans le tableau, cette boucle ira de i=0 à i=2
        */
        for (let i = 0; i <= listeAsteroides.length - 1; i++) {
            // Traitement de lastéroide listeAsteroides[i]
            // si la position Y de l'astéroide >= 0 , on étaint la LED
            if (listeAsteroides[i][1] >= 0) {
                led.unplot(listeAsteroides[i][0], listeAsteroides[i][1])
            }
            
            // selon la position Y de l'astéroide à l'écran, on le traitera différement
            if (listeAsteroides[i][1] < 4) {
                // l'astéroide n'est pas sur la dernière ligne, on doit donc le faire avancer
                if (listeAsteroides[i][1] == 3 && listeAsteroides[i][0] == posX) {
                    // l'astéroide va arriver en ligne 4 et sa position X est celle du vaisseau du vaisseau = GAME OVER
                    gameOver()
                } else {
                    /* l'astéroide ne sort pas de l'écran et ne touche pas le vaisseau, on peut donc:
                    incrémenter la position Y
                    allumer la LED de nouvelle position de l'astéroide
                    */
                    listeAsteroides[i][1] += 1
                    led.plot(listeAsteroides[i][0], listeAsteroides[i][1])
                }
            } else {
                /* l'astéroide est sur dernière ligne, inutile de continuer à le traiter car il sort 
                de l'écran, on supprime l'entrée du tableau
                */
                listeAsteroides.removeAt(i)
            }
        }
    }
})


/********************************************************************************************************
*                   TOUT EST PRÊT, ON LANCE UNE PARTIE AU DEMARRAGE DE LA CARTE                         *
********************************************************************************************************/
startGame()
