import axios from 'axios';

class UsersService {
        registerUser = async (data) => {
            console.log(data);
        const response = await axios.post('/auto-service/api/users//register', data);
        console.log(response);
        return response.data;
    }
}
const userService = new UsersService();
export default userService;