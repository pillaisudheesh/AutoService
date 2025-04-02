import axios from 'axios';

class LoginService {
    loginUser = async (data) => {
        console.log(data);
        const response = await axios.post('/auto-service/api/auth/login', data);
        console.log(response);
        return response.data;
    }
}
const loginService = new LoginService();
export default loginService;