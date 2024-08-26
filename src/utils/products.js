import axios from "axios";
const backendURL = 'http://localhost:2070'

const productService = {

    fetchProducts: async () => {
        try {

            const response = await axios.get(`${backendURL}/products`);
            if(response.status === 200){
                return response.data
            }else {
                throw new Error()
            }
            
        } catch (error) {
            throw new Error(error)
        }
    },
    fetchUserCart: async () => {
        const jwtToken = JSON.parse(sessionStorage.getItem('jwtToken'));
        const userId = JSON.parse(sessionStorage.getItem('userId'));

        if(jwtToken && userId){
            try {

                let config =  {
                    method: 'get',
                    url: `${backendURL}/cart/${userId}`,
                    headers: {
                        'Authorization': `Bearer ${jwtToken.accessToken}`
                    }
                 }
    
                const response = await axios.request(config);
    
                if(response.status === 200){
                    return response.data
                }    
            } catch (error) {
                throw error
            }

        }

    
    },
    fetchProductById: async (productId) => {
         try {
            const response = await axios.get(`${backendURL}/products/${productId}`);

            if(response.status === 200){
                return response.data[0]
            }else {
                throw new Error();
            }
         
            
         } catch (error) {
             throw error
         }
    },

    addItemToCart: async (item) => {
        const jwtToken = JSON.parse(sessionStorage.getItem('jwtToken'));
        const userId = JSON.parse(sessionStorage.getItem('userId'));

        if(jwtToken && userId){
            const carItem = {
                user_id: userId,
                product_id: item.id
            }
    
            try {
                let config =  {
                    method: 'post',
                    url: `${backendURL}/cart`,
                    headers: {
                        'Authorization': `Bearer ${jwtToken.accessToken}`
                    }, 
                    data: carItem
                    
                 }
    
                 const response = await axios.request(config);
                 if(response.status === 200){
                    console.log(response);
                    return true
                 }else throw new Error();
    
                
            } catch (error) {
                throw error
            }

        }

       
    },
    increaseCartItemByOne: async (itemId) => {
        const jwtToken = JSON.parse(sessionStorage.getItem('jwtToken'));
        const userId = JSON.parse(sessionStorage.getItem('userId'));
     
        const carItem = {
            quantity: 1,
            user_id: userId,
            product_id: itemId
        }

        const config = {
            method: 'post',
            url: `${backendURL}/cart`,
            headers: {
                'Authorization': `Bearer ${jwtToken.accessToken}`
            }, 
            data: carItem
        }

        try {

            const response = await axios.request(config);

            if(response.status === 200){
                return true
            }else {
                throw new Error();
            }
            
        } catch (error) {
            throw error
        }
    },
    decreaseCartItemsByOne: async (itemId) => {
        const jwtToken = JSON.parse(sessionStorage.getItem('jwtToken'));
        const userId = JSON.parse(sessionStorage.getItem('userId'));

        const cartItem = {
            user_id: userId,
            product_id: itemId
        }

        const config = {
            method: 'delete',
            url: `${backendURL}/cart`,
            headers: {
                'Authorization': `Bearer ${jwtToken.accessToken}`
            }, 
            data: cartItem
        }

        try {

            const response = await axios.request(config);
            if(response.status === 204 || response.status === 200){
                return true
            }else {
                throw new Error();
            }
            
        } catch (error) {
            throw error
        }
        
    },

    deleteUserCart: async () => {

        const jwtToken = JSON.parse(sessionStorage.getItem('jwtToken'));
        const userId = JSON.parse(sessionStorage.getItem('userId'));

        const config = {
            method: 'delete',
            url: `${backendURL}/cart/${userId}`,
            headers: {
                'Authorization': `Bearer ${jwtToken.accessToken}`
            }
        }

        try {

            const response = await axios.request(config);
            if(response.status === 204){
                return true
            }else {
                throw new Error();
            }
            
        } catch (error) {
            throw error
        }

    }

}

export default productService