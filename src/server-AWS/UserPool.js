import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: 'us-east-1_NJhknkhEI',
    ClientId: '11b5lrm2o3cq430jfdag0gjq21'
}

export default new CognitoUserPool(poolData);