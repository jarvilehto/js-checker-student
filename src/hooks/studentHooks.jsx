import {useState, useEffect} from 'react'
import axios from "axios";

export default async function studentHook(data) {
    const res = await axios.post("http://localhost:3000/api/student/", data)
    return res.data;
}
