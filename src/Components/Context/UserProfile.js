var UserProfile = (function () {

    var getUserId = function () {
        return localStorage.getItem("userId");
        // Or pull this from cookie/localStorage
    };

    var setUserId = function (id) {
        localStorage.setItem("userId", id);
        // Also set this in cookie/localStorage
    }

    //var getEmail = function () {
    //    return localStorage.getItem("email");
    //};

    //var setEmail = function (name) {
    //    localStorage.setItem("email", name);
    //    // Also set this in cookie/localStorage
    //};

    var getToken = function () {
        return localStorage.getItem("token");
    };

    var setToken = function (name) {
        localStorage.setItem("token", name);
    };
    var getUserType = function () {
        return localStorage.getItem("user_type");
    };

    var setUserType= function (name) {
        localStorage.setItem("user_type", name);
    };
    var getName = function () {
        return localStorage.getItem("display_name");
    };

    var setName = function (name) {
        localStorage.setItem("display_name", name);
    };
    var getEmail = function () {
        return localStorage.getItem("user_email");
    };

    var setEmail = function (name) {
        localStorage.setItem("user_email", name);
    };
    var getPhoneNumber = function () {
        return localStorage.getItem("user_phone");
    };

    var setPhoneNumber = function (name) {
        localStorage.setItem("user_phone", name);
    };
    //var getContactNumber = function () {
    //    return localStorage.getItem("contact_number");
    //};

    //var setContactNumber = function (name) {
    //    localStorage.setItem("contact_number", name);
    //};
    var getLoginStatus = function () {
        return localStorage.getItem("user_login_status");
    };

    var setLoginStatus = function (name) {
        localStorage.setItem("user_login_status", name);
    };
    var resetUser = function () {
        setName("");
        setToken("");
        setUserId("");
        setLoginStatus("0");
        setUserType("");
        setPhoneNumber("");
        setEmail("");
    };
    return {
        getName: getName,
        setName: setName,
        getToken: getToken,
        setToken: setToken,
        resetUser: resetUser,
        getUserId: getUserId,
        setUserId: setUserId,
        getUserType: getUserType,
        setUserType: setUserType,
        getLoginStatus: getLoginStatus,
        setLoginStatus: setLoginStatus,
        getEmail: getEmail,
        setEmail: setEmail,
        getPhoneNumber: getPhoneNumber,
        setPhoneNumber: setPhoneNumber
    }

})();

export default UserProfile;