let easy = 1;
let intermediate = 2;
let medium = intermediate;
let expert = 3;
let hard = expert;

function difficulty(difficulty) {
    switch (difficulty) {
        case easy:
            width(9);
            height(9);
            bombs(10);
            break;

        case intermediate:
            width(16);
            height(16);
            bombs(40);
            break;

        case expert:
            width(30);
            height(16);
            bombs(99);
            break;
    }
}

function width(w) {
    TileManager.width = w;
}

function height(h) {
    TileManager.height = h;
}

function bombs(n) {
    TileManager.bombCount = n;
}

console.log("\n=== COMMANDS ===\n\ndifficulty(d: difficulty) -> set the difficulty (easy, intermediate, expert)\n\nwidth(w: integer) -> set the width\n\nheight(h: integer) -> set the height\n\n================\n");