import AsyncStorage from './async-storage.util';

const requestID = () => AsyncStorage.getRequestID() ?? '';
export default requestID;
