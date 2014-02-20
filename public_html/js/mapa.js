

/***********************************************************************
 * Este fichero contiene toda la funcionalidad asociada a Google Earth *
 * *********************************************************************/

var ge;
var lineas = new Array();
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


/**
 * Función que mueve la cámara hasta Jaén.
 */
function irAJaen() {

    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);

    lookAt.setLongitude(-3.795573);
    lookAt.setLatitude(37.774807);
    lookAt.setRange(4000); // Altura de la camara
    lookAt.setHeading(0); // Camara orientada al norte

    ge.getView().setAbstractView(lookAt);

}

/** 
 * Carga las rutas de los autobuses urbanos.
 */
function cargarLineas() {

    alert("EN CONTRUCCIÓN...");

    var href = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Linea2PolgonoLosOlivares-Centro.kml';

    google.earth.fetchKml(ge, href, function(linea) {
        if (linea)
            ge.getFeatures().appendChild(linea);
        if (linea.getAbstractView()) //Definir el elemento <Camera> en el KML de todas las rutas
            ge.getView().setAbstractView(linea.getAbstractView());
    });

}


