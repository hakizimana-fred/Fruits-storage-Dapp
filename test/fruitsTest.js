const FruitsStorage = artifacts.require('FruitsStorage')

contract('Fruits', () => {
    let fruitsStorage = null
    before(async() => {
       fruitsStorage = await FruitsStorage.deployed() 
    })

    it ('Should add a fruit', async () => {
        await fruitsStorage.addFruit('Tomato')
        const fruit = await fruitsStorage.getFruit(0)
        assert(fruit === 'Tomato') 
    })

    it ('Should get a fruit', async () => {
        await fruitsStorage.addFruit('Apple')
        const fruit = await fruitsStorage.getFruit(1)
        assert(fruit === 'Apple') 
    })

    it ('Should get all fruits', async () => {
        const fruits = await fruitsStorage.getAllFruits()
        const mapped = fruits.map(fruit => fruit)
        assert.deepEqual(mapped, ['Tomato', 'Apple'])
    })

    it ('Should delete a fruit', async () => {
        const fruits = await fruitsStorage.deleteFruit(1)
        const results = await fruitsStorage.getAllFruits()
        assert.deepEqual(results, ['Tomato'])
    })

    it ('Should get fruits length', async () => { 
        const fruits = await fruitsStorage.getAllFruits()
        assert(fruits.length === 1)
    })
})