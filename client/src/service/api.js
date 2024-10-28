import axios from 'axios'
import { API_NOTIFICATION_MESSAGES ,SERVICE_URLS } from '../constant/config';
import { getAccessToken ,getType} from '../util/common-util';

const API_URL='http://localhost:8000';
const axiosInstance=axios.create({
    baseURL:API_URL,
    timeout: 10000,
    headers:{
        
        "Accept": "application/json, form-data", 
"Content-Type": "application/json"
    }

})
axiosInstance.interceptors.request.use(
    function(config){
           if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)
axiosInstance.interceptors.response.use(
    function(response){
        return processResponse(response);
    },
    function (error){
        return Promise.reject(processError(error));
    }

)
///////////////////////////////
// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isFailure: true, status: string, msg: string, code: int }
//////////////////////////////
const processResponse= (response)=>{
    if(response?.status===200){
return { isSuccess: true, data: response.data }

    } else{
        return {
            isFailure:true,
            status:response?.status,
            msg:response?.msg,
            code:response?.code
        }
    }

}

const processError=(error)=>{
    if(error.response){
        //request moade and server responded with a status other
        //that fails out of the range 2.x.x
    console.log("ERROR IN REPONSE:", error.toJSON());
    
        return{
        isError:true,
        msg: API_NOTIFICATION_MESSAGES.responseFailure,
        code: error.response.status
    }
    }
    else if(error.request){
        //request made but no response was recieved
       console.log("ERROR IN REQUEST: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    }
    else{
        //something happened in setting up request that triggers an error
          console.log("ERROR IN NETWORK: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }


    }
}


const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
              headers: {
                authorization: getAccessToken(),
            },
             TYPE: getType(value, body),
           
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}

export { API };

