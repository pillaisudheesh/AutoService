import axios from 'axios';

class ServiceProviderService {
        registerDetails = async (data) => {
            console.log(data);
        const response = await axios.post('/auto-service/api/serviceprovider//register', data);
        console.log(response);
        return response.data;
    }
}
const serviceProviderService = new ServiceProviderService();
export default serviceProviderService;