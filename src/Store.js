import React from 'react'
import { decorate, observable } from 'mobx'

class Store {
}

decorate(Store, {
})

const NewStore = new Store()

export default NewStore