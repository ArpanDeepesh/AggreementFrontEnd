
const baseAddress = "http://localhost:5004/";

export const checkConnection = () => {
    return fetch(baseAddress + 'api/Common/Connect', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        referrerPolicy: "unsafe-url" 
    });
}
export const sendAuthNotificationRequest = (phoneNo) => {
    return fetch(baseAddress + "api/POManagerAuth/SendOtp?phNo=" + phoneNo, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'ClientKey': 'POManagerFrontEnd',
        },
        referrerPolicy: "unsafe-url"
    });
}
export const validateOTPRequest = (postbody) => {
    console.log(postbody);
    if (postbody) {
        return fetch(baseAddress + "api/POManagerAuth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'ClientKey': 'POManagerFrontEnd',
            },
            body: JSON.stringify(postbody),
            referrerPolicy: "unsafe-url" 
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
        referrerPolicy: "unsafe-url" 
    });
}
export const sendPostRequest = (url, token, postbody) => {
    //console.log("url-"+url+"token-"+token+" body: "+JSON.stringify(postbody));
    console.log(postbody);
    if (postbody) {
        return fetch(baseAddress + url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'ClientKey': 'POManagerFrontEnd',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(postbody),
            referrerPolicy: "unsafe-url" 
        });
    }
    return fetch(baseAddress + url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        referrerPolicy: "unsafe-url" 
    });

}
export const uploadFile = (formData) => {
    return fetch(baseAddress + "api/FileSystem/fileUpload", {
        method: "POST",
        body: formData
    });
}

export const uploadMultipleFile = (formData) => {
    return fetch(baseAddress + "api/FileSystem/multipleFileUpload", {
        method: "POST",
        body: formData
    });
}