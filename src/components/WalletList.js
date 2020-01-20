import React, {Component} from 'react';
import { List, Button, Spin, Row, Col } from 'antd';
import SendEtherModal from './SendEtherModal';
import { connect } from 'react-redux';
import { getWallets } from '../action';


class WalletList extends Component {
   state = { 
      visible: false,
      selectedWallet: ''
   };

   showModal = wallet => this.setState({ visible: true, selectedWallet: wallet });
   handleCancel = () => this.setState({ visible: false });

   componentDidMount(){
      this.props.getWallets();
   }

   render(){
      const {visible, selectedWallet} = this.state;
      const {wallets, loading} = this.props;
      console.log('wallets_render: ', wallets);
      return (
         <Spin spinning={loading}>

            <Row type="flex" justify="center" align="middle">
               <Col span={12}>
                  <List
                     size="large"
                     header={<h1>Wallets</h1>}
                     // footer={<div>Footer</div>}
                     bordered
                     dataSource={ wallets }
                     renderItem={ wallet => 
                        <List.Item>
                           <strong>Address: </strong>
                           {wallet.address}
                           <strong> Balance: </strong> 
                           {wallet.balance}
                           <Button className="send-etr" onClick={() => this.showModal(wallet)}>Send Ether</Button>
                        </List.Item>
                     }
                  />
               </Col>
            </Row>

            <SendEtherModal
               visible={visible}
               handleCancel={this.handleCancel}
               selectedWallet={selectedWallet}
            />

         </Spin>

      )
   }
}



const mapStateToProps = state => ({
   wallets: state.wallets,
   loading: state.loading
});

const mapDispatchToProps = {
   getWallets
}
      


export default connect(mapStateToProps, mapDispatchToProps)(WalletList);