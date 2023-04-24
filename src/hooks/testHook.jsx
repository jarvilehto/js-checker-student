import axios from "axios";

async function useTest(assg, url) {
    const response = await axios.post(`http://localhost:3000/api/assignments/${assg}`, url)
    return response.data
}

async function getAssignmentById(id){
    try {
        const assg = await axios.get(`http://localhost:3000/api/assignments/${id}`)
        return assg.data
    } catch (error) {
        console.log(error.message);
    }

}

export { useTest, getAssignmentById}