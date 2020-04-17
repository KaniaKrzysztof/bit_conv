const converter = require('./converter');


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
        {amount: 1, unit: "B", asPower:3}
    ];
    expect(converter.convertExplicit(8, "b")).toStrictEqual(eightBits);

    const oneKiloBit = [
        {amount: 1024, unit: "b", asPower:10}, 
        {amount: 128, unit: "B", asPower:7}, 
        {amount: 16, unit: "W", asPower:4}
    ];
    expect(converter.convertExplicit(1, "kb")).toStrictEqual(oneKiloBit);

    const fourKiloBytes = [
        {amount: 32768, unit: "b", asPower:10},
        {amount: 32, unit: "kb", asPower:5},
        {amount: 4096, unit: "B", asPower:12}, 
        {amount: 4, unit: "kB", asPower:2}, 
        {amount: 512, unit: "W", asPower:9}
    ];
    expect(converter.convertExplicit(4, "kB")).toStrictEqual(fourKiloBytes);
});
