const converter = require('./converter');


test('reduce amount by given unit', () => {
    expect(converter.reduceAmount(16, "b", converter.multipliers)).toBe(16);
    expect(converter.reduceAmount(1, "kb", converter.multipliers)).toBe(1024);
    expect(converter.reduceAmount(1, "kW", converter.multipliers)).toBe(1024);
    expect(converter.reduceAmount(2, "MB", converter.multipliers)).toBe(2097152);
});

test('convert amount to bits', () => {
    expect(converter.convertToBits(1, "B")).toBe(8);
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
