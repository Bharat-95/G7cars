import React from 'react'

const page = () => {
    const fetchData = async () => {
        try {
            const url = 'https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/bookings/:userId'
            const response = await fetch(url);
            const data = await response.json();
            
        } catch (error) {

            console.error('Error', error)
            
        }
    }
  return (
    <div>
        {data.map((booking) =>(

            <div key={booking.G7cars123}>
                
                <div>{booking.bookingId}</div> 
                <div>{booking.carId}</div>
                <div>{booking.pickupDateTime}</div>
                <div>{booking.dropoffDateTime}</div>
                <div>{booking.paymentId}</div>
                </div>
        ))}
    </div>
  )
}

export default page