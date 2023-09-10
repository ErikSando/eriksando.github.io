class ComputerPlayer extends UpdatesEachFrame {

}

class ComputerErik extends ComputerPlayer {
    constructor(position, ID, scene) {
        super(position, ID, scene, CharacterAnimations.Erik, CharacterStats.Erik);
    }
}

class ComputerSavas extends ComputerPlayer {
    constructor(position, ID, scene) {
        super(position, ID, scene, CharacterAnimations.Savas, CharacterStats.Savas);
    }
}

class ComputerNythan extends ComputerPlayer {
    constructor(position, ID, scene) {
        super(position, ID, scene, CharacterAnimations.Nythan, CharacterStats.Nythan);
    }
}

class ComputerEryx extends ComputerPlayer {
    constructor(position, ID, scene) {
        super(position, ID, scene, CharacterAnimations.Eryx, CharacterStats.Eryx);
    }
}