const converter = require('./converter');
const sorter = function(a, b){
    if(a.amount < b.amount){
        return 1;
    }else{
        return -1;
    }
 }
 
test('reduce amount by given unit', () => {
    expect(converter.reduceAmount(16, "b", converter.multipliers)).toBe(16);
    expect(converter.reduceAmount(1, "kb", converter.multipliers)).toBe(1024);
    expect(converter.reduceAmount(1, "kW", converter.multipliers)).toBe(1024);
    expect(converter.reduceAmount(2, "MB", converter.multipliers)).toBe(2*1024*1024);
});

test('convert amount to bits', () => {
    expect(converter.convertToBits(1, "b")).toBe(1);
    expect(converter.convertToBits(1, "B")).toBe(8);
    expect(converter.convertToBits(1, "kb")).toBe(1024);
    expect(converter.convertToBits(10, "kB")).toBe(10*1024*8);
    expect(converter.convertToBits(3, "kW")).toBe(3*1024*8*8);
    expect(converter.convertToBits(1, "MW")).toBe(1024*1024*8*8);
});

test('covertion from explicit amount', () => {
    const eightBits = [
        {amount: 8, unit: 'b', asPower: 3},
        {amount: 1, unit: "B", asPower:0}
    ].sort(sorter);
    expect(converter.convertExplicit(8, "b")).toStrictEqual(eightBits);

    const oneKiloBit = [
        {amount: 1, unit: "kb", asPower:0},
        {amount: 1024, unit: "b", asPower:10}, 
        {amount: 128, unit: "B", asPower:7}, 
        {amount: 16, unit: "W", asPower:4}
    ].sort(sorter);
    expect(converter.convertExplicit(1, "kb")).toStrictEqual(oneKiloBit);

    const fourKiloBytes = [
        {amount: 32, unit: "kb", asPower:5},
        {amount: 32768, unit: "b", asPower:15},
        {amount: 4096, unit: "B", asPower:12}, 
        {amount: 4, unit: "kB", asPower:2}, 
        {amount: 512, unit: "W", asPower:9}
    ].sort(sorter);
    expect(converter.convertExplicit(4, "kB")).toStrictEqual(fourKiloBytes);

    const nonstandardvalue = [
        {amount: 3, unit: "kb", asPower: {amount: 3, power: 0}},
        {amount: 3072, unit: "b", asPower: {amount: 3, power: 10}},
        {amount: 384, unit: "B", asPower: {amount: 3, power: 7}},
        {amount: 48, unit: "W", asPower: {amount: 3, power: 4}}
    ].sort(sorter);
    expect(converter.convertExplicit(3, "kb")).toStrictEqual(nonstandardvalue);

});

test('filter out multipliers that can be applied to given number of bits', () => {
    const sixteenbit = [{name: "", value: 1}];
    expect(converter.filterFittingMultipliers(16, converter.multipliers)).toStrictEqual(sixteenbit);
    const example = [
        {name: "k", value: 1024},
        {name: "", value: 1}
    ];
    expect(converter.filterFittingMultipliers(1024, converter.multipliers)).toStrictEqual(example);

    const example1 = [
        {name: "k", value: 1024},
        {name: "M", value: 1024*1024},
        {name: "", value: 1}
    ];
    expect(converter.filterFittingMultipliers(1024*1024, converter.multipliers)).toStrictEqual(example1);

});

test('convert from power based value', () => {
    const eightBits = [
        {amount: 8, unit: 'b', asPower: 3},
        {amount: 1, unit: "B", asPower:0}
    ].sort(sorter);
    expect(converter.convertFromPower(3, "b")).toStrictEqual(eightBits);

    const oneKiloBit = [
        {amount: 1, unit: "kb", asPower:0},
        {amount: 1024, unit: "b", asPower:10}, 
        {amount: 128, unit: "B", asPower:7}, 
        {amount: 16, unit: "W", asPower:4}
    ].sort(sorter);
    expect(converter.convertFromPower(10, "b")).toStrictEqual(oneKiloBit);

    const fourKiloBytes = [
        {amount: 32, unit: "kb", asPower:5},
        {amount: 32768, unit: "b", asPower:15},
        {amount: 4096, unit: "B", asPower:12}, 
        {amount: 4, unit: "kB", asPower:2}, 
        {amount: 512, unit: "W", asPower:9}
    ].sort(sorter);
    expect(converter.convertFromPower(12, "B")).toStrictEqual(fourKiloBytes);
});





test('detect power', () => {
    const example = {amount: 3, power: 0}; // 3* 2^0 kb
    expect(converter.detectPower(3*1024, {name: "b", value: 1}, {name: "k", value: 1024})).toStrictEqual(example);
    
    const example1 = {amount: 3, power: 10}; // 3 * 2^10 B
    expect(converter.detectPower(24*1024, {name: "B", value: 8}, {name: "", value: 1})).toStrictEqual(example1);

    const example1b = {amount: 3, power: 13}; // 3 * 2^13 b
    expect(converter.detectPower(24*1024, {name: "b", value: 1}, {name: "", value: 1})).toStrictEqual(example1b);

    const example2 = {amount: 3, power: 3}; // 3 * 2^3 Mb
    expect(converter.detectPower(24*1024*1024, {name: "b", value: 1}, {name: "M", value: 1024*1024})).toStrictEqual(example2);

    const example3 = {amount: 3, power: 7}; // 3 * 2^7 B
    expect(converter.detectPower(3*1024, {name: "B", value: 8}, {name: "", value: 1})).toStrictEqual(example3);

    const example4 = {amount: 5, power: 10}; // 5 * 2^10 kb
    expect(converter.detectPower(5*1024*1024, {name: "b", value: 1}, {name: "k", value: 1024})).toStrictEqual(example4);

});