export var Singleton = (function () {
    var instance;
    function createInstance() {
        var object = new Object("I am the instance");
        return object;
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
        getInstance2: function () {
            if (!instance) {
                instance = createInstance();
            }
            return 'I am nro 2';
        }
    };
})();
