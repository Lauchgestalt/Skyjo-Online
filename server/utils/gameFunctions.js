/**
 * This file contains all the functions that are called when an event occurs in the game.
*/

/**
 * This function generates a shuffled deck for a new game.
 * The deck consists of 5x `-2`, 15x `0`, 10x `-1` and 10x `1`-`12`.
 * @returns {Array} An array of card objects.
 * @example
 * generateShuffledDeck();
 * => [0, 8, -2, 12, 8, 2, 4, 0, -1, ...]
 * 
*/
function generateShuffledDeck() {
    const deck = []
    for (let i = 0; i < 5; i++) {
        deck.push(-2)
    }
    for (let i = 0; i < 15; i++) {
        deck.push(0)
    }
    for (let i = 0; i < 10; i++) {
        deck.push(-1)
    }
    for (let i = 0; i < 10; i++) {
        for (let j = 1; j <= 12; j++) {
            deck.push(j)
        }
    }

    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
    }

    return deck
}

/**
 * This function initializes a new game.
 * @returns {Object} An object containing the game state.
 * @example
 * initializeNewGame();
 * => { deck: [0, 8, -2, 12, 8, 2, 4, 0, -1, ...], players: {} }
*/
function initializeNewGame() {
    return {
        deck: generateShuffledDeck(),
        players: {},
        discardPile: [deck.pop()],
        currentPlayer: null,
        gameState: 'waiting',
    }
}