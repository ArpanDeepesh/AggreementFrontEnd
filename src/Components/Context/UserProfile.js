var UserProfile = (function () {

    var getUserId = function () {
        return localStorage.getItem("userId");
        // Or pull this from cookie/localStorage
    };

    var setUserId = function (id) {
        localStorage.setItem("userId", id);
        // Also set this in cookie/localStorage
    }
    var getUserGSTIN = function () {
        return localStorage.getItem("userGSTIN");
        // Or pull this from cookie/localStorage
    };

    var setUserGSTIN = function (gstin) {
        localStorage.setItem("userGSTIN", gstin);
        // Also set this in cookie/localStorage
    }

    var getEmail = function () {
        return localStorage.getItem("email");
    };

    var setEmail = function (name) {
        localStorage.setItem("email", name);
        // Also set this in cookie/localStorage
    };

    var getToken = function () {
        return localStorage.getItem("token");
    };

    var setToken = function (name) {
        localStorage.setItem("token", name);
    };
    var getName = function () {
        return localStorage.getItem("display_name");
    };

    var setName = function (name) {
        localStorage.setItem("display_name", name);
    };

    var getContactNumber = function () {
        return localStorage.getItem("contact_number");
    };

    var setContactNumber = function (name) {
        localStorage.setItem("contact_number", name);
    };
    var getWatsAppNumber = function () {
        return localStorage.getItem("watsapp_number");
    };

    var setWatsAppNumber = function (name) {
        localStorage.setItem("watsapp_number", name);
    };
    var getLoginStatus = function () {
        return localStorage.getItem("user_login_status");
    };

    var setLoginStatus = function (name) {
        localStorage.setItem("user_login_status", name);
    };
    var resetUser = function () {
        setName("");
        setEmail("");
        setToken("");
        setContactNumber("");
        setUserId("");
        setWatsAppNumber("");
        setLoginStatus("0");
        setUserGSTIN("");

    };
    return {
        getName: getName,
        setName: setName,
        getUserGSTIN: getUserGSTIN,
        setUserGSTIN: setUserGSTIN,
        getToken: getToken,
        setToken: setToken,
        getEmail: getEmail,
        setEmail: setEmail,
        resetUser: resetUser,
        getContactNumber: getContactNumber,
        setContactNumber: setContactNumber,
        getUserId: getUserId,
        setUserId: setUserId,
        getWatsAppNumber: getWatsAppNumber,
        setWatsAppNumber: setWatsAppNumber,
        getLoginStatus: getLoginStatus,
        setLoginStatus: setLoginStatus
    }

})();

export default UserProfile;