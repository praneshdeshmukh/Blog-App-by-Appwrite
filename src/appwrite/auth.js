import conf from '../conf.js'
import {Client, Account, ID} from 'appwrite'

export class AuthService {
    client = new Client;
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account= new Account(this.client);
    }

    async createAccount({email, password, name}) {
        // eslint-disable-next-line no-useless-catch
        try {
           const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                // if useracc exists then let the user redirect to login
                return this.login({email, password})
            }
            else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login( {email, password} ) {
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.account.createEmailPasswordSession(email,password);
        }
        catch(error) {
            throw error;
        }
    }

    // check if user is logged in
    async getUserStatus() {
        try {
            const user = await this.account.get();
            console.log("User is authenticated: ", user);
            // proceed with your authenticated app flow
            return user
        }
        catch(error) {
            console.error("User is not authenticated: ", error);
            //Redirect to login page or show login UI
            // window.location.href = '/login';
            return null
            
        }

    }

    // let the user logout
    async logout() {
        try {
            // 'current' as the session ID to logout on this device
            // const res = this.account.deleteSession('current')
            
            // session ID to logout on another device
            // const res = this.account.deleteSession({
            //     sessionId : "SESSION_ID" 
            // })

            await this.account.deleteSessions(); //logout the user on all devices
        } catch (error) {
            console.error("User logout failed: ",error);
        }
    }

}

const authService = new AuthService(); 

export default authService;


