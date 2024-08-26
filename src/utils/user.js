import axios from "axios";

const backendURL = 'http://localhost:2070'




const userService = {
    verifyAccessToken:   async () => {

        const jwtToken = JSON.parse(sessionStorage.getItem('jwtToken'));


        if(!jwtToken.accessToken){
            throw new Error('No accessToken not found. Please login and try again')
        }

        try {

            let config = {
                method: 'post',
                url: `${backendURL}/users/verify-token`,
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${jwtToken.accessToken}`
                },
              };

              
            const response = await axios.request(config);
            if(response.status === 200){
                return true;
            }else {
                throw new Error();
            }
            

        } catch (error) {
            console.error('An error occured while verifying token', error)
            throw new Error(error.message)
        }

    },

    getUserInfo:  async () => {

        const userId = JSON.parse(sessionStorage.getItem('userId'));
        const jwtToken = JSON.parse(sessionStorage.getItem('jwtToken'));


        try {

             let config =  {
                method: 'get',
                url: `${backendURL}/users/${userId}`,
                headers: {
                    'Authorization': `Bearer ${jwtToken.accessToken}`
                }
             }

             const response =  await axios.request(config);

            if(response.status === 200){

                return response.data[0]

            } else throw new Error();

    
        } catch (error) {
            throw  error
            
        }

    },

    register: async (newUser) => {

        try {

            const response = await axios.post('http://localhost:2070/users/register', {...newUser});

            if (response.status === 201) {
                return response;
              } else {
                throw new Error();
              }
            
        } catch (error) {
            throw error
        }

    },
    login:  async (username, password) => {
        try {

            const response = await axios.post("http://localhost:2070/users/login", {username,password});

        if(response.status === 200){
            return response.data;
        }else {
            throw new Error();
        }

            
        } catch (error) {
            throw new Error(error)
        }
    

    },
    logout: async () => {
        try {

            const response = await axios.get(`${backendURL}/users/logout`);

            if(response.status === 200) {
                return true;
            } else throw new Error();

           
            
        } catch (error) {
            throw error
        }
    }


}

export default userService;





