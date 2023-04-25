import axios from "axios";
import { useEffect, useState } from "react";

async function useTest(assg, url) {
  const response = await axios.post(
    `http://localhost:3000/api/assignments/${assg}`,
    url
  );
  return response.data;
}

async function getAssignmentById(id) {
  try {
    const assg = await axios.get(`http://localhost:3000/api/assignments/${id}`);
    return assg.data;
  } catch (error) {
    console.log(error.message);
  }
}

function useResource() {
  const [resources, setResources] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/assignments`)
      .then((res) => setResources(res.data))
      .catch((error) => console.error(error.message));
  }, []);
  return [resources];
}

export { useTest, getAssignmentById, useResource };
