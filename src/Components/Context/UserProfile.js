var UserProfile = (function () {

    var getUserId = function () {
        return localStorage.getItem("userId");
        // Or pull this from cookie/localStorage
    };

    var setUserId = function (id) {
        localStorage.setItem("userId", id);
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
        setLoginStatus("0");

    };
    return {
        getName: getName,
        setName: setName,
        getToken: getToken,
        setToken: setToken,
        getEmail: getEmail,
        setEmail: setEmail,
        resetUser: resetUser,
        getContactNumber: getContactNumber,
        setContactNumber: setContactNumber,
        getUserId: getUserId,
        setUserId: setUserId,
        getLoginStatus: getLoginStatus,
        setLoginStatus: setLoginStatus
    }

})();

export default UserProfile;