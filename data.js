const solarZoneType = {
    WEAK: {name: "weak", rollFormula: "1d5-2"},
    DOMINANT: {name: "dominant", rollFormula: "1d5+2"},
    NORMAL: {name: "normal", rollFormula: "1d5"},
}

export const Data = {

    starTypes: [
        {name: "Mighty", rollrange: [1, 1]},
        {name: "Vigorous", rollrange: [2, 4]},
        {name: "Luminous", rollrange: [5, 7]},
        {name: "Dull", rollrange: [8, 8]},
        {name: "Anomalous", rollrange: [9, 9]}
    ],

    solarZoneType: {
        WEAK: {name: "weak", rollFormula: "1d5-2"},
        DOMINANT: {name: "dominant", rollFormula: "1d5+2"},
        NORMAL: {name: "normal", rollFormula: "1d5"},
    },

    starSolarZoneTypes: [
        {
            type: "Mighty",
            inner: solarZoneType.DOMINANT,
            primary: solarZoneType.WEAK,
            outer: solarZoneType.NORMAL
        },
        {
            type: "Vigorous",
            inner: solarZoneType.NORMAL,
            primary: solarZoneType.NORMAL,
            outer: solarZoneType.NORMAL,
        },
        {
            type: "Luminous",
            inner: solarZoneType.WEAK,
            primary: solarZoneType.NORMAL,
            outer: solarZoneType.NORMAL
        },
        {
            type: "Dull",
            inner: solarZoneType.NORMAL,
            primary: solarZoneType.NORMAL,
            outer: solarZoneType.DOMINANT
        },
        {
            type: "Anomalous",
            inner: solarZoneType.NORMAL,
            primary: solarZoneType.NORMAL,
            outer: solarZoneType.NORMAL
        },
    ],

    systemElements: [
        {
            name: "No Feature",
            inner: [1, 20],
            primary: [1, 20],
            outer: [1, 20]
        },
        {
            name: "Asteroid Cluster",
            inner: [21, 29],
            primary: [31, 41],
            outer: [30, 40]
        },
        {
            name: "Asteroid Belt",
            inner: [0, 0],
            primary: [21, 30],
            outer: [21, 29]
        },
        {
            name: "Dust Cloud",
            inner: [30, 41],
            primary: [48, 58],
            outer: [47, 55]
        },
        {
            name: "Derelict Station",
            inner: [0, 0],
            primary: [42, 47],
            outer: [41, 46]
        },
        {
            name: "Gas Giant",
            inner: [42, 45],
            primary: [0, 0],
            outer: [56, 73]
        },
        {
            name: "Gravity Raptide",
            inner: [46, 56],
            primary: [59, 64],
            outer: [74, 80]
        },
        {
            name: "Planet",
            inner: [57, 76],
            primary: [65, 93],
            outer: [81, 93]
        },
        {
            name: "Radiation Bursts",
            inner: [77, 88],
            primary: [0, 0],
            outer: [0, 0]
        },
        {
            name: "Solar Flares",
            inner: [89, 100],
            primary: [0, 0],
            outer: [0, 0]
        },

        {
            name: "Starship Graveyard",
            inner: [0, 0],
            primary: [94, 100],
            outer: [94, 100]
        }
    ],

    systemFeatures: [
        {name: "Bountiful", rollrange: [1, 1]},
        {name: "Gravity Tides", rollrange: [2, 2]},
        {name: "Haven", rollrange: [3, 3]},
        {name: "Ill-Omened", rollrange: [4, 4]},
        {name: "Pirate Den", rollrange: [5, 5]},
        {name: "Ruined Empire", rollrange: [6, 6]},
        {name: "Starfares", rollrange: [7, 7]},
        {name: "Stellar Anomaly", rollrange: [8, 8]},
        {name: "Warp Stasis", rollrange: [9, 9]},
        {name: "Warp Turbulence", rollrange: [10, 10]}
    ]
}
