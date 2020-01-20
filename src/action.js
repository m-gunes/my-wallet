import { ethers } from 'ethers';


const privateKey = [
   "0x0123456789012345678901234567890123456789012345678901234567899000",
   "0x0123456789012345678901234567890123456789012345678901234567899001"
];

const provider = ethers.getDefaultProvider('rinkeby');
const wallets = privateKey.map(privateKey =>  new ethers.Wallet(privateKey, provider));


export const updateBalance = (transactionWallets) => async(dispatch) => {

  
   try {
      
      transactionWallets.map(async(wallet) => {
         let balance = await provider.getBalance(wallet.address);
         console.log('ethers.utils.formatEther(balance): ', ethers.utils.formatEther(balance));
         wallet.balance = ethers.utils.formatEther(balance)
         dispatch({type: 'UPDATE_WALLETS', payload:{ wallet }  })
      })

      
   } catch (error) {
      console.log('error: ', error);
   }
}

export const getBalance = () => async(dispatch) => {
   try {
      wallets.map(async(wallet) => {
         let balance = await provider.getBalance(wallet.address);
         wallet.balance = ethers.utils.formatEther(balance)
         dispatch({type: 'GET_WALLETS', payload:{ wallets: wallet }  })
      })
      
   } catch (error) {
      console.log('error: ', error);
   }
}


export const getWallets = () => async(dispatch) => {
   try {
      await dispatch(getBalance())
   } catch (error) {
      console.log('error: ', error);
   }
}




