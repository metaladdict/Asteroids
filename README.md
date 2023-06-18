# :rocket: Asteroids

Code pour le jeu asteroids sur micro:bit.   
Retrouvez :  
- le post associé sur [metalmonkey.eu](https://www.metalmonkey.eu/2023/06/asteroid-sur-microbit/)
- le test de la version de base sur [makecode](https://makecode.microbit.org/_XaCXXCiz0hTW)

## :card_index: Liste des versions
| Fichier | Contenu |
| --- | --- |
| jeu_commente.ts | Code du jeu de base, commenté |
| jeu_score.ts | Version avec code implémenté |
| jeu_noborder.ts | Passage d'un côté de la matrice à l'autre |
| jeu_son.ts | Ajout de sons |
| jeu_acceleration.ts | Version avec accélération |
| jeu_complet.ts | Jeu complet avec toutes les évolutions |


## :bulb: Pour aller plus loin
- [X] ajouter un score
- [X] ajouter du son
- [ ] utiliser le gyroscope pour avancer/reculer le vaisseau
- [ ] utiliser la radio pour augmenter la surface de jeu sur plusieurs cartes
- [X] accelérer le jeu
- [ ] ajouter des options sur la pause
- [ ] augmenter les points à l'accélération


## :thumbsdown: Problème à auditer
Avec le son de début de jeu, si on appuie sur un bouton avant l'apparition du premier astéroïde, la carte bug
