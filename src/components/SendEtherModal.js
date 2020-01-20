import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ethers } from 'ethers';
import { Modal, Form, Input, Button, Select, message } from 'antd';
import {updateBalance} from '../action'
const { Option } = Select;

class SendEtherModal extends Component {


  handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (!err) {
            console.log('Received values of form: ', values);

            let receiverWallet = this.props.wallets.filter(w => w.address === values.wallet)
            let transactionWallets = [this.props.selectedWallet, ...receiverWallet];


            let transaction = {
               to: values.wallet,
               value: ethers.utils.parseEther(values.amount)
            };
            
            let sendPromise = this.props.selectedWallet.sendTransaction(transaction);
            sendPromise.then((transaction) => {
                  this.props.updateBalance(transactionWallets, transaction.hash);
                  this.props.form.resetFields();
                  message.success('transaction sent successfully', 2.5)
                  console.log('transactionHash',transaction);
                  this.props.handleCancel()

            });


            // let transaction = {
            //    nonce: 0,
            //    gasLimit: 21000,
            //    gasPrice: ethers.utils.bigNumberify("20000000000"),
            //    to: values.wallet,
            //    value: ethers.utils.parseEther(values.amount),
            //    data: "0x",
            //    chainId: ethers.utils.getNetwork('rinkeby').chainId
            // }
            // console.log('transaction: ', transaction);
            
            // console.log('this.props.selectedWallet: ', this.props.selectedWallet);
            // let signPromise = this.props.selectedWallet.sign(transaction)
            // console.log('signPromise: ', signPromise);
            // signPromise.then((signedTransaction) => {
            //       console.log('signedTransaction', signedTransaction);
            //       this.props.selectedWallet.provider.sendTransaction(signedTransaction).then((tx) => {
            //          this.props.updateBalance(transactionWallets);
            //          console.log('sendTransaction', tx);
            //          this.props.form.resetFields();
            //          message.success('successful', 2.5)
            //          this.props.handleCancel()
            //       });
            // })


           

            
         }
       });
  }

 
  render() {
     const {visible, handleCancel, selectedWallet, form, wallets} = this.props;
     const filteredOptions = wallets.filter(v => v.address !== selectedWallet.address )
    return (
      <div>
        
        <Modal
          title={`Sender address ${selectedWallet.address}`}
          visible={visible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel} >
                Kapat
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleSubmit}>
               Send Ether
            </Button>,
        ]}
        >
           <Form onSubmit={this.handleSubmit} >
              <Form.Item label='Select wallet'>
               {form.getFieldDecorator('wallet', {
                     rules: [{ required: true, message: 'Please select wallet!' }],
                  })(
                     <Select
                           showSearch
                           style={{ width: 200 }}
                           placeholder="Select a person"
                           optionFilterProp="children"
                           filterOption={(input, option) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                           }
                        >
                           {filteredOptions.map((val, i) => 
                                 <Option key={i} value={val.address}>{val.address}</Option>
                           )}
                           
                        </Select>

                  )}
              </Form.Item>
              <Form.Item label='Amount'>
                  {form.getFieldDecorator('amount', {
                     rules: [{ required: true, message: 'Please input amount!' }],
                  })(<Input/>)}
              </Form.Item>
           </Form>
         
        </Modal>
      </div>
    );
  }
}

const WrappedSendEtherModal = Form.create({ name: 'sentEtherModal' })(SendEtherModal);

const mapStateToProps = state => ({
   wallets: state.wallets
})

const mapDispatchToProps = {
   updateBalance
}
export default connect(mapStateToProps, mapDispatchToProps)(WrappedSendEtherModal)