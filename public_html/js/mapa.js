

/***********************************************************************
 * Este fichero contiene toda la funcionalidad asociada a Google Earth *
 * *********************************************************************/

var ge;
var rutaMostrada = -1; //Índice que la ruta que se está mostrando actualmente

var lineas = new Array(); //Contiene las rutas

var url_lineas = new Array(); //Contiene las URL de todas las rutas 
url_lineas[1] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Lnea01Peamefcit-Centro.kml';
url_lineas[2] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Linea2PolgonoLosOlivares-Centro.kml';
url_lineas[3] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Lnea3CerroMolina-PalacioCongresos-Centro.kml';
url_lineas[4] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Linea4Alcantarilla-Glorieta-Centro-Universidad-CentroComercial.kml';
url_lineas[5] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Lnea5TiroNacional-Glorieta-Centro.kml';
url_lineas[6] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Linea6Cementerio-Centro.kml';
url_lineas[7] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Lnea7PolgonoElValle-Universidad-Centro.kml';
url_lineas[8] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Linea8-Alcantarilla-Centro-AvdaAndaluca-Fuentezuelas.kml';
url_lineas[9] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Linea9-TiroNacional-Circunvalacin-PolgonoElValle-Universidad.kml';
url_lineas[10] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Lnea10-TiroNacional-SanFelipe-Centro-PolgonoElValle-PolgonoLosOlivares.kml';
url_lineas[11] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Lnea11-TiroNacional-SanFelipe-Centro-PolgonoLosOlivares.kml';
url_lineas[12] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Lnea12-Centro-Universidad-CentroComercial.kml';
url_lineas[13] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Lnea13A-UrbanizacinAzahar-Centro-Cementerio.kml';
url_lineas[14] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Lnea14-AvdaAndaluca-UrbAzahar-CentroComercial.kml';
url_lineas[15] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Lnea15-Magdalena-Centro-PolgonoElValle.kml';
url_lineas[16] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Lnea16-TiroNacional-SanFelipe-Centro-AvdaAndaluca.kml';
url_lineas[17] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Lnea17-Azahar-Fuentezuelas-Universidad-PolgonoLosOlivares.kml';
url_lineas[18] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Lnea18-Azahar-Fuentezuelas-Centro.kml';
url_lineas[19] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Lnea19-Bulevar-PaseodelaEstacin-Renfe-Centro.kml';

var paradas = new Array(); // Contiene las paradas de cada ruta

var url_paradas = new Array(); //Contiene las URL de las paradas de cada ruta
url_paradas[1] = 'https://dl.dropboxusercontent.com/u/20056281/Paradas/paradas_linea1.KML';
url_paradas[2] = 'https://dl.dropboxusercontent.com/u/20056281/Paradas/paradas_linea2.KML';
url_paradas[4] = 'https://dl.dropboxusercontent.com/u/20056281/Paradas/paradas_linea4.KML';
url_paradas[5] = 'https://dl.dropboxusercontent.com/u/20056281/Paradas/paradas_linea5.KML';
url_paradas[6] = 'https://dl.dropboxusercontent.com/u/20056281/Paradas/paradas_linea6.KML';
url_paradas[7] = 'https://dl.dropboxusercontent.com/u/20056281/Paradas/paradas_linea7.KML';
url_paradas[8] = '';
url_paradas[9] = '';
url_paradas[10] = '';
url_paradas[11] = '';
url_paradas[12] = '';
url_paradas[13] = '';
url_paradas[14] = '';
url_paradas[15] = '';
url_paradas[16] = '';
url_paradas[17] = '';
url_paradas[18] = '';
url_paradas[19] = '';




google.load("earth", "1.x");

function init() {
    google.earth.createInstance('mapa', initCB, failureCB);
}

function initCB(instance) {
    ge = instance;

    ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

    ge.getWindow().setVisibility(true);

    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);

    lookAt.setLongitude(-3.795573);
    lookAt.setLatitude(37.774807);
    lookAt.setRange(5000); // Altura de la camara
    lookAt.setHeading(0); // Camara orientada al norte

    ge.getView().setAbstractView(lookAt);

    cargarLineas();
}

function failureCB(errorCode) {
}

google.setOnLoadCallback(init);


/**
 * Función que mueve la cámara hasta Jaén.
 * @returns {void}
 */
function irAJaen() {

    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);

    lookAt.setLongitude(-3.795573);
    lookAt.setLatitude(37.774807);
    lookAt.setRange(5500); // Altura de la camara
    lookAt.setHeading(0); // Camara orientada al norte

    ge.getView().setAbstractView(lookAt);

}

