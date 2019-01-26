/*
  === GameObject ===
  * createdAt
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/

class GameObject {
  constructor(atts) {
    this.createdAt = atts.createdAt;
    this.dimensions = atts.dimensions;
  }
  destroy() {
    return `${this.name} was removed from the game.`;
  }
}

/*
    === CharacterStats ===
    * healthPoints
    * name
    * takeDamage() // prototype method -> returns the string '<object name> took damage.'
    * should inherit destroy() from GameObject's prototype
  */

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

/*
    === Humanoid (Having an appearance or character resembling that of a human.) ===
    * team
    * weapons
    * language
    * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
    * should inherit destroy() from GameObject through CharacterStats
    * should inherit takeDamage() from CharacterStats
  */

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

/*
 * Inheritance chain: GameObject -> CharacterStats -> Humanoid
 * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
 * Instances of CharacterStats should have all of the same properties as GameObject.
 */

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

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.languages); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

console.log("\n");

// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.

class Villain extends Humanoid {
  constructor(atts) {
    super(atts);
    this.taunt = atts.taunt;
    this.secretWeapon = atts.secretWeapon;
  }
  speakTaunt() {
    console.log(`${this.name}: ${this.taunt}`);
  }
}

class Hero extends Humanoid {
  constructor(atts) {
    super(atts);
    this.battleCry = atts.battleCry;
    this.superWeapon = atts.superWeapon;
  }
  speakBattleCry() {
    console.log(`${this.name}: ${this.battleCry}`);
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

console.log(argoroth.greet());
argoroth.speakTaunt();
console.log(glasowyn.greet());
glasowyn.speakBattleCry();

console.log("\n");

// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
Villain.prototype.normalAttack = function(target) {
  let damage = Math.floor(Math.random() * Math.floor(this.healthPoints / 3));
  let plural = "points";
  if (damage === 1) {
    plural = "point";
  }
  target.healthPoints -= damage;
  console.log(
    `${this.name} hits ${target.name} with a ${
      this.weapons[Math.floor(Math.random() * Math.floor(this.weapons.length))]
    } for ${damage} health ${plural}!`
  );
  if (target.healthPoints <= 0) {
    console.log(`${target.name} has sustained mortal damage!`);
    console.log(target.destroy());
  } else {
    console.log(`${target.name} lives to fight on!`);
  }
};

Villain.prototype.specialAttack = function(target) {
  let damage = Math.floor(Math.random() * Math.floor(this.healthPoints / 3));
  let plural = "points";
  if (damage === 1) {
    plural = "point";
  }
  target.healthPoints -= damage;
  console.log(
    `${this.name} hits ${target.name} with a ${
      this.secretWeapon
    } for ${damage} health ${plural}!`
  );
  if (target.healthPoints <= 0) {
    console.log(`${target.name} has sustained mortal damage!`);
    console.log(target.destroy());
  } else {
    console.log(`${target.name} lives to fight on!`);
  }
};

Hero.prototype.normalAttack = function(target) {
  let damage = Math.floor(Math.random() * Math.floor(this.healthPoints / 2.25));
  let plural = "points";
  if (damage === 1) {
    plural = "point";
  }
  target.healthPoints -= damage;
  console.log(
    `${this.name} hits ${target.name} with a ${
      this.weapons[Math.floor(Math.random() * Math.floor(this.weapons.length))]
    } for ${damage} health ${plural}!`
  );
  if (target.healthPoints <= 0) {
    console.log(`${target.name} has sustained mortal damage!`);
    console.log(target.destroy());
  } else {
    console.log(`${target.name} lives to fight on!`);
  }
};

Hero.prototype.specialAttack = function(target) {
  let damage = Math.floor(Math.random() * Math.floor(this.healthPoints / 1.5));
  let plural = "points";
  if (damage === 1) {
    plural = "point";
  }
  target.healthPoints -= damage;
  console.log(
    `${this.name} hits ${target.name} with a ${
      this.superWeapon
    } for ${damage} health ${plural}!`
  );
  if (target.healthPoints <= 0) {
    console.log(`${target.name} has sustained mortal damage!`);
    console.log(target.destroy());
  } else {
    console.log(`${target.name} lives to fight on!`);
  }
};

glasowyn.normalAttack(argoroth);
argoroth.specialAttack(mage);

console.log("\n");

// * Create two new objects, one a villain and one a hero and fight it out with methods!

function epicBattle(hero, villain) {
  console.log(
    `Here begins the epic battle between ${hero.name} and ${villain.name}!` +
      "\n"
  );
  console.log(
    `Will ${villain.name} prove victorious, or will ${hero.name}'s ${
      hero.superWeapon
    } carry the day? Let's find out!` + "\n"
  );
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
    console.log(
      `${hero.name} has defeated the mighty ${villain.name}! May ${
        hero.name
      } live in glory forever!`
    );
  } else {
    console.log(
      `Alas, ${villain.name} has slain the venerable ${hero.name}! ${
        villain.name
      }'s victory will be written in blood in the Evil Book!`
    );
  }
}

epicBattle(glasowyn, argoroth);
