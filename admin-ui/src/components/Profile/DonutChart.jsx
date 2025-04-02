import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import bookingService from '../../services/bookins.service';
const DonutChart = () => {
    const [updatedBookings, setUpdatedBookings] = useState();
    useEffect(() => {
        // Simulate fetching user details
        getBookings();
      }, []);

   
    const [chartContents, setChartContents] =useState({
        options: {
          chart: {
            id: 'apexchart-example'
          },
          xaxis: {
            categories: []
          }
        },
        series: [{
          name: 'series-1',
          data: []
        }]
      });

      const getBookings = async () => {
        const bookings = await bookingService.getallBookings();
        setUpdatedBookings(bookings);
        const categories = bookings?.map((booking) => {
            return booking.date;
        });

        // const result = bookings.reduce((booking, {status}) => 
        //     {
        //         booking[status] = booking[status] || {name: status, count: 0};
        //       // The more elegant way: acc[languageId] ??= {name: languageId, count: 0};
        //       booking[status]['count'] += 1;
              
        //       return status;
        //     }, {});

        //     console.log(result);
        
        setChartContents({
            options: {
                ...chartContents.options,
                xaxis: {
                    categories: categories
                }
            },
            series: [{
                name: 'orders',
                data: []
            }]
        }
        );
    }
  return (
    <div className='py-6 bg-white rounded-lg p-5 flex dark:bg-gray-600 items-center justify-center'>
      <Chart options={chartContents.options} series={chartContents.series} type="bar" height={350} width={250} />
    </div>
  )
}

export default DonutChart
