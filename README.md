# :rocket: Asteroids

Code pour le jeu asteroids sur micro:bit.   
Retrouvez :  
- le post associé sur [metalmonkey.eu](https://www.metalmonkey.eu/2023/06/asteroid-sur-microbit/)
- le test de la version de base sur [makecode](https://makecode.microbit.org/_XaCXXCiz0hTW)

## :card_index: Liste des versions
| Fichier | Contenu | Tester |
| --- | --- | --- |
| jeu_commente.ts | Code du jeu de base, commenté | [makecode](https://makecode.microbit.org/_4zcF1gfMP8PV) |
| jeu_score.ts | Version avec code implémenté | [makecode](https://makecode.microbit.org/_gxhW6P3z1CfX) |
| jeu_noborder.ts | Passage d'un côté de la matrice à l'autre | [makecode](https://makecode.microbit.org/_3gXAwkJ9FR2w) |
| jeu_son.ts | Ajout de sons | [makecode](https://makecode.microbit.org/_fRx9WD0xd1cr) |
| jeu_acceleration.ts | Version avec accélération | [makecode](https://makecode.microbit.org/_Hpq6v3Ev8TE3) |
| jeu_complet.ts | Jeu complet | [makecode](https://makecode.microbit.org/_LH86oDAscaUs) |
  
Le jeu complet est la version ammenée à évoluer pour équilibrer l'accéleration, le scoring ...  

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
