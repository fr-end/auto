module.exports = (function () {

    function View() {
        this.$viewPort = document.querySelector('.main');
    }

    View.prototype.render = function (data) {
        this.$viewPort.innerHTML = data;
    };

    return View;

})();