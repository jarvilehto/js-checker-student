import React from 'react'
import {useState, useEffect} from 'react'
import axios from "axios";

export default function useResource() {
    const [resources, setResources] = useState([]);
    const [results, setResults] = useState([])
    // Get a list of available assignments from DB
    useEffect(() => {
        axios
          .get(`http://localhost:3000/api/assignment`)
          .then((res) => setResources(res.data))
          .catch((error) => console.error(error.message));
      }, []);

    // Post assignment for tests.
    const post = (assg,url) => {
        axios
        .post(`http://localhost:3000/api/assignment/${assg}`, url)
        .then(console.log("Evaluation starting"))
        .then((res) => {
            setResults(res.data)
        })
        .catch((error) => console.log(error.message));
    }
    const service = {post}
    return [resources, service, results]
}
