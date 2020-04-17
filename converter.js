class converter {
    constructor() {
        
    }
    static multipliers = [
        {name: "k", value: 1024},
        {name: "M", value: 1024*1024}
    ];
    
    static units = [
        {name: "b", value: 1},
        {name: "B", value: 8},
        {name: "W", value: 64},
    ];

    
    static reduceAmount(amount, unit, set){
        const factor = set.find(m => unit.includes(m.name));
        if(typeof factor === 'undefined'){
            return amount;
        }
        return amount * factor.value;
    }

    static convertExplicit(amount, unit) {

        const example = [
            {amount: 1, unit: "B", asPower:3}
        ];
        return example;
    };
}


module.exports = converter;