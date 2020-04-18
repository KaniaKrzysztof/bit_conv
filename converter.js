class converter {
    constructor() {
        
    }
    static K_STANDARD = 1024;

    static multipliers = [
        {name: "k", value: this.K_STANDARD},
        {name: "M", value: this.K_STANDARD*this.K_STANDARD},
        {name: "", value: 1}
    ];
    
    static units = [
        {name: "b", value: 1},
        {name: "B", value: 8},
        {name: "W", value: 64},
    ];

    static sorter(a, b){
       if(a.amount < b.amount){
           return 1;
       }else{
           return -1;
       }
    }

    static tryConvertTo
    
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

        return values.sort(this.sorter);
    };

    static convertFromPower(power, unit) {
        return converter.convertExplicit(Math.pow(2, power), unit);
    };

    static detectPower(amountOfBits, unit, multi){
        let asPower = Math.log2((amountOfBits/unit.value)/multi.value);
        if(Number.isInteger(asPower)){
            return asPower;
        }else{
            const bits = amountOfBits/multi.value;
            
            const bitsConvertedToUnit = bits/unit.value;

            let power = 0;

            while(Number.isInteger(bitsConvertedToUnit/Math.pow(2,power))){
                power++;
            }
            

            let am = bitsConvertedToUnit/Math.pow(2,power-1);
            console.log("all bits = ", amountOfBits, ", bits = ", bits, ", conv = ", bitsConvertedToUnit, ", power = ", power, ", am = ", am);
            return {amount: am, power: power-1};
        }
    }

}


module.exports = converter;