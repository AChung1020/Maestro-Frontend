import React, {createContext} from 'react'
import Pool from '../server-AWS/UserPool'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'

const AccountContext = createContext();

const AccountState  = (props ) => {
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();

            if (user) {
                user.getSession((error, session) => {
                    if(error) {
                        reject();
                    } else {
                        resolve();
                    }});
            } else {
                reject();
            }
        })
    };
    const authenticate = async (Username, Password) => {
         return await new Promise((resolve, reject) => {
            const user = new CognitoUser ({ Username, Pool});

            const authDetails = new AuthenticationDetails ({ Username,Password,})

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("onSuccess: ", data);
                    resolve(data);
                },
                onFailure: (err) => {
                    console.error("onFailure", err);
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired: ", data);
                    resolve(data);
                },

            })
         })
    }

    const logOut= () => {
        const user = Pool.getCurrentUser();
        
        if (user) {
            user.signOut();
        }
    }


    return (
       <AccountContext.Provider value = {{ authenticate, getSession, logOut }}>
            {props.children}
       </AccountContext.Provider>
    )
}

export {AccountState, AccountContext};