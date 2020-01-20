const initialState = {
   wallets: [],
   loading: true,
   updateBalance: false
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
         let updatedWallet = JSON.stringify(action.payload.wallet);
         let itemIndex = state.wallets.findIndex(w => w.address === updatedWallet.address)
         let updated = state.wallets.map((item, index) => {
            if (index !== itemIndex) {
               return item
            }
            return {
               ...item,
               ...action.item
            }
         })
         
         return {
            ...state,
            loading: false,
            updateBalance: true,
            wallets: updated
         }
      default:
         return state;

   }
}