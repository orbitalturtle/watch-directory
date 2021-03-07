import React from 'react'
import TowerContainer from './TowerContainer'

export default class MainContainer extends React.Component {

  state = {
    towers: []
  }

  componentDidMount(){
    fetch("http://localhost:9000/towers")
    .then(resp => resp.json())
    .then(towers => {
      this.setState({
        towers: towers
      })
    })
  }
  
  render(){
    return (
      <div className="main-container">
        <TowerContainer towers={this.state.towers}/>
      </div>
    )
  }

}
