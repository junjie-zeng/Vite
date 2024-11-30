import _ from 'lodash'

// ts
interface Person {
  name: string
  age: number
}

const render = () => {
  const person: Person = {
    name: 'WaHHHHHH',
    age: 1
  }

  console.log('person ...', person)
  console.log('name ....', _.get(person, 'name'))
}

render()
