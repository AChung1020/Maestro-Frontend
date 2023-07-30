import React, {createContext} from 'react'
import Pool from '../server-AWS/UserPool'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import Cookies from 'universal-cookie'

const AccountContext = createContext();

const AccountState  = (props ) => {
    //get session data
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
    //get token data which means user data stored wihtin cognito
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
        const cookies = new Cookies();
        if (user) {
            cookies.remove("access_token");
            cookies.remove("id_token");
            cookies.remove("refresh_token");
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