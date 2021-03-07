import React from 'react';
import AddTowerForm from './AddTowerForm';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      showPopup: false
    };  
  }

  togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    });
  }

  render() {
    return (
      <div>
        <h2>Add a tower</h2>
        If you'd like to add a watchtower to this website, please pay a small fee with a bitcoin lightning payment.
        <AddTowerForm />
      </div>
    )
  }
}

export default Upload;

