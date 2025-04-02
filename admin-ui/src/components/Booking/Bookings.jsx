import React, { useEffect, useState } from "react";
import bookingService from "../../services/bookins.service";

const Bookings = () => {

    const [updatedBookings, setUpdatedBookings] = useState();
    useEffect(() => {
        // Simulate fetching user details
        getBookings();
      }, []);

    const getBookings = async () => {
        const bookings = await bookingService.getallBookings();
        setUpdatedBookings(bookings);
    }

    
    

    const handleAction = async (id, action) => {
        // Update booking status based on action
       
        const data = {
            id: id,
            status: action
        }
        const bookings = await bookingService.updatestatus(id, data);
        setUpdatedBookings((prevBookings) =>
            prevBookings.map((booking) =>
                booking.id === id ? { ...booking, status: action } : booking,
            ),
        );
    };
    return (
        <>
            <div>
                <h5 className="mt-0 mb-2 text-xl leading-tight font-medium text-blue-500">
                    List of recent Orders
                </h5>
            </div>
            <div className="grid grid-cols-4 grid-rows-1 gap-4" >
            {updatedBookings?.map((booking) => (
           
                <div key={booking.id} class="text-surface shadow-secondary-1 dark:bg-surface-dark block rounded-lg bg-white p-6 dark:text-white">
                    
                    <p className="mb-4 text-bases">
                    <span className="text-sm">Customer Name:</span> <span className="text-green-800">{booking.userName}</span>
                    </p>
                    <h5 className="mb-2 text-md leading-tight font-medium text-blue-800">
                    
                    {booking.selectedServices.join(', ')}
                    </h5>
                    <p className="mb-4 text-base">
                    <span className="font-semibold">Requested for date:</span> {booking.date} at {booking.time}
                    </p>
                    <p className="mb-4 text-base">
                    <span className="font-semibold">Status:</span> {booking.status}
                    </p>
                    {booking.status !== 'Closed' && <><button
                        type="button"
                        onClick={() => {
                            handleAction(booking.id, 'In Progress');
                        } }
                        className="shadow-gray-400 hover:bg-green-800 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong inline-block rounded bg-green-600 px-6 pt-2.5 pb-2 text-xs leading-normal font-medium text-white transition duration-150 ease-in-out focus:ring-0 focus:outline-none dark:shadow-black/30"

                    >
                        Accept
                    </button><button
                        type="button"
                        onClick={() => { handleAction(booking.id, 'Closed'); } }
                        className="shadow-gray-400 ml-2.5 border rounded border-gray-200 bg-amber-700 text-white      px-6 pt-2.5 pb-2 text-xs leading-normal font-medium"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                    >
                            Reject
                        </button></>}
                </div>
           
            ))}
             </div>
        </>
    );
};

export default Bookings;
