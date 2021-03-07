import React from 'react';

function AddTowerContainer(props){

  function renderTowers(){
    return props.towers.map(tower => {
      return <TowerInfo key={tower.id} tower={tower}/>
    })  
  }

  return (
    <div>
      <h2>Add your own tower to the directory</h2>

      {renderTowers()}
    </div>
  )
}

export default AddTowerContainer;
