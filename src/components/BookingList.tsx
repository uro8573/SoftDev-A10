"use client";

import { useAppSelector, AppDispatch } from "@/redux/store";
import { removeBooking } from "@/redux/features/bookSlice";
import { useDispatch } from "react-redux";

export default function BookingList() {
    const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="w-full flex flex-col items-center space-y-4 p-5">
            <h2 className="text-2xl font-semibold">Your Venue Bookings</h2>
            {bookItems.length === 0 ? (
                <p className="text-lg text-gray-500">No Venue Booking</p>
            ) : (
                bookItems.map((item) => (
                    <div className="bg-slate-200 rounded-lg px-5 py-3 w-[90%] max-w-md" key={item.nameLastname + item.bookDate}>
                        <div className="text-xl font-medium">{item.nameLastname}</div>
                        <div className="text-md">Contact: {item.tel}</div>
                        <div className="text-md">Venue: {item.venue}</div>
                        <div className="text-md">Date: {item.bookDate}</div>
                        <button
                            className="mt-2 block rounded-md bg-red-600 hover:bg-red-700 px-3 py-2 text-white shadow-sm"
                            onClick={() => dispatch(removeBooking(item))}
                        >
                            Cancel Booking
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}