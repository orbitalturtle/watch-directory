import React from 'react'

import LightningInvoicePopup from './LightningInvoicePopup';

class AddTowerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: '',
      r_hash: '',
      id: '',
      address: '',
      showPopup: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    fetch("http://localhost:9000/lightning/invoice")
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        invoice: data.payment_request,
        r_hash: data.r_hash,
      })  
    })  
  }

  handleChange(event) {    
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({
      [name]: value    
    });
  }

  handleSubmit(event) {
    console.log('Tower data was submitted: ', this.state.id, this.state.address, this.state.invoice, this.state.r_hash);

    var data = {
      id: this.state.id, 
      address: this.state.address, 
      invoice: this.state.invoice,
      r_hash: this.state.r_hash,
    }

    var requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    fetch('http://localhost:9000/lightning/invoice', requestOptions)
      .then(function(response) {
        console.log(response)
        return response.json();
      });

    event.preventDefault();
  }

  togglePopup() {   
    this.setState({  
         showPopup: !this.state.showPopup  
    }); 
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>        
        <label>
          Id:
          <input name="id" type="text" value={this.state.id} onChange={this.handleChange} />        
        </label>
        <label>
          Address: 
          <input name="address" type="text" value={this.state.address} onChange={this.handleChange} />    
        </label>

        <button type="submit" value="Submit" onClick={this.togglePopup.bind(this)}>Submit</button>  
        {this.state.showPopup ? <LightningInvoicePopup invoice={this.state.invoice} closePopup={this.togglePopup.bind(this)} /> : null}
      </form>
    );
  }
}

export default AddTowerForm;

