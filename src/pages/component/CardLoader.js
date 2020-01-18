import React, { Component } from 'react'
import ContentLoader from "react-content-loader" 

export class CardLoader extends Component {
  state = {
    screenSize: []
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.resize)
    this.resize()
  }

  resize = () => {
    this.setState({
      screenSize: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    })
  }

  render() {
    return (
      <div>
        {this.state.screenSize.width <= 655 ?
          <ContentLoader height={480} width={480} speed={1}>
            <rect x="0" y="0" width="480" height="200" />
            <rect x="65" y="230" rx="3" ry="3" width="350" height="40" /> 
            <rect x="140" y="290" rx="20" ry="20" width="200" height="40" /> 
          </ContentLoader>
        :
          <ContentLoader height={500} width={480} speed={1}>
            <rect x="0" y="0" width="480" height="250" />
            <rect x="65" y="280" rx="3" ry="3" width="350" height="60" /> 
            <rect x="140" y="380" rx="30" ry="30" width="200" height="60" /> 
          </ContentLoader>
        }
      </div>
    )
  }
}

export default CardLoader
