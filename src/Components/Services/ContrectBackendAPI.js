
const baseAddress = "https://www.api.contrect.com/";

export const checkConnection = () => {
    return fetch(baseAddress + 'api/General/Connect', {
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
            'ClientKey': 'ContrectManagerFrontEnd',
        },
        //referrerPolicy: "unsafe-url"
    });
}
export const validateOTPRequest = (postbody) => {
    if (postbody) {
        return fetch(baseAddress + "api/Auth/ValidateOTP", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'ClientKey': 'ContrectManagerFrontEnd',
            },
            body: JSON.stringify(postbody),
            //referrerPolicy: "unsafe-url" 
        });
    }
    return;

}
export const loginRequest = (postbody) => {
    if (postbody) {
        return fetch(baseAddress + "api/Auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'ClientKey': 'ContrectManagerFrontEnd',
            },
            body: JSON.stringify(postbody),
            //referrerPolicy: "unsafe-url" 
        });
    }
    return;

}
export const gloginRequest = (postbody) => {
    if (postbody) {
        return fetch(baseAddress + "api/Auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'ClientKey': 'ContrectManagerFrontEnd',
            },
            body: JSON.stringify(postbody),
            //referrerPolicy: "unsafe-url" 
        });
    }
    return;

}
export const registerRequest = (postbody) => {
    if (postbody) {
        return fetch(baseAddress + "api/Auth/Register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'ClientKey': 'ContrectManagerFrontEnd',
            },
            body: JSON.stringify(postbody),
            //referrerPolicy: "unsafe-url" 
        });
    }
    return;

}
export const getInfoFromGoogle = (access_token) =>
{
    return fetch("https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + access_token, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Origin': 'https://www.contrect.com',
            'Authorization': "Bearer " + access_token
        }
    });
}
export const validateContactInfoRequest = (postbody) => {
    if (postbody) {
        return fetch(baseAddress + "api/Auth/SendOtp", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'ClientKey': 'ContrectManagerFrontEnd',
            },
            body: JSON.stringify(postbody),
            //referrerPolicy: "unsafe-url" 
        });
    }
    return;

}
export const getRequestAllowAll = (url) => {
    return fetch(baseAddress + url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        //referrerPolicy: "unsafe-url" 
    });
}
export const getRequest = (url,token) => {
    return fetch(baseAddress + url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'ClientKey': 'ContrectManagerFrontEnd',
            'Authorization': 'Bearer ' + token
            
        },
        //referrerPolicy: "unsafe-url" 
    });
}
export const deleteRequest = (url, token) => {
    return fetch(baseAddress + url, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'ClientKey': 'ContrectManagerFrontEnd',
            'Authorization': 'Bearer ' + token

        },
        //referrerPolicy: "unsafe-url" 
    });
}
export const sendPostRequest = (url, token, postbody) => {
    console.log(postbody);
    if (postbody) {
        return fetch(baseAddress + url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'ClientKey': 'ContrectManagerFrontEnd',
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
            'ClientKey': 'ContrectManagerFrontEnd',
            Authorization: 'Bearer ' + token
        },
        //referrerPolicy: "unsafe-url" 
    });

}
export const uploadFile = (formData,token) => {
    return fetch(baseAddress + "api/General/upload", {
        method: "POST",
        body: formData,
        headers: {
            'ClientKey': 'ContrectManagerFrontEnd',
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