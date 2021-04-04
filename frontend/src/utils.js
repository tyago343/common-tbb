import axios from 'axios';

export const fetchEntries = async () => {
    const result = await axios.get("http://localhost:3000/entries");
    if(!result.data) {
        return false;
    }
    return result.data;
}