

/** Este fichero contiene todas las funciones necesarias para manejar 
 *  el complemento de Google Earth correctamente */

    var ge;
    google.load("earth", "1.x");

    function init() {
      google.earth.createInstance('map3d', initCB, failureCB);
    }

    function initCB(instance) {
      ge = instance;
      ge.getWindow().setVisibility(true);
    }

    function failureCB(errorCode) {
    }

    google.setOnLoadCallback(init);
    
    
    // Desplaza la cámara hasta Jaén
    function irAJaen() {

        var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
        //alert("Latitud: " + lookAt.getLatitude() + 
        //		 "\nLongitud: " + lookAt.getLongitude());

        lookAt.setLongitude(-3.795573);
        lookAt.setLatitude(37.774807);
        lookAt.setRange(4000); // Altura de la camara
        lookAt.setHeading(0); // Camara orientada al norte

        ge.getView().setAbstractView(lookAt);

    }
    
    // Función para cargar las rutas de los autobuses
    function cargarLineas() {
        
        alert("EN CONTRUCCIÓN");
        
        var link = ge.createLink('');
        var href = 'C:\Users\Ezequiel\Documents\PFC\Lineas\Linea2PolgonoLosOlivares-Centro.kml';
        link.setHref(href);

        var networkLink = ge.createNetworkLink('');
        networkLink.set(link, true, true); // Sets the link, refreshVisibility, and flyToView

        ge.getFeatures().appendChild(networkLink);
        
    }
    
    
