class Dog {
  constructor(name) {
    this._name = name
  }

  get name() {
    return this._name
  }

  set name(newName) {
    this._name = newName
  }
}

const dog = new Dog('Cooper')

console.log(dog)
console.log(dog.name)

dog.name = 'Max'

console.log(dog.name)
