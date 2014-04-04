
/**
 * Abre un mensaje mostrando las coordenadas del punto.
 * @returns {void}
 */
function getCoordenadas() {   
    alert("Latitud: " + this.getLatitud() + "\nLongitud: " + this.getLongitud());   
}

/**
 * Consctructor del punto.
 * @param {float} latitud Latitud del punto.
 * @param {float} longitud Longitud del punto.
 * @returns {void}
 */
function defPunto(latitud, longitud) {

    this.latitud = latitud;
    
    this.longitud = longitud;
    
    this.getLatitud = function () {
        return this.latitud;
    };
    
    this.getLongitud = function () {
         return this.longitud;
    };
    
    this.getCoordenadas = getCoordenadas;

}

