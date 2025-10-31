//function to check booking availability of room

import Booking from "../models/Booking.js"
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $let: checkOutDate },
            checkOutDate: { $gte: checkInDate }
        })
        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch (error) {
        res.json({ success: false, message: error.message });

    }
}

//Api to check availability of room
//POST /api/bookings/check-availability

export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { checkInDate, checkOutDate, room } = req.body;
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        res.json({ success: true, isAvailable });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//Api to create a new booking
//POST /api/bookings/book

export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, hotel, guests } = req.body;
        const user = req.user._id;

        // before Booking Check Availability

        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        if (!isAvailable) {
            return res.json({ success: false, message: "Room is not available for the selected dates" });
        }

        //get total price from Room
        const roomDate = await Room.findById(room).populate('hotel');
        let totalPrice = roomDate.pricePerNight;

        //Calculate totalPrice bases on night
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights;
        const booking = await Booking.create({
            user,
            room,
            hotel: room.Date.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        })

        res.json({ success: true, message: "Booking created successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to create booking" });
    }
};


//API to get all bookings for a user
//GET /api/bookings/user

export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({ user }).populate('room hotel ').sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.auth.userId });

        if (!hotel) {
            return res.json({ success: false, message: "not hotel found" });
        }
        const bookings = await Booking.find({ hotel: hotel._id }).populate('room user').sort({ createdAt: -1 });

        //Total Booking
        const totalBookings = bookings.length;
        //Total Revenue
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

        res.json({ success: true, dashboardDate: { totalBookings, totalRevenue, bookings } });

    } catch (error) {
        res.json({ success: false, message: "Failed to fetch bookings"});
    }
}