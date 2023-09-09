class CombatManager {
    OnDeath = new _Event();
    
    constructor(parent) {
        this.parent = parent;
    }

    Damage(amount) {
        this.parent.defence -= amount;

        if (this.parent.defence <= 0) this.OnDeath.Invoke();
    }

    Stun(time) {
        let previousSpeed = this.parent.speed;
        this.parent.speed = 0;
        this.parent.stunned = true;

        setTimeout(() => {
            this.parent.speed = previousSpeed;
            this.parent.stunned = false;
        }, time);
    }
}