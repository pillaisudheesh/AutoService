import axios from 'axios';

class BookingService {
        bookService = async (data) => {
            console.log(data);
        const response = await axios.post('/auto-service/api/booking/bookservice', data);
        console.log(response);
        return response.data;
    }
}
const bookingService = new BookingService();
export default bookingService;