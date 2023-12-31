import axios from "axios";

const baseUrl = '/api/persons'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const create = (personObject) => {
    return axios
        .post(baseUrl, personObject)
        .then(response => response.data)
}

const update = (id, personObject) => {
    return axios
        .patch(`${baseUrl}/${id}`, personObject)
        .then(response => response.data)
}

const deleteEntry = id => {
    axios
      .delete(`${baseUrl}/${id}`)
}

export default {getAll, create, update, deleteEntry}