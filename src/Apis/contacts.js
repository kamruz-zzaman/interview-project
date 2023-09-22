import axios from "axios";

export const getAllContacts = async (page) => {
    return await axios
        .get(`/contacts/?page=${page}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};