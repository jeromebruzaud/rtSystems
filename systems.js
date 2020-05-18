// //TODO: fix Binary, include system feature conditions
import {Data} from "./data.js";

//---------------------------------
// Class Structure
/**
 * Dice class that simulate a single dice with the number of faces given at construction.
 */
class Dice {
    constructor(faces) {
        this.faces = faces;
    }

    roll() {
        return Math.floor(Math.random() * this.faces) + 1;
    }
}

/**
 * Function that simulate a roll with one or multiple dices of the same type and add a single modifier.
 * @param faces: (Int) Number of faces the dices have.
 * @param quantity: (Int) number of dices for the roll.
 * @param modifier: (Int) applied modifier
 * @returns the roll value (Int)
 */
let roll = (faces, quantity = 1, modifier = 0) => {
    let dice = new Dice(faces);
    let result = 0;
    for (let r = 0; r < quantity; r++) {
        result += dice.roll();
    }
    result += modifier;
    return result;
};

/**
 * Function that takes a String formula and returns the result of the roll
 * @param formula: String of the roll to execute. Must Have a quantity of dice, the dice face and a bonus (e.g 3d10+2)
 * @returns the roll value (Int)
 */
let rollf = function (formula) {
    let d = formula.toLowerCase().indexOf("d");
    let plus = formula.indexOf("+");
    let minus = formula.indexOf("-");

    let quantity, faces, bonus;
    if (d > -1) quantity = parseInt(formula.slice(0, d));

    faces = parseInt(formula.slice(d + 1, Math.max(plus, minus)>-1? Math.max(plus, minus) : undefined));
    if (plus > -1) {
        bonus = parseInt(formula.slice(plus + 1));
    } else if (minus > -1) {
        bonus = -parseInt(formula.slice(minus + 1));
    }
    return roll(faces, quantity, bonus);
}

class System {
    constructor() {
        this.stars = this.starGen();
        this.solarZones = this.defineSolarZones(this.stars);
        [this.innerElements, this.primaryElements, this.outerElements] = this.systemElemPop(this.solarZones);
        this.features = this.featuresGen();
    }

    starGen() {
        let getStarName = (roll) => Module.starTypes.find((s) => s.rollrange[0] <= roll && roll <= s.rollrange[1]).name

        let stars = [];
        let starTypeRoll = rollf("1d10");
        if (starTypeRoll <= 9) {
            stars.push(getStarName(starTypeRoll));
        } else {
            stars.push(getStarName(rollf("1d8")));
            if (rollf('1d10') <= 7) {
                // 2 stars of the same type
                stars = stars.concat(stars);
            } else {
                // 2 stars rolled independently
                stars.push(getStarName(rollf("1d8")));
                // put the main Star (with effect on the solar zone) first
                stars.sort((a, b) => Module.starTypes.indexOf(Module.starTypes.find((s) => s.name === a))
                    - Module.starTypes.indexOf(Module.starTypes.find((s) => s.name === b)))
            }
        }
        return stars;
    }

    defineSolarZones(stars) {
        // solar zone types are defined here but can be put somewhere el
        let starSolarZoneType = Module.starSolarZoneTypes.find((star) => {
            // get first solarZoneType which type matches the star type
            return star.type === stars[0];
        });
        return {
                    inner: starSolarZoneType.inner,
                    primary: starSolarZoneType.primary,
                    outer: starSolarZoneType.outer
                }
    }

    systemElemPop(solarZones) {
        let populateZone = (zone) => {
            let elements = [];
            for (let i = 0; i < Math.max(1, rollf(solarZones[zone].rollFormula)); i++) {
                let roll = rollf("1d100");
                elements.push(Module.systemElements.find((el) => {
                    return el[zone][0] <= roll && roll <= el[zone][1];
                }).name);
            }
            return elements;
        }

        return [
            populateZone("inner"),
            populateZone("primary"),
            populateZone("outer")
        ];
    }

    featuresGen() {
        let features = [];
        for (let i = 0; i < Math.max(1, rollf("1d5-2")); i++) {
            features.push(Module.systemFeatures[rollf("1d10") - 1].name);
        }
        return features;
    }

