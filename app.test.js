
const { mean, mode, median } = require("./app")


describe("mean function", function (){
    let nums="5,10,15,20,25,30";

    test('finds the correct average', function(){
        expect(mean(nums)).toEqual(17.5)
        expect(mean(nums)).not.toEqual(30)
        
    })
})

describe("mode function", function (){
    let nums="5,10,7,7,25,30";

    test('finds the correct mode', function(){
        expect(mode(nums)).toEqual(["7"])
        expect(mode(nums)).not.toEqual(["30"])
        expect(mode(nums)).toBeInstanceOf(Array)

        
    })
})

describe("median function", function (){
    let nums="5,10,20,7,3";

    test('finds the correct mode', function(){
        expect(median(nums)).toEqual(7)
        expect(median(nums)).not.toEqual(20)
        
    })
})