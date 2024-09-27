var PurchaseOrder = (function () {

    var getPoId = function () {
        return localStorage.getItem("purchaseId");    // Or pull this from cookie/localStorage
    };

    var setPoId = function (name) {
        localStorage.setItem("purchaseId", name);
        // Also set this in cookie/localStorage
    };
    var getPurchaseOrderEditFlag = function () {
        return localStorage.getItem("editFlag");    // Or pull this from cookie/localStorage
    };

    var setPurchaseOrderEditFlag = function (name) {
        localStorage.setItem("editFlag", name);
        // Also set this in cookie/localStorage
    };
    

    var resetData = function () {
        setPoId(0);
        setPurchaseOrderEditFlag(0);
    };
    return {
        getPoId: getPoId,
        setPoId: setPoId,
        getPurchaseOrderEditFlag: getPurchaseOrderEditFlag,
        setPurchaseOrderEditFlag: setPurchaseOrderEditFlag,
        resetData: resetData
    }

})();

export default PurchaseOrder;