const sum = require("./sum");

test('Properly adds numbers', () =>{
    expect(sum(1,3)).toBe(4);
});