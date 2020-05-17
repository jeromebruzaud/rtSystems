# rtSystems

The hitherto unnamed project is designed to emulate the behavior of the star system generator for the role playing game "Rogue Trader" as outlined in the book "Stars of Inequity" by Fantasy Flight Games (whose IP I DO NOT own, nor do I claim ownership of any IP under the Games Workshop company or it's affiliates, and have ZERO INTENTION of distributing this project for profit)

Basically, you hit the button, and it auto-generates a complete random system based on Tables 1-12 of the aforementioned book, a task that can take upwards of 2 hours if done by hand can now be done in seconds. 

Eventually I'd like to implement custom behavior (min/max habitable worlds, selecting a certain 'theme', etc) but for now just getting it up and running is enough for me. 

***Update***

05/12/2020: Current application of method calls in the constructor does consistently populate the object in planet.js! Methods cannot, however, be called inside of methods, unless the call in the method is also appended with this 

(  ex. if(roll==10){
            let binary=[]
            binary[0]=starGen(this.d9())
            binary[1]=starGen(this.d9())
            return binary
        }                                )

WWWW          WWWW
 WWW    WW    WWW
   WW   WW   WW
    WWW WW WWW
   WWWWWWWWWWWW

05/14/2020: Re-factored Planets into different subclasses for proper climate functionality

Big new feature: 
MOONS! Moons work just dandy. I'm going to interperate cases such as "low mass" planet and "vast" moon to be similar to pluto and charon: charon's big for a moon and pluto's small for a planet. No messy added spaghetti to this table!

05/16 new feature:
GAS GIANTS! A whole new class and two subclasses

Implemented Star Farers (functionality available upon page link)

05/17 new Class System: 
System.js now utilizes 1 class and 10 subclasses to express System Feature Functionality
All the constructors are now implemented and ready for testing, except for Stellar Anomaly functionality
(So much code and all I need is to change two entries in the orbital features! --Minus 2 planets min 0) 

TODOS: 
-Fix/cleanup Stellar Anomaly functionality in Systems 

-Link the two pages (testing w/import and export gave back errors I didn't understand)

-Actually populate planets instead of pushing 'Planet' in System orbital features once linked


and THAT'S IT for the javascript portion of the code! Then we can move on to populating the HTML document and designing that while we figure out the server side portion of things. 


