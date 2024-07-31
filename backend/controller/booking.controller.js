import Booking from "../models/booking.model.js"

export const createBooking = async (req, res, next) => {
  try {
    const { customerId, hostId, listingId, totalPrice } =
      req.body
    const existingBooking = await Booking.findOne({ customerId: customerId, listingId: listingId });

    if (existingBooking) {
      return res.status(400).json({ message: "You have already booked this listing." });
    }
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      totalPrice,
    })
    await newBooking.save()
    res.status(200).json(newBooking)
  } catch (error) {
    next(error)
  }
}
