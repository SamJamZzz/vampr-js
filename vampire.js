class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator
      numVampires++;
    }
    return numVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal);
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let vampire1 = this;
    let vampire2 = vampire;
    while (vampire1 !== vampire2) {
      if (vampire1.numberOfVampiresFromOriginal > vampire2.numberOfVampiresFromOriginal) {
        vampire1 = vampire1.creator;
        continue;
      }
      if (vampire1.numberOfVampiresFromOriginal < vampire2.numberOfVampiresFromOriginal) {
        vampire2 = vampire2.creator;
        continue;
      }
      vampire1 = vampire1.creator;
      vampire2 = vampire2.creator;
    }
    return vampire1;
  }
}

module.exports = Vampire;