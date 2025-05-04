var OtherData = (function () {

    var getData = function () {
        return localStorage.getItem("data");    // Or pull this from cookie/localStorage
    };

    var setData = function (name) {
        localStorage.setItem("data", name);
        // Also set this in cookie/localStorage
    };
    var getTemplateName = function () {
        return localStorage.getItem("templateName");    // Or pull this from cookie/localStorage
    };

    var setTemplateName = function (name) {
        localStorage.setItem("templateName", name);
        // Also set this in cookie/localStorage
    };


    var resetData = function () {
        setData("");
        setTemplateName("");
    };
    return {
        getData: getData,
        setData: setData,
        getTemplateName: getTemplateName,
        setTemplateName: setTemplateName,
        resetData: resetData
    }

})();

export default OtherData;