// pause(seconds) allow for dramatic pauses in the text output of the battle.
const pause = seconds => {
  let now = Date.now();
  while (Date.now() - now < seconds * 1000);
};

class GameObject {
  constructor(atts) {
    this.createdAt = atts.createdAt;
    this.dimensions = atts.dimensions;
  }
  destroy() {
    return `${this.name} was removed from the game.\n`;
  }
}

class CharacterStats extends GameObject {
  constructor(atts) {
    super(atts);
    this.healthPoints = atts.healthPoints;
    this.name = atts.name;
  }
  takeDamage() {
    return `${this.name} took damage.`;
  }
}

class Humanoid extends CharacterStats {
  constructor(atts) {
    super(atts);
    this.team = atts.team;
    this.weapons = atts.weapons;
    this.languages = atts.languages;
  }
  greet() {
    return `${this.name} offers a greeting in ${
      this.languages[
        Math.floor(Math.random() * Math.floor(this.languages.length))
      ]
    }.`;
  }
}

const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1
  },
  healthPoints: 5,
  name: "Bruce",
  team: "Mage Guild",
  weapons: ["Staff of Shamalama"],
  languages: ["Common Tongue", "Scarred Tongue", "Rudimentary Telepathy"]
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  healthPoints: 15,
  name: "Sir Mustachio",
  team: "The Round Table",
  weapons: ["Giant Sword", "Shield"],
  languages: ["Common Tongue"]
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 10,
  name: "Lilith",
  team: "Forest Kingdom",
  weapons: ["Bow", "Dagger"],
  languages: ["Elvish", "Common Tongue"]
});

class Villain extends Humanoid {
  constructor(atts) {
    super(atts);
    this.taunt = atts.taunt;
    this.secretWeapon = atts.secretWeapon;
  }
  speakTaunt() {
    console.log(`${this.name}: ${this.taunt}\n`);
  }
}

class Hero extends Humanoid {
  constructor(atts) {
    super(atts);
    this.battleCry = atts.battleCry;
    this.superWeapon = atts.superWeapon;
  }
  speakBattleCry() {
    console.log(`${this.name}: ${this.battleCry}\n`);
  }
}

const argoroth = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 3,
    height: 7
  },
  healthPoints: 40,
  name: "Argoroth",
  team: "Hell's Middlemen",
  weapons: ["Charred Bone Katana", "Bloody Morning Star"],
  languages: ["Common Tongue", "Scarred Tongue", "Old Elvish", "Telepathy"],
  taunt: "You likely will not live to regret your decision.",
  secretWeapon: "Poisoned Ceremonial Dagger"
});

const glasowyn = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 1,
    height: 8
  },
  healthPoints: 30,
  name: "Glasowyn",
  team: "Deldien",
  weapons: ["Mace of Serenity", "Cutlass"],
  languages: ["Elvish", "Common Tongue", "Old Elvish", "Dwarvish"],
  battleCry: "Friends - draw your weapons and FIGHT for Deldien!",
  superWeapon: "Sword Before Time"
});

Villain.prototype.normalAttack = function(target) {
  let damage = Math.floor(Math.random() * Math.floor(this.healthPoints / 3));
  let plural = "points";
  if (damage === 1) {
    plural = "point";
  }
  target.healthPoints -= damage;
  pause(2.5);
  console.log(
    `${this.name} hits ${target.name} with a ${
      this.weapons[Math.floor(Math.random() * Math.floor(this.weapons.length))]
    } for ${damage} health ${plural}!`
  );
  pause(2);
  if (target.healthPoints <= 0) {
    console.log(`\n${target.name} has sustained mortal damage!\n`);
    pause(3);
    console.log(target.destroy());
  } else {
    console.log(`${target.name} lives to fight on!\n`);
  }
};

Villain.prototype.specialAttack = function(target) {
  let damage = Math.floor(Math.random() * Math.floor(this.healthPoints / 3));
  let plural = "points";
  if (damage === 1) {
    plural = "point";
  }
  target.healthPoints -= damage;
  pause(2.5);
  console.log(
    `${this.name} hits ${target.name} with a ${
      this.secretWeapon
    } for ${damage} health ${plural}!`
  );
  pause(2);
  if (target.healthPoints <= 0) {
    console.log(`\n${target.name} has sustained mortal damage!\n`);
    pause(3);
    console.log(target.destroy());
  } else {
    console.log(`${target.name} lives to fight on!\n`);
  }
};

Hero.prototype.normalAttack = function(target) {
  let damage = Math.floor(Math.random() * Math.floor(this.healthPoints / 2.25));
  let plural = "points";
  if (damage === 1) {
    plural = "point";
  }
  target.healthPoints -= damage;
  pause(2.5);
  console.log(
    `${this.name} hits ${target.name} with a ${
      this.weapons[Math.floor(Math.random() * Math.floor(this.weapons.length))]
    } for ${damage} health ${plural}!`
  );
  pause(2);
  if (target.healthPoints <= 0) {
    console.log(`\n${target.name} has sustained mortal damage!\n`);
    pause(3);
    console.log(target.destroy());
  } else {
    console.log(`${target.name} lives to fight on!\n`);
  }
};

Hero.prototype.specialAttack = function(target) {
  let damage = Math.floor(Math.random() * Math.floor(this.healthPoints / 1.5));
  let plural = "points";
  if (damage === 1) {
    plural = "point";
  }
  target.healthPoints -= damage;
  pause(2.5);
  console.log(
    `${this.name} hits ${target.name} with a ${
      this.superWeapon
    } for ${damage} health ${plural}!`
  );
  pause(2);
  if (target.healthPoints <= 0) {
    console.log(`\n${target.name} has sustained mortal damage!\n`);
    pause(3);
    console.log(target.destroy());
  } else {
    console.log(`${target.name} lives to fight on!\n`);
  }
};

function epicBattle(hero, villain) {
  pause(2);
  console.log(
    `Here begins the epic battle between ${hero.name} and ${villain.name}!\n`
  );
  pause(3);
  console.log(
    `Will ${villain.name} prove victorious, or will ${hero.name}'s ${
      hero.superWeapon
    } carry the day? Let's find out!\n`
  );
  pause(3);
  villain.speakTaunt();
  pause(3);
  hero.speakBattleCry();
  pause(3);
  let winner = "";
  while (!winner) {
    let attacker = "";
    let defender = "";
    let attDef = Math.floor(Math.random() * Math.floor(2));
    if (attDef === 0) {
      attacker = hero;
      defender = villain;
    } else {
      attacker = villain;
      defender = hero;
    }
    let normSpec = Math.floor(Math.random() * Math.floor(2));
    if (normSpec === 0) {
      attacker.normalAttack(defender);
    } else {
      attacker.specialAttack(defender);
    }
    if (defender.healthPoints <= 0) {
      winner = attacker;
    }
  }
  if (winner === hero) {
    pause(3.5);
    console.log(
      `${hero.name} has defeated the mighty ${villain.name}! May ${
        hero.name
      } live in glory forever!`
    );
  } else {
    pause(3.5);
    console.log(
      `Alas, ${villain.name} has slain the venerable ${hero.name}! ${
        villain.name
      }'s victory will be written in blood in the Evil Book!`
    );
  }
  pause(4);
}

epicBattle(glasowyn, argoroth);
