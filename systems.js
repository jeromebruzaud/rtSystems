// //TODO: fix Binary, include system feature conditions
import {Data} from "./data.js";

/**
 * Utility function that return the attribute's name in the Array `list` which match the rolled `roll` number value.
 * Each attribute has a range between 2 numbers. If the roll falls in this range then the attribute's name is returned.
 * @param list: Array of objects    The Array containing the attributes to select.
 * @param rangeattr: {String}       Name of the range variable name for this list.
 * @param roll:{Number}             Result of the roll.
 * @returns {String}                Name of the attribute
 */
let findDataElementRange = (list, rangeattr, roll) => {
    if (list instanceof Array) {
        return list.find((s) => s[rangeattr][0] <= roll && roll <= s[rangeattr][1]).name;
    }
}
/**
 * Function that simulate a roll with one or multiple dices of the same type and add a single modifier.
 * @param faces: (Int) Number of faces the dices have.
 * @param quantity: {Number}        number of dices for the roll.
 * @param modifier: {Number}        applied modifier
 * @returns {Number}    result      the roll value (Int)
 */
let roll = (faces, quantity = 1, modifier = 0) => {
    let rollDice = faces => Math.floor(Math.random() * faces) + 1;

    let result = 0;
    for (let r = 0; r < quantity; r++) {
        result += rollDice(faces);
    }
    result += modifier;
    return result;
};

/**
 * Function that takes a String formula and returns the result of the roll
 * @param formula: {String}     written formula of the roll to execute. Must Have a quantity of dice,
 * the dice face and a bonus (e.g 3d10+2)
 * @returns {Number}            the roll value (Int)
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

/**
 * System construction class. Contains the logic to build a system as described in pages 6 - 18 of
 * "Stars of Inequity" book supplement for Warhammer 40,000 Rogue Trader Roleplaying Game.
 */
class System {
    constructor() {
        this.stars = this.starGen();
        this.solarZones = this.defineSolarZones(this.stars);
        [this.innerElements, this.primaryElements, this.outerElements] = this.systemElemPop(this.solarZones);
        this.features = this.featuresGen();
    }

    starGen() {
        let stars = [];
        let starTypeRoll = rollf("1d10");
        // if roll 1 to 9, get one star, if roll 10, get 2 stars
        if (starTypeRoll <= 9) {
            stars.push(findDataElementRange(Data.starTypes, "rollrange", starTypeRoll));
        } else {
            stars.push(findDataElementRange(Data.starTypes, "rollrange", rollf("1d8")));
            // new roll. If below 7, the 2 stars are of the same type. Otherwise, each is rolled independently
            if (rollf('1d10') <= 7) {
                // the 2 stars of the same type
                stars = stars.concat(stars);
            } else {
                // the 2 stars rolled independently
                stars.push(findDataElementRange(Data.starTypes, "rollrange", rollf("1d8")));
                // put the main Star (which defines the solar zone) first in the list
                stars.sort((a, b) => Data.starTypes.indexOf(
                    Data.starTypes.find((s) => s.name === a))
                    - Data.starTypes.indexOf(
                        Data.starTypes.find((s) => s.name === b)))
            }
        }
        return stars;
    }

    /**
     * Returns the main star's solar zone types.
     * @param stars: {String}       Star's type name
     * @returns {Object}            Object containing the solar zone types
     */
    defineSolarZones(stars) {
        // solar zone types are defined here but can be put somewhere el
        let starSolarZoneType = Data.starSolarZoneTypes.find((star) => {
            // get first solarZoneType which type matches the star type
            return star.type === stars[0];
        });
        return {
                    inner: starSolarZoneType.inner,
                    primary: starSolarZoneType.primary,
                    outer: starSolarZoneType.outer
                }
    }

    /**
     * Populate the system with elements (planets, and stuff) based on the solar zones.
     * @param solarZones: {Object}  solar zones.
     * @returns [[elements]]        a list of the elements for each solar zone
     */
    systemElemPop(solarZones) {
        let populateZone = (zone) => {
            let elements = [];
            for (let i = 0; i < Math.max(1, rollf(solarZones[zone].rollFormula)); i++) {
                let roll = rollf("1d100");
                elements.push(Data.systemElements.find((el) => {
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

    /**
     * Get the star system features names, rolled randomly as described page 8.
     * @returns {[String]}  features    List of the features names.
     */
    featuresGen() {
        let features = [];
        for (let i = 0; i < Math.max(1, rollf("1d5-2")); i++) {
            features.push(Data.systemFeatures[rollf("1d10") - 1].name);
        }
        return features;
    }
}

const SystemGen = new System();
console.log(SystemGen);

