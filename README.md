# Sarsseeing
![](file:///C:/Users/adsilva/Documents/IronHack%20Work/logo.pdf)
***
[Click here to play](https://ferro-maljinn.github.io/Sarsseeing/)

## Introduction

Sarsseeing is a Side-Scrolling video game where players need to avoid colliding with viruses moving in from left to right.
Players can collect booster shots (max 3) to gain health points (HP), whereas they lose HP if colliding with a virus.
They can also collide with colorful looking masks, which makes the background music switch.
Sarsseeing is referring to the post lockdown when clubs started to reopen again.
Masks and sounds are referring to the most known techno/ electronic clubs in Berlin.

## Minimum Viable Product

* Player can move around the canvas (up, right, left, and down)
* Obstacles, Masks, and Booster Shots will generate from the right side of the canvas
* HP can be gained by collecting booster shots (max 3)
* The collision between the character and the virus triggers a decrease of 1 HP
* The Score increases each time a payer has dodged a virus
* If the players' HP is 0 it will trigger a game over

## Backlog

* make the game accessible for mobile
* add a high score
* add leader board
* add a score condition that will update the increment of viruses depending on the score
* implement the 6 different images of the character which will show it wearing the right mask the player collided with
* fix background music to stop on the game-over screen
* implement buildings of Berlin to round up the look and feel
* implement buffs and debuffs if a player collides with one of the masks

## Data Structure

* preload()
* setup()
* draw()    
* getRandomNum(max)
* pauseSound()
* gameOver()

## Screen States

* splashScreen   | gameIntro
* playScreen     |  gameBoard
* gameOverScreen | gameOver

## Task

* addArrayOfObstaclesAndObjects
* spawnNewRandomVaccine
* spawnNewRandomVirus
* spawnNewRandomMask
* createVirusAnimation
* addCollisionDetection
* addGameOverCondition
* addDeletionOfObstaclesAndObjects
* addCharacterMovement
* addScore
* addEventListener


## Attribution

#### Sound
Hintergrund Musik	| https://pixabay.com/de/sound-effects/2018-09-06-18223/ 

https://pixabay.com/de/sound-effects/watery-f-39417/ 
https://pixabay.com/de/sound-effects/warp-sfx-6897/ 
https://pixabay.com/de/sound-effects/deep-house-pluck-25180/ 
https://pixabay.com/de/sound-effects/loop4-25296/ 
https://pixabay.com/de/sound-effects/techno-house-beat-28885/ 
https://pixabay.com/de/sound-effects/cliche-techno-or-trance-loop-1-35250/ 
https://pixabay.com/de/sound-effects/club-wubs-loop-32945/ 
https://pixabay.com/de/sound-effects/trance-lead-140-bpm-33900/	 

#### Background GIF

https://gifer.com/en/7Ik1 

#### Software and Tools

* Visual Studio Code
* Github
* p5JS Library
* P5JS Web Editor
* Figma

#### Recourse

* [The Coding Train](https://www.youtube.com/c/TheCodingTrain)
* [Xin Xin](https://www.youtube.com/channel/UCufOCDs5G1A4AffwmeV0XBw)
* https://www.w3schools.com/ 
* https://developer.mozilla.org/en-US/ 
* https://p5js.org/ 
* https://stackoverflow.com/ 
