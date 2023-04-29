import axios from '../Axios/AxiosInstance';

export const Permissions = async (roleID, operationID) => {
    try {
        const response = await axios.post(`/permission`, { roleID, operationID });
        const accessForAction = response.data;
        return accessForAction;
    } catch (error) {
        console.error(error);
        return null;
    }
};