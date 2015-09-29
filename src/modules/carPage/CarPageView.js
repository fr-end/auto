module.exports = (function () {

    function View() {
        this.$viewPort = document.querySelector('.main');
    }

    View.prototype.render = function (data) {
        console.log("view");
        this.$viewPort.innerHTML = data;
    };

    return View

})();