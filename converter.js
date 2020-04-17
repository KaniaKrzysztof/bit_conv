class converter {
    constructor() {
        
    }
    static multipliers = [
        {name: "k", value: 1024},
        {name: "M", value: 1024*1024},
        {name: "", value: 1}
    ];
    
    static units = [
        {name: "b", value: 1},
        {name: "B", value: 8},
        {name: "W", value: 64},
    ];

    static sorter(a, b){
        if(a.amount > b.amount){
            return 1;
        }else if(a.amount == b.amount){
            return (a.unit > b.unit);
        }else{
            return -1;
        }
    }
    
    static convertToBits(amount, unit){
        const convertedToBits = [this.multipliers, this.units].reduce(
                (previousAmount, currentSet) => converter.reduceAmount(previousAmount, unit, currentSet)
            , amount);
        return convertedToBits;
    }

    static reduceAmount(amount, unit, set){
        const factor = set.find(m => unit.includes(m.name));
        return amount * factor.value;
    }

    static filterFittingMultipliers(amount, set){
        return  set.filter(m => (amount % m.value) == 0);
    }
    

    static convertExplicit(amount, unit) {
        const amountOfBits = converter.convertToBits(amount, unit);

        const values = converter.filterFittingMultipliers(amountOfBits, this.units)
            .map(unit => 
                converter.filterFittingMultipliers(amountOfBits/unit.value, this.multipliers)
                    .map(multi => {
                        return {
                            amount: (amountOfBits/unit.value)/multi.value,
                            unit: multi.name + unit.name,
                            asPower: Math.log2((amountOfBits/unit.value)/multi.value)
                            };
                    })
            ).reduce((a, b) => a.concat(b));
        return values.sort(converter.sorter);
    };
}


module.exports = converter;