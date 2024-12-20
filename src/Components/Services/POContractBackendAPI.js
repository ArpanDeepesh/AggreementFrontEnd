
const baseAddress = "https://www.api.contrect.com/";

export const checkConnection = () => {
    return fetch(baseAddress + 'api/Common/Connect', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        //referrerPolicy: "unsafe-url" 
    });
}
export const crypt = (postBody) => {
    return fetch(baseAddress + 'api/Common/GetCryptStr', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postBody),
        //referrerPolicy: "unsafe-url"
    });
}
export const sendAuthNotificationRequest = (phoneNo) => {
    return fetch(baseAddress + "api/POManagerAuth/SendOtp?phNo=" + phoneNo, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'ClientKey': 'POManagerFrontEnd',
        },
        //referrerPolicy: "unsafe-url"
    });
}
export const validateOTPRequest = (postbody) => {
    if (postbody) {
        return fetch(baseAddress + "api/POManagerAuth/ValidateOTP", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'ClientKey': 'POManagerFrontEnd',
            },
            body: JSON.stringify(postbody),
            //referrerPolicy: "unsafe-url" 
        });
    }
    return;

}
export const loginRequest = (postbody) => {
    if (postbody) {
        return fetch(baseAddress + "api/POManagerAuth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'ClientKey': 'POManagerFrontEnd',
            },
            body: JSON.stringify(postbody),
            //referrerPolicy: "unsafe-url" 
        });
    }
    return;

}
export const getRequest = (url,token) => {
    return fetch(baseAddress + url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'ClientKey': 'POManagerFrontEnd',
            'Authorization': 'Bearer ' + token
            
        },
        //referrerPolicy: "unsafe-url" 
    });
}
export const sendPostRequest = (url, token, postbody) => {
    if (postbody) {
        return fetch(baseAddress + url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'ClientKey': 'POManagerFrontEnd',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(postbody),
            //referrerPolicy: "unsafe-url" 
        });
    }
    return fetch(baseAddress + url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'ClientKey': 'POManagerFrontEnd',
            Authorization: 'Bearer ' + token
        },
        //referrerPolicy: "unsafe-url" 
    });

}
export const uploadFile = (formData,token) => {
    return fetch(baseAddress + "api/FileUpload/upload", {
        method: "POST",
        body: formData,
        headers: {
            'ClientKey': 'POManagerFrontEnd',
            Authorization: 'Bearer ' + token
        },
        //referrerPolicy: "unsafe-url"
    });
}

export const uploadMultipleFile = (formData) => {
    return fetch(baseAddress + "api/FileUpload/upload", {
        method: "POST",
        body: formData
    });
}