import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}
  
const create = (person) => {
    return axios.post(baseUrl, person).then(response => response.data)
}

const remove = (id) => {
    return axios.delete(baseUrl + '/' + id)
}

const update = (person) => {
    return axios.put(baseUrl + '/' + person.id, person).then(response => response.data)
}
const personsExports = {getAll, create, remove, update}
export default personsExports
