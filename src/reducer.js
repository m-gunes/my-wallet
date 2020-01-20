const initialState = {
   wallets: [],
   loading: true
}

export default function(state = initialState, action) {

   switch(action.type) {
      case 'GET_WALLETS':
         return {
            ...state,
            loading: false,
            wallets: [
               ...state.wallets,
               action.payload.wallets
            ]
         }

      case 'UPDATE_WALLETS':
         let updatedWallet = action.payload.wallet;
         state.wallets.map(w => {
            if(w.address === updatedWallet.address){
               w.balance = updatedWallet.balance
            }
         })
         
         return {
            ...state,
            loading: false,

         }
     
      default:
         return state;

   }
}