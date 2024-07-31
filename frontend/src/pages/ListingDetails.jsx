import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useNavigate, useParams } from "react-router-dom"
import { facilities } from "../data"
import { useSelector } from "react-redux"
import LoginPage from "./LoginPage"

const ListingDetails = () => {
  const { listingId } = useParams()
  const [listing, setListing] = useState(null)

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/listing/${listingId}`,
        {
          method: "GET",
        }
      )
      const data = await response.json()
      setListing(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getListingDetails()
  }, [])

  const customerId = useSelector((state) => state?.user?.user?._id)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        totalPrice: listing.price
      }

      const response = await fetch("http://localhost:3000/api/booking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      })

      if (response.ok) {
        navigate(`/${customerId}/trips`)
      } else {
        const errorData = await response.json();
        alert(errorData.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="px-5 py-10 lg:px-12">
        <div className="flex justify-between items-center sm:flex-col sm:items-start sm:gap-4">
          <h1 className="text-2xl font-bold text-slate-700">
            {listing?.title}
          </h1>
        </div>

        <div className="flex flex-wrap gap-2.5 my-5">
          {listing?.listingPhotoPaths?.map((item, index) => (
            <img
              src={`http://localhost:3000/${item.replace("public", "")}`}
              alt="listing photo"
              className="max-h-[280px] max-w-[280px] object-cover"
              key={index}
            />
          ))}
        </div>

        <h2 className="text-xl font-bold text-slate-700">
          {listing?.type} in {listing?.city}, {listing?.state},{" "}
          {listing?.country}
        </h2>

        <p className="max-w-[800px] mt-5 text-slate-700">
          {listing?.guestCount} guests - {listing?.bedroomCount} bedroom(s) -{" "}
          {listing?.bedCount} bed(s) - {listing?.bathroomCount} bathrooms(s)
        </p>

        <hr className="my-4 border-gray-300" />

        <div className="flex gap-5 items-center">
          <img
            src={`http://localhost:3000/${listing?.creator?.profileImagePath.replace(
              "public",
              ""
            )}`}
            alt=""
            className="w-[60px] h-[60px] m-0"
          />

          <h3 className="text-slate-700 font-semibold">
            Owned by {listing?.creator?.firstName} {listing?.creator?.lastName}
          </h3>
        </div>

        <hr className="my-4 border-gray-300" />

        <h3 className="text-xl font-bold text-slate-700">Description</h3>

        <p className="max-w-[800px] mt-5 text-slate-700">
          {listing?.description}
        </p>

        <hr className="my-4 border-gray-300" />

        <div className="flex flex-col lg:flex-row justify-between lg:gap-12">
          <div>
            <h2 className="text-xl font-bold text-slate-700">
              What kind of offers will provide
            </h2>

            <div className="grid grid-cols-2 gap-x-5 sm:gap-x-24 my-7 max-w-[700px]">
              {listing?.amenities[0]?.split(",").map((item, index) => (
                <div
                  className="flex items-center gap-5 text-lg font-semibold mb-5"
                  key={index}
                >
                  <div className="text-2xl text-slate-700">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>

                  <p className="m-0 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          className="w-full mt-7 sm:max-w-[300px] text-white bg-slate-700 p-2 rounded-lg hover:opacity-95 uppercase"
          type="submit"
          onClick={handleSubmit}
        >
          Booking
        </button>
      </div>
    </>
  )
}

export default ListingDetails
