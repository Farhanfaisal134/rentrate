import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const Booking = mongoose.model("Booking", bookingSchema)

export default Booking