/** 
 * Carga las rutas de los autobuses urbanos.
 * @returns {void}
 */
function cargarLineas() {

    for (var i = 1; i <= 19; i++) {

        var ruta = ge.createLink('');
        var parada = ge.createLink('');
        
        ruta.setHref(url_lineas[i]);
        parada.setHref(url_paradas[i]);
        
        lineas[i] = ge.createNetworkLink('');
        paradas[i] = ge.createNetworkLink('');
        
        lineas[i].setLink(ruta);
        paradas[i].setLink(parada);

    }

    alert("Todas las lineas cargadas");

}


/**
 * Muestra la ruta seleccionada.
 * @param index Índice de la ruta seleccionada en el combobox
 * @returns {void}
 */

function mostrarRuta(index) {


    if (index === 0) {

        ge.getFeatures().removeChild(lineas[rutaMostrada]);
        ge.getFeatures().removeChild(lineas[rutaMostrada]);
        rutaMostrada = -1;

    } else {

        if (rutaMostrada !== -1) {

            ge.getFeatures().removeChild(lineas[rutaMostrada]);
            ge.getFeatures().removeChild(paradas[rutaMostrada]);
            rutaMostrada = index;
            ge.getFeatures().appendChild(lineas[rutaMostrada]);
            ge.getFeatures().appendChild(paradas[rutaMostrada]);

        } else {

            rutaMostrada = index;
            ge.getFeatures().appendChild(lineas[rutaMostrada]);
            ge.getFeatures().appendChild(paradas[rutaMostrada]);

        }

    }

    irAJaen();

}

/**
 * Dibuja una circunferencia con centro (x,y) y con radio rad.
 * @param {float} rad Radio de la circunferencia
 * @param {float} centro Centro de la circunferencia
 * @returns {makeCircle.ring}
 */
function dibujarPrecision(rad, centro) {
   
    var anillo = ge.createLinearRing('');
    var steps = 25;
    var pi2 = Math.PI * 2;
    
    for (var i = 0; i < steps; i++) {
        
        var lat = centro.getLatitude() + rad * Math.cos(i / steps * pi2);
        var lng = centro.getLongitude() + rad * Math.sin(i / steps * pi2);
        anillo.getCoordinates().pushLatLngAlt(lat, lng, 0);
        
    }
    
    return anillo;
    
}

/**
 * Geolocalización del usuario.
 * @returns {void}
 */
function geoLoc() {

    if (navigator.geolocation) {

        var latitud = document.getElementById("geoLat");
        var longitud = document.getElementById("geoLong");
        var precision = document.getElementById("geoAcc");

        navigator.geolocation.getCurrentPosition(function(objPosition)
        {
            var long = objPosition.coords.longitude;
            var lat = objPosition.coords.latitude;
            var acc = objPosition.coords.accuracy;
            var loc = ge.createPlacemark('');
            var punto = ge.createPoint('');
            var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
            var icon = ge.createIcon('');
            icon.setHref('https://dl.dropboxusercontent.com/u/20056281/Iconos/male-2.png');
            var style = ge.createStyle('');
            style.getIconStyle().setIcon(icon);
            loc.setStyleSelector(style);

            punto.setLatitude(lat);
            punto.setLongitude(long);
            loc.setGeometry(punto);
            lookAt.setLatitude(lat);
            lookAt.setLongitude(long);
            lookAt.setRange(500);

            ge.getView().setAbstractView(lookAt);

            ge.getFeatures().appendChild(loc);
//            var c = ge.createPlacemark('');
//            c.setGeometry(dibujarPrecision(0.0005, punto));
//            ge.getFeatures().appendChild(c);

            latitud.innerHTML = "<p>Latitud: " + lat + "</p>";
            longitud.innerHTML = "<p>Longitud: " + long + "</p>";
            precision.innerHTML = "<p>Precisión: " + acc + "</p>";

        }, function(objPositionError)
        {
            switch (objPositionError.code)
            {
                case objPositionError.PERMISSION_DENIED:
                    alert("No se ha permitido el acceso a la posición del usuario.");
                    break;
                case objPositionError.POSITION_UNAVAILABLE:
                    alert("No se ha podido acceder a la información de su posición.");
                    break;
                case objPositionError.TIMEOUT:
                    alert("El servicio ha tardado demasiado tiempo en responder.");
                    break;
                default:
                    alert("Error desconocido.");
            }
        }, {
            maximumAge: 75000,
            timeout: 15000
        });

    } else {

        alert("Tu navegador no soporta la función de geolocalización.");

    }

}

