var OtherData = (function () {

    var getCityList = function () {
        return localStorage.getItem("cityList");    // Or pull this from cookie/localStorage
    };

    var setCityList = function (name) {
        localStorage.setItem("cityList", name);
        // Also set this in cookie/localStorage
    };



    var resetData = function () {
        setCityList([]);
    };
    return {
        getCityList: getCityList,
        setCityList: setCityList,
        resetData: resetData
    }

})();

export default OtherData;