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
});
