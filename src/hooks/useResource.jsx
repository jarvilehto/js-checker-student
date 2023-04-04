import React from 'react'
import {useState, useEffect} from 'react'
import axios from "axios";

export default function useResource() {
    const [resources, setResources] = useState([]);
    // Get a list of available assignments from DB
    useEffect(() => {
        axios
          .get(`http://localhost:3000/api/assignment`)
          .then((res) => setResources(res.data))
          .catch((error) => console.error(error.message));
      }, []);

    // Post assignment for tests.
    const post = (assg) => {
        axios
        .post(`http://localhost:3000/api/assignment/${assg.name}`, url)
        .then((res) => console.log("Evaluation starting"))
        .catch((error) => console.log(error.message));
    }
    const service = {post}
    return [resources, service]
}
