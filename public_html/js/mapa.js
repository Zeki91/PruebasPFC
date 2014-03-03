

/***********************************************************************
 * Este fichero contiene toda la funcionalidad asociada a Google Earth *
 * *********************************************************************/

var ge;
var rutaMostrada = -1; //Índice que la ruta que se está mostrando actualmente

var lineas = new Array(); //Contiene las rutas

var url_lineas = new Array(); //Contiene las URL de todas las rutas 
url_lineas[1] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Lnea01Peamefcit-Centro.kml';
url_lineas[2] = 'https://dl.dropboxusercontent.com/u/20056281/Rutas/Linea2PolgonoLosOlivares-Centro.kml';
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


google.load("earth", "1.x");

function init() {
    google.earth.createInstance('map3d', initCB, failureCB);
}

function initCB(instance) {
    ge = instance;
    ge.getWindow().setVisibility(true);
    
    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);

    lookAt.setLongitude(-3.795573);
    lookAt.setLatitude(37.774807);
    lookAt.setRange(5000); // Altura de la camara
    lookAt.setHeading(0); // Camara orientada al norte

    ge.getView().setAbstractView(lookAt);
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
    lookAt.setRange(5000); // Altura de la camara
    lookAt.setHeading(0); // Camara orientada al norte

    ge.getView().setAbstractView(lookAt);

}

/** 
 * Carga las rutas de los autobuses urbanos.
 */
function cargarLineas() {

    for (var i = 1; i <= 19; i++) {
        
        if (i !== 3) {
            
            var ruta = ge.createLink('');
            ruta.setHref(url_lineas[i]);
            lineas[i] = ge.createNetworkLink('');
            lineas[i].setLink(ruta);  
            
        }  
      
    }
    
    alert("Todas las lineas cargadas");
    
}


/**
 * Muestra la ruta seleccionada
 * @param index Índice de la ruta seleccionada en el combobox
 */

function mostrarRuta(index){
    
    if (index === 3) {
        
        alert("Esta línea no está añadida al modelo");
        
    } else if (index === 0) {     
        
        ge.getFeatures().removeChild(lineas[rutaMostrada]);
        rutaMostrada = -1;
        
    } else {
    
        if (rutaMostrada !== -1) {

            ge.getFeatures().removeChild(lineas[rutaMostrada]);
            rutaMostrada = index;
            ge.getFeatures().appendChild(lineas[rutaMostrada]);

        } else {

            rutaMostrada = index;
            ge.getFeatures().appendChild(lineas[rutaMostrada]);

        }
    
    }
}