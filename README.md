# rtSystems

The hitherto unnamed project is designed to emulate the behavior of the star system generator for the role playing game "Rogue Trader" as outlined in the book "Stars of Inequity" by Fantasy Flight Games (whose IP I DO NOT own, nor do I claim ownership of any IP under the Games Workshop company or it's affiliates, and have ZERO INTENTION of distributing this project for profit)

Basically, you hit the button, and it auto-generates a complete random system based on Tables 1-12 of the aforementioned book, a task that can take upwards of 2 hours if done by hand can now be done in seconds. 

Eventually I'd like to implement custom behavior (min/max habitable worlds, selecting a certain 'theme', etc) but for now just getting it up and running is enough for me. 

***Update***

Current application of method calls in the constructor does consistently populate the object in planet.js! Methods cannot, however, be called inside of methods, unless I'm completely misunderstanding something, so some roll calls are now hard-coded. This does not affect functionality. 

WWWW          WWWW
 WWW    WW    WWW
   WW   WW   WW
    WWW WW WWW
   WWWWWWWWWWWW
