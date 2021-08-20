import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}
  
const create = (person) => {
    return axios.post(baseUrl, person).then(response => response.data)
}

const personsExports = {getAll, create}
export default personsExports
