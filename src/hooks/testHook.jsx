import axios from "axios";

export default async function useTest(assg, url) {
    const response = await axios.post(`http://localhost:3000/api/assignments/${assg}`, url)
    return response.data
}
