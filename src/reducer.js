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
         let itemIndex = state.wallets.findIndex(w => w.address === updatedWallet.address)
         
         return {
            ...state,
            loading: false,
            wallets: state.wallets.map((item, index) => {
               if (index !== itemIndex) {
                  return item
               }
               return {
                  ...item,
                  ...action.item
               }
            })
         }
      default:
         return state;

   }
}