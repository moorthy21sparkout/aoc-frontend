import { environment } from "../../../environments/environment";

export const config = {
metaData:{
    metadata : {
        name: environment.TOTOKENNAME,
        description: environment.APP_DESCRIPTION,
        url: environment.APP_URL, // origin must match your domain & subdomain
        icons: ['https://avatars.githubusercontent.com/u/37784886']
      },
      projectId:environment.WALLET_CONNECT_PROJECT_ID,
      chains:environment.SUPPORTED_CHAINS
    },
    themeVariables: {
        '--w3m-accent': '#b434eb'
      },
      enableAnalytics:true
      
}