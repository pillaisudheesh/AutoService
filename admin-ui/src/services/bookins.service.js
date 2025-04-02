import axios from 'axios';

class BookingService {
        getallBookings = async (data) => {
            console.log(data);
        const response = await axios.get('/auto-service/api/booking/allbookings');
        console.log(response);
        return response.data;
    }

    updatestatus = async (id, data) => {
        console.log(data);
    const response = await axios.patch('/auto-service/api/booking/updatestatus/'+id, data);
    console.log(response);
    return response.data;
}
}
const bookingService = new BookingService();
export default bookingService;