

const { describe } = require('node:test');
const MarkovMachine = require('./markov');


describe("Testing Markov Functions", function(){

    let generator;

    beforeAll(function(){
        generator = new MarkovMachine("the cat in the hat");
        generator.makeChains();
    })

    test("check function making the chains", function(){
        let ans = {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]};
        expect(generator.chains).toEqual(ans);
    });

    test("check that text generation follows markov rules", function(){
        
        let text = generator.makeText();
        let words = text.split(" ");
        let randomIndex = Math.trunc(words.length-1 * Math.random());

        expect(generator.chains[words[randomIndex]]).toContain(words[randomIndex+1] || null);
        expect(generator.chains["hat"][0]).toBe(null);
    });
});