    // featureGen(roll) {
    //
    //     //Bountiful
    //     if (roll == 1) {
    //         let zonePlace = this.d3();
    //         if (zonePlace == 1) {
    //             this.innerElements.push('Asteroid Belt');
    //             console.log(`An asteroid belt detected in system interior`);
    //         } else if (zonePlace == 2) {
    //             this.primaryElements.push('Asteroid Belt');
    //             console.log(`An asteroid belt detected in system primary`);
    //         } else if (zonePlace == 3) {
    //             this.outerElements.push('Asteroid Belt')
    //             console.log('An asteroid belt detected in system exterior')
    //         }
    //         return "Bountiful"
    //         //Add 1 Asteroid belt/cluster to any 1 zone
    //     }
    //
    //     //Gravity Tides
    //     if (roll == 2) {
    //         let gravTides = this.d5();
    //         for (let i = 0; i < gravTides; i++) {
    //             const randZone = this.d10();
    //             if (randZone >= 7) {
    //                 console.log('Heavy gravity tides detected in outer zone');
    //                 this.outerElements.push('Gravity Tide');
    //             } else if (randZone >= 4) {
    //                 console.log('Heavy gravity tides detected in primary zone');
    //                 this.primaryElements.push('Gravity Tide');
    //             } else {
    //                 console.log('Heavy gravity tides detected in inner zone');
    //                 this.innerElements.push('Gravity Tide');
    //             }
    //         }
    //         return "Gravity Tides"
    //         //Add 1d5 Gravity Riptides distributed to any zones
    //     }
    //
    //     //Haven
    //     if (roll == 3) {
    //         //Add 1 Planet to each zone
    //         //this.outerElements.push(new OuterPlanet());
    //         //this.innerElements.push(new InnerPlanet());
    //         //this.primaryElements.push(new PrimaryPlanet());
    //         //Planets in Primary +1 to atmo, +2 to atmocomp, no idea how to implement
    //         //All planets add +2 to Hab, no idea how to implement
    //         console.log('Possible life-supporting planets detected in this system');
    //         return "Haven";
    //     }
    //
    //     //Ill-Omened
    //     if (roll == 4) {
    //         console.log('Crew cortisol and adrenaline hormones increased by 20%')
    //         return "Ill-Omened";
    //         //N/A
    //     }
    //
    //     //Pirate Den
    //     if (roll == 5) {
    //         console.log('Warning: Hostile ships detected');
    //         return "Pirate Den";
    //         //N/A
    //     }
    //
    //     //Ruined Empire
    //     if (roll == 6) {
    //         console.log('Unidentified structures detected');
    //         return "Ruined Empire";
    //         //N/A
    //     }
    //
    //     //Starfarers
    //     if (roll == 7) {
    //         // //find total number of planets
    //         // const totalSystemElements = this.innerElements.concat(this.outerElements, this.primaryElements);
    //         // let planetCount = 0;
    //         // for(let i=0; i<totalSystemElements; i++){
    //         //     if(typeof totalSystemElements[i] == 'object'){
    //         //         if(totalSystemElements[i].type = 'Rocky'){
    //         //             planetCount++
    //         //         }
    //         //     }
    //         // }
    //         // //if total number of Planets < 4, add (4-total) Planets
    //         // if(planetCount <4){
    //         //     console.log(planetCount);
    //         //     for(let i=0; i<4-planetCount; i++){
    //         //         let place = Math.floor(Math.random()*3)+1;
    //         //         if( place == 1){
    //         //             this.innerElements.push(new InnerPlanet());
    //         //         } else if(place == 2){
    //         //             this.primaryElements.push(new PrimaryPlanet());
    //         //         } else {
    //         //             this.outerElements.push(new OuterPlanet());
    //         //         }
    //         //     }
    //         // }
    //         console.log('Warning: Space Faring Society Detected');
    //         return "Starfarers";
    //         //minimum 4 planets
    //     }
    //
    //     //Stellar Anomaly
    //     if (roll == 8) {
    //         //find total number of Planets
    //         const totalSystemElements = this.innerElements.concat(this.outerElements, this.primaryElements);
    //         let planetCount = 0;
    //         for (let i = 0; i < totalSystemElements.length; i++) {
    //             if (typeof totalSystemElements[i] == 'object') {
    //                 if (totalSystemElements[i].type = 'Rocky') {
    //                     planetCount++
    //                 }
    //             }
    //         }
    //         //if total planets >= 2, remove 2 planets
    //         //if total planets = 1, remove planet
    //         //if total planets = 0, no change
    //
    //
    //         console.log('Warning: star flux and luminosity fluctuating outside normal constraints')
    //         return "Stellar Anomaly"
    //         //Minus 2 Planets (Min = 0)
    //     }
    //
    //     //Warp Stasis
    //     if (roll == 9) {
    //         console.log('Warning: Warp stability exceeds constraints');
    //         return "Warp Stasis";
    //         //N/A
    //     }
    //
    //     //Warp Turbulence
    //     if (roll == 10) {
    //         console.log('Warning: Warp instability exceeds constraints');
    //         return "Warp Turbulence";
    //         //N/A
    //     }
    // }

}

const SystemGen = new System();
console.log(SystemGen);

