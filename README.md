# Tic Tac Toe Game 🎮

A simple browser-based **Tic Tac Toe** game built using **HTML, CSS, and vanilla JavaScript**.  
The project focuses on clean separation of concerns using **factory functions** and the **module pattern**.

This game allows two players to enter their names, take turns, and play Tic Tac Toe on a 3×3 grid.

---

## Features ✨

- Two-player gameplay
- Custom player names
- Turn-based logic
- Win detection (rows, columns, diagonals)
- Tie detection
- Reset game functionality
- Modular JavaScript architecture

---

## Project Structure 📁

- index.html
- style.css
- script.js

---


### JavaScript Modules Overview

- **`gameBoardModule`**
  - Stores the internal game board state in a 2D array.

- **`playerFactory`**
  - Creates player objects with a name and marker (`X` or `O`).

- **`gameController`**
  - Handles game logic:
    - Starting the game
    - Switching turns
    - Validating moves
    - Checking for wins and ties

- **`displayController`**
  - Handles UI updates:
    - Rendering markers on the board
    - Resetting the board
    - Listening for user interactions via event delegation

---

## How to Play ▶️

1. Enter names for **Player 1** and **Player 2**
2. Click **Start Game**
3. Players take turns clicking cells on the board
4. The game announces:
   - A winner 🎉  
   - Or a tie 🤝
5. Click **Reset Game** to start over

---

## Technologies Used 🛠️

- HTML5
- CSS3
- JavaScript (ES6)
- Module Pattern
- Factory Functions
- Event Delegation

---

## Known Issues & Limitations ⚠️

- The game board is visible before clicking **Start Game**
- Some DOM manipulation logic exists inside `gameController`
- Minimal inline comments (planned improvement)

---

## Future Improvements & Upgrades 🚀

Planned enhancements for future versions:

### Refactoring & Code Quality
- Move all **DOM manipulation logic** out of `gameController` and fully into `displayController`
- Improve separation of concerns between game logic and UI logic
- Add meaningful comments throughout the codebase for better readability and maintainability

### UI & UX Enhancements
- Hide the Tic Tac Toe board by default
- Display the board **only after clicking “Start Game”**
- Improve visual feedback for:
  - Active player turn
  - Game over state

### Features
- Prevent starting the game without entering player names
- Add a restart confirmation modal
- Add score tracking for multiple rounds
- Optional AI opponent mode (single-player)

---

## Learning Goals 📚

This project was built to practice:
- JavaScript modules and closures
- Factory functions
- Event delegation
- Game state management
- Clean code organization

---

## License 📄

This project is open-source and available for learning and experimentation.
