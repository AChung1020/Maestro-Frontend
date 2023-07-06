import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: 'us-east-1_qSJHqyiAW',
    ClientId: '6t41l0i94mnllbtc1ct3ps15bq'
}

export default new CognitoUserPool(poolData);