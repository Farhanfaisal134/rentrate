import React, { useEffect } from "react"
import Navbar from "../components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { setTripList } from "../redux/slice/userSlice"
import ListingCard from "../components/ListingCard"

const TripList = () => {
  const userId = useSelector((state) => state?.user?.user?._id)
  const tripList = useSelector((state) => state?.user?.user?.tripList)
  // console.log(tripList)
  const dispatch = useDispatch()

  const getTripList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${userId}/trips`,
        { method: "GET" }
      )
      const data = await response.json()
      dispatch(setTripList(data))
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(tripList);

  useEffect(() => {
    getTripList()
  }, [])

  return (
    <>
      <Navbar />

      <h1 className="text-2xl font-bold text-slate-700 my-10 mx-[100px] sm:mx-12">
        Your Trip List
      </h1>

      <div className="px-24 pb-28 flex justify-center flex-wrap gap-6">
        {tripList?.length > 0 ?
          tripList?.map(
            ({
              listingId,
              hostId,
              totalPrice,
              booking = true,
            }) => (
              <ListingCard
                listingId={listingId?._id}
                creator={hostId?._id}
                listingPhotoPaths={listingId?.listingPhotoPaths}
                city={listingId?.city}
                state={listingId?.state}
                country={listingId?.country}
                category={listingId?.category}
                totalPrice={totalPrice}
                booking={booking}
              />
            )
          ) :
          <h1 className="text-2xl font-bold">No Listing Availible</h1>
        }
      </div>
    </>

  )
}

export default TripList