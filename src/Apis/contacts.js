import axios from "axios";

export const getAllContacts = async (page, search) => {
    return await axios
        .get(`/contacts/?page=${page}&search=${search}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};
export const getUsContacts = async (page, search) => {
    return await axios
        .get(`/country-contacts/United States/?page=${page}&search=${search}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            throw err;
        });
};