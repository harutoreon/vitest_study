import { describe, it, expect, vi } from 'vitest'

class Dog {
  constructor(name) {
    this.name = name
  }

  static getType() {
    return 'animal'
  }

  speak() {
    return 'bark!'
  }

  isHungry() {}
  feed() {}
}

Dog.getType = vi.fn(() => 'mocked animal')
Dog.prototype.speak = vi.fn(() => 'loud bark!')
Dog.prototype.feed = vi.fn()

describe('class mock test', () => {
  it('speak関数が呼ばれること', () => {
    const dog = new Dog('Cooper')
    
    dog.speak() // loud bark!

    expect(dog.speak).toHaveBeenCalled()
  })

  it('nameのgetterが1回呼ばれること', () => {
    const dog = new Dog('Cooper')
  
    const nameSpy = vi.spyOn(dog, 'name', 'get').mockReturnValue('Max')
  
    expect(dog.name).toBe('Max')
    expect(nameSpy).toHaveBeenCalledTimes(1)
  })
})
