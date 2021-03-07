import React from 'react'

class TowerInfo extends React.Component {

  render(){
    return (
      <div className="tower-info">
        <h4>{this.props.tower.tower_id}</h4>
        {this.props.tower.address}
      </div>
    )
  }

}

export default TowerInfo
