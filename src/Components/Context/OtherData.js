var OtherData = (function () {

    var getData = function () {
        return localStorage.getItem("data");    // Or pull this from cookie/localStorage
    };

    var setData = function (name) {
        localStorage.setItem("data", name);
        // Also set this in cookie/localStorage
    };



    var resetData = function () {
        setData("");
    };
    return {
        getData: getData,
        setData: setData,
        resetData: resetData
    }

})();

export default OtherData;