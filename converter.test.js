const converter = require('./converter');


test('covertion from explicit amount', () => {
    const eightBits = [
        {amount: 1, unit: "B", asPower:3}
    ];
    expect(converter.convertExplicit(8, "b")).toStrictEqual(eightBits);

});
