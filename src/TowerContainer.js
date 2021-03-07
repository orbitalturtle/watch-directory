import React from 'react';
import TowerInfo from './TowerInfo'

function TowerContainer(props){

  function renderTowers(){
    return props.towers.map(tower => {
      return <TowerInfo key={tower.id} tower={tower}/>
    })
  }

  return (
    <div>
      {renderTowers()}
    </div>
  )
}

export default TowerContainer;
