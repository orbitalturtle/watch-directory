import React from 'react'
var QRCode = require('qrcode.react');

export default class LightningInvoice extends React.Component {
  render(){
    return (
      <div className="invoice-container">
        Pay the following invoice to post your tower info.<br />
        <input type="text" id="invoice" name="invoice" value={this.props.invoice} readOnly /><br />
        <QRCode value={this.props.invoice} /><br />
        
        <button onClick={this.props.closePopup}>close me</button>
      </div>
    )   
  }

}

