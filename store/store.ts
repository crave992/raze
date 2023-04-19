import create, { SetState, GetState } from "zustand"
import { persist, StoreApiWithPersist} from "zustand/middleware"
import produce from "immer"

interface State {
    isLoggedIn: boolean,
    user: {
        name?: string,
        logoutToken? : string
    },
    cart: any,
    cartTotalItems: number,
    registeredEmail: string,
    emailVerified: boolean,
    shippingFee: any,
    shippingAddress: any,
    setUser: Function,
    unsetUser: Function,
    setCart: Function,
    setRegisteredEmail: Function,
    setEmailVerified: Function,
    setShippingAddress: Function,

    hasCoat: boolean,
    setHasCoat: Function,

    coatingDate1: any,
    coatingDate2: any,
    coatingType: string,
    setCoatingDate: Function,
    setCoatingType: Function,

    storeLocation: any,
    setStoreLocation: Function
}

const useStore = create(
    persist<
        State,
        SetState<State>,
        GetState<State>,
        StoreApiWithPersist<State>
        >(
        (set, get) => ({
            isLoggedIn: false,
            user: {
                name: null,
                logoutToken: null
            },
            cart: null,
            cartTotalItems: 0,
            registeredEmail: null,
            emailVerified: false,
            shippingFee: 0,
            shippingAddress: null,

            setUser: ({name, logoutToken}) => set(produce(state => {
                state.isLoggedIn = true;
                state.user.name = name;
                state.user.logoutToken = logoutToken;
            })),

            unsetUser: () => set(produce(state => {
                state.isLoggedIn = false;
                state.user.name = null;
                state.user.logoutToken = null;
                state.registeredEmail = null;
                state.emailVerified = false;
            })),

            setCart: (cart) => set(produce(state => {

                let n:number = 0;
                if(cart && cart.length > 0) {
                    cart[0].order_items.map(r => {
                        n = n + parseInt(r.quantity);
                    })
                }
                state.cartTotalItems = n;
                state.cart = cart;
            })),

            setRegisteredEmail: (email) => set(produce(state => {
                state.registeredEmail = email
            })),

            setEmailVerified: (value) => set(produce(state => {
                state.emailVerified = value;
            })),

            setShippingAddress: (address) => set(produce(state =>{
                state.shippingAddress = address;
            })),

            hasCoat: false,
            setHasCoat: (value) => set(produce(state =>{
                state.hasCoat = value;
            })),

            coatingDate1: null,
            coatingDate2: null,
            coatingType: null,
            setCoatingDate: (option, date) => set(produce(state => {
                if(option === 1) {
                    state.coatingDate1 = date;
                }
                else {
                    state.coatingDate2 = date;
                }
            })),
            setCoatingType: (type) => set(produce(state => {
                state.coatingType = type;
            })),

            storeLocation: 'all',
            setStoreLocation: (locator) => set(produce(state => {
                state.storeLocation = locator;
            }))
        }),
        {
            name: 'typescript'
        }
    )
);

// const useStore = create<State>(
//
//     (set, get) => ({
//         isLoggedIn: false,
//         user: {
//             name: null,
//             logoutToken: null
//         },
//         cart: null,
//         registeredEmail: null,
//         emailVerified: false,
//         shippingAddress: null,
//         billingAddress: null,
//
//         setUser: ({name, logoutToken}) => set(produce(state => {
//             state.isLoggedIn = true;
//             state.user.name = name;
//             state.user.logoutToken = logoutToken;
//         })),
//
//         unsetUser: () => set(produce(state => {
//             state.isLoggedIn = false;
//             state.user.name = null;
//             state.user.logoutToken = null;
//             state.registeredEmail = null;
//             state.emailVerified = false;
//         })),
//
//         setCart: (cart) => set(produce(state => {
//             state.cart = cart;
//         })),
//
//         setRegisteredEmail: (email) => set(produce(state => {
//             state.registeredEmail = email
//         })),
//
//         setEmailVerified: (value) => set(produce(state => {
//             state.emailVerified = value;
//         })),
//
//         setShippingAddress: (address) => set(produce(state =>{
//             state.shippingAddress = address;
//         })),
//
//         setBillingAddress: (address) => set(produce(state => {
//             state.billingAddress = address;
//         }))
//     })
// );

export default useStore;
