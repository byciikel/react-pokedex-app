import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Store from './Store'

export class Detail extends Component {
  render() {
    console.log(Store.detailPokemon)
    return (
      <div>
        
      </div>
    )
  }
}

export default observer(Detail)
