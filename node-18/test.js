import test from "node:test"
import assert from "node:assert"

test('example test', () => {
  assert.equal(1, 1, '1 is not equal to 0')
})

test('example object test', () => {
  assert.deepEqual({a: 1}, {a: 1}, 'Objects are not equal')
})

test('async test example', async () => {
  const number = await Promise.resolve(3)
  assert.equal(number, 5, 'number ir not equal to 3')
})

test('try Array.findLast', () => {
  const numbers = [7, 6, 5, 4]
  const lastEven = numbers.findLast(n => n%2 === 0) // 4
  assert.equal(lastEven, 4)
})

test('try Array.findLastIndex', () => {
  const numbers = [7, 6, 5, 4]
  const lastEven = numbers.findLastIndex(n => n%2 === 0) // 3
  assert.equal(lastEven, 3)
})

test('fetch', async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
  const json = await response.json()
  assert.equal(json.name, 'ditto')
})