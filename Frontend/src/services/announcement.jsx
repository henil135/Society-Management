import api from "./api";

// create Announcement
export const createAnnouncement = async (data) =>
  await api.post("http://localhost:5000/api/v2/annoucement/addannouncement", data);

// get  Announcement
export const getAnnouncements = async () =>
  await api.get("http://localhost:5000/api/v2/annoucement/");

// get single Announcement by id
export const getAnnouncement = async (id) =>
  await api.get(`http://localhost:5000/api/v2/annoucement/${id}`);

// delete Announcement by id
export const deleteAnnouncement = async (id) =>
  await api.delete(`http://localhost:5000/api/v2/annoucement/deleteannouncement/${id}`);

//update Announcement by id
export const updateAnnouncement = async (id, data) =>
  await api.patch(`http://localhost:5000/api/v2/annoucement/updateannouncement/${id}`, data);