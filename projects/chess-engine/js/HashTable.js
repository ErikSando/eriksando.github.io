class HashTable { // Hash table doesn't effect search at all, maybe the position key isnt being updated properly?
    Age = 0;

    constructor(size) {
        this.Entries = new Array(size);

        for (let i = 0; i < this.Entries.length; i++) {
            this.Entries[i] = {
                Move: NoMove,
                Score: 0,
                Depth: 0,
                Flag: HashFlag.None,
                Age: 0,
                PositionKey: 0,
            }
        }
    }

    GetEntry(alpha, beta, depth) {
        let index = Board.PositionKey % this.Entries.length;
        let entry = this.Entries[index];

        if (entry.PositionKey == Board.PositionKey) {
            if (entry.depth >= depth) {
                let score = entry.score;

                switch (entry.flag) {
                    case HashFlag.Exact:
                        if (score > MateScore) score -= Board.Ply;
                        else if (score < -MateScore) score += Board.Ply;

                        return score;

                    case HashFlag.Alpha:
                        if (score <= alpha) return alpha;
                        break;

                    case HashFlag.Beta:
                        if (score >= beta) return beta;
                        break;
                }
            }
        }

        return NoScore;
    }

    StoreEntry(move, score, depth, flag) {
        let index = Board.PositionKey % this.Entries.length;
        let entry = this.Entries[index];

        let replace = false;

        if (this.Entries[index].PositionKey == 0 ||
            this.Entries[index].Age < this.Age ||
            this.Entries[index].Depth <= depth) replace = true;

        if (!replace) return;

        if (score > MateScore) score += Board.Ply;
        else if (score < -MateScore) score -= Board.Ply;

        entry.PositionKey = Board.PositionKey;
        entry.Move = move;
        entry.Score = score;
        entry.Depth = depth;
        entry.Flag = flag;
        entry.Age = this.Age;
    }
}