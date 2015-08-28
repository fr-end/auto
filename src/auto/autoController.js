var auto = {

  test: function () {

      alert('test started');
      
      function getXmlHttp(){
        var xmlhttp;
        try {
          xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
          try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (E) {
            xmlhttp = false;
          }
        }
        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
          xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
      }

      var xmlhttp = getXmlHttp()
      xmlhttp.open('GET', 'http://localhost:8080/proxy/?category_id=1&marka_id=98&model_id=955&state=0&category_id=1&state[0]=0&s_yers[0]=0&po_yers[0]=0&currency=1&marka_id[0]=98&model_id[0]=955&countpage=20&page=1', true);
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
           if(xmlhttp.status == 200) {
                    document.getElementById('viewport').innerHTML=xmlhttp.responseText;            
            }
        }
      };
      xmlhttp.send(null);

    }
}


module.exports = auto;

