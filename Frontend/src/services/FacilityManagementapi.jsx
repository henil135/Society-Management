// import axios from "axios";
import axios from "axios";
import api from "./api"

export const getFacilities = async () => {
    const response = await axios.get(`https://society-management-b6tj.onrender.com/api/v2/facility/`);
    return response.data;
  };
export const getFacilitiesByID = async (id) => {
    const response = await api.get(`https://society-management-b6tj.onrender.com/api/v2/facility/${id}`);
    return response.data;
  };
  
  // Create a new facility
  export const createFacility = async (facilityData) => {
    const response = await axios.post(`https://society-management-b6tj.onrender.com/api/v2/facility/addfacility`, facilityData);
    return response.data;
  };
  
  // Update an existing facility
  export const updateFacility = async (id, facilityData) => {
    const response = await axios.put(`https://society-management-b6tj.onrender.com/api/v2/facility/updatefacility/${id}`, facilityData);
    return response.data;
  };
  
  // Delete a facility
//   export const deleteFacility = async (id) => {
//     const response = await api.delete(`http://localhost:5000/api/v2/facility/addfacility${id}`);
//     return response.data;
//   };