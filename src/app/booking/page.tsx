"use client";

import { useState } from "react";
import { Select, MenuItem, TextField, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

export default function Booking() {
    const dispatch = useDispatch<AppDispatch>();

    const [name, setName] = useState<string>('');
    const [contact, setContact] = useState<string>('');
    const [venue, setVenue] = useState<string>('');
    const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleBooking = () => {
        if (!name || !contact || !venue || !bookingDate) {
            setError("Please fill in all fields.");
            return;
        }

        const item = {
            nameLastname: name,
            tel: contact,
            venue: venue,
            bookDate: dayjs(bookingDate).format('YYYY/MM/DD'),
        };

        dispatch(addBooking(item));
        setError(null);
    };

    return (
        <main className="w-full flex flex-col items-center space-y-5 p-10 bg-slate-100 rounded-lg">
            <div className="text-2xl font-medium text-black">Book a Venue</div>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField 
                id="name" 
                label="Name-Lastname" 
                variant="standard" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />

            <TextField 
                id="contact" 
                label="Contact-Number" 
                variant="standard" 
                value={contact} 
                onChange={(e) => setContact(e.target.value)}
            />

            <Select 
                variant="standard" 
                value={venue} 
                onChange={(e) => setVenue(e.target.value)}
                className="h-[2em] w-[200px]"
            >
                <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                <MenuItem value="Spark">Spark Space</MenuItem>
                <MenuItem value="GrandTable">The Grand Table</MenuItem>
            </Select>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Booking Date"
                    value={bookingDate}
                    onChange={(newValue) => setBookingDate(newValue)}
                />
            </LocalizationProvider>

            <button 
                className="block rounded-md bg-sky-600 hover:bg-indigo-600 p-3 shadow-sm text-white" 
                onClick={handleBooking}
            >
                Book Venue
            </button>
        </main>
    );
}