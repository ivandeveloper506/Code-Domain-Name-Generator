/********************************************************************************/
/* Fecha Creación:  13 Febrero 2021.                                            */
/* Autor:           Iván Fonseca Castro                                         */
/*                                                                              */
/* Descripción:     Hoja principal de javascript, permite agregar funcionalidad */
/*                  a utilizar en el sitio Web, esto para darle dinamismo a la  */
/*                  a la misma, desde aqui se aplica toda la lógica para        */
/*                  obtener los dominios de forma aleatoria.                    */
/********************************************************************************/

const SPECIALPRICE = "$7.99/año";
let totalDomainHackExtension = 2;
let randomExtension = true;
let domainHackExtension = false;
let domainExtension = "Aleatoria";
let UrlDomainArray = [];
let isRowGenerate = false;

// Arreglo 1 con la primera parte que formara el dominio
let pronounsArray = ["the", "our", "you"];

// Arreglo 2 con la segunda parte que formara el dominio
let adjectivesArray = ["great", "big", "awesome"];

// Arreglo 3 con la tercera parte que formara el dominio
let nounsArray = ["jogger", "racoon", "computer"];

// Arreglo con los dominios
let domainArray = [".com", ".net", ".us", ".io", ".co"];

// Objeto para controlar los precios de los dominios.
let domainPriceObject = {
  ".com": "$5.99/año",
  ".net": "$4.99/año",
  ".us": "$3.99/año",
  ".io": "$2.99/año",
  ".co": "$1.99/año",
};

const createUrls = (
  argumentPronounsArray,
  argumentAdjectivesArray,
  argumentNounsArray
) => {
  /********************************************************************************/
  /* Fecha Creación:  13 Febrero 2021.                                            */
  /* Autor:           Iván Fonseca Castro                                         */
  /* Nombre Objeto:   createUrls()                                                */
  /* Argumentos:                                                                  */
  /*                  argumentPronounsArray: Corresponde con los valores de la    */
  /*                                         primera parte de donde se formara el */
  /*                                         dominio.                             */
  /*                  argumentAdjectivesArray: Corresponde con los valores de la  */
  /*                                           segunda parte de donde se formara  */
  /*                                           el dominio.                        */
  /*                  argumentNounsArray: Corresponde con los valores de la       */
  /*                                      tercera parte de donde se formara el    */
  /*                                      dominio.                                */
  /*                                                                              */
  /* Descripción:     Esta función permite generar los dominios basado en la      */
  /*                  combinación de tres arreglos para dichos fines y cargarlos  */
  /*                  en un arreglo.                                              */
  /********************************************************************************/

  let domain = "";
  let urlArray = [];

  argumentPronounsArray.forEach((value1) => {
    argumentAdjectivesArray.forEach((value2) => {
      argumentNounsArray.forEach((value3) => {
        domain = value1 + value2 + value3;

        urlArray.push(domain + extensionGenerate(domain));
      });
    });
  });

  return urlArray;
};

function extensionGenerate(argumentDomain) {
  /********************************************************************************/
  /* Fecha Creación:  13 Febrero 2021.                                            */
  /* Autor:           Iván Fonseca Castro                                         */
  /* Nombre Objeto:   extensionGenerate()                                         */
  /* Argumentos:                                                                  */
  /*                  argumentDomain: Dominio para el que se desea generar su     */
  /*                  extensión.                                                  */
  /*                                                                              */
  /* Descripción:     Esta función permite obtener la información de la extensión */
  /*                  que se asociara al dominio.                                 */
  /********************************************************************************/

  // Se obtiene la información de la extensión
  if (randomExtension) {
    domainExtension =
      domainArray[Math.floor(Math.random() * domainArray.length)];
  }

  if (domainHackExtension) {
    domainExtension =
      "." +
      argumentDomain.substring(
        argumentDomain.length - totalDomainHackExtension
      );
  }

  return domainExtension;
}

function createDomainRow(urlArray) {
  /********************************************************************************/
  /* Fecha Creación:  13 Febrero 2021.                                            */
  /* Autor:           Iván Fonseca Castro                                         */
  /* Nombre Objeto:   createDomainRow()                                            */
  /* Argumentos:      No Aplica                                                   */
  /*                                                                              */
  /* Descripción:     Esta función permite crear todas las filas de la tabla      */
  /*                  donde se mostrará la información.                           */
  /********************************************************************************/

  let idColumnRow1 = "";
  let idColumnRow2 = "";

  if (!isRowGenerate) {
    for (i = 0; i < urlArray.length; i++) {
      idColumnRow1 = "idColumn1Row" + (i + 1);
      idColumnRow2 = "idColumn2Row" + (i + 1);

      document.getElementById("tableDomains").insertRow(-1).innerHTML =
        '<td onclick="infoDomain(event)" width="50%" id="' +
        idColumnRow1 +
        '"></td>' +
        '<td onclick="infoDomain(event)" width="50%" id="' +
        idColumnRow2 +
        '"></td>';
    }

    isRowGenerate = true;
  }
}

function addDomainRow(urlArray) {
  /********************************************************************************/
  /* Fecha Creación:  13 Febrero 2021.                                            */
  /* Autor:           Iván Fonseca Castro                                         */
  /* Nombre Objeto:   addDomainRow()                                              */
  /* Argumentos:      No Aplica                                                   */
  /*                                                                              */
  /* Descripción:     Esta función permite mostrar todos los datos de los         */
  /*                  dominios en las filas de la tabla.                          */
  /********************************************************************************/

  let idColumn1Row = "";
  let idColumn2Row = "";
  let domainPrice = "";
  let extensionItem = "";

  for (i = 0; i < urlArray.length; i++) {
    // Extensión asociada al dominio del arreglo
    extensionItem = urlArray[i].substring(urlArray[i].indexOf("."));

    // Se obtiene el valor del precio del dominio
    if (domainHackExtension) {
      domainPrice = SPECIALPRICE;
    } else {
      if (domainPriceObject.hasOwnProperty(extensionItem)) {
        domainPrice = domainPriceObject[extensionItem];
      }
    }

    idColumn1Row = "idColumn1Row" + (i + 1);
    idColumn2Row = "idColumn2Row" + (i + 1);

    document.getElementById(idColumn1Row).innerHTML = urlArray[i];
    document.getElementById(idColumn2Row).innerHTML =
      "Disponible por " + domainPrice;
  }
}

/*****************************************************************************************************************************/

function domainGenerate() {
  /********************************************************************************/
  /* Fecha Creación:  11 Febrero 2021.                                            */
  /* Autor:           Iván Fonseca Castro                                         */
  /* Nombre Objeto:   domainGenerate()                                            */
  /* Argumentos:      No utiliza                                                  */
  /*                                                                              */
  /* Descripción:     Esta función permite setear los datos de los doiminos en la */
  /*                  del HTML.                                                   */
  /********************************************************************************/

  // Se invoca la función que permite generar los dominios
  UrlDomainArray = createUrls(pronounsArray, adjectivesArray, nounsArray);

  // Se invoca función que crea las filas de la tabla
  createDomainRow(UrlDomainArray);

  addDomainRow(UrlDomainArray);

  let inputDomain = document.getElementById("IDinputDomain");

  inputDomain.value = "";
}

function infoDomain(event) {
  /********************************************************************************/
  /* Fecha Creación:  13 Febrero 2021.                                            */
  /* Autor:           Iván Fonseca Castro                                         */
  /* Nombre Objeto:   infoDomain()                                                */
  /* Argumentos:                                                                  */
  /*                  event: Objecto que corresponde a la fila sobre la que se da */
  /*                         clic en la tabla.                                    */
  /*                                                                              */
  /* Descripción:     Esta función permite obtener la información del dominio     */
  /*                  cada vez que se da clic sobre una fila.                     */
  /********************************************************************************/

  let column = event.toElement.id;
  let infoDomain = document.getElementById(column);
  let inputDomain = document.getElementById("IDinputDomain");
  let posIdColumn2 = 0;

  posIdColumn2 = column.indexOf("idColumn2");

  if (posIdColumn2 === 0) {
    column = column.replace("idColumn2", "idColumn1");

    infoDomain = document.getElementById(column);
  }

  inputDomain.value = infoDomain.innerHTML;
}

function getExtension(value) {
  /********************************************************************************/
  /* Fecha Creación:  11 Febrero 2021.                                            */
  /* Autor:           Iván Fonseca Castro                                         */
  /* Nombre Objeto:   getExtension()                                              */
  /* Argumentos:      No utiliza                                                  */
  /*                                                                              */
  /* Descripción:     Esta función permite validar la extensión que se asociara   */
  /*                  al dominio al momento que se deba generar.                  */
  /********************************************************************************/

  switch (value.toUpperCase()) {
    case "ALEATORIA":
      randomExtension = true;
      domainHackExtension = false;
      domainExtension = "";

      break;
    case "DOMAIN HACK":
      randomExtension = false;
      domainHackExtension = true;
      domainExtension = "";

      break;
    default:
      domainExtension = value;
      randomExtension = false;
      domainHackExtension = false;

      break;
  }

  let elemento = document.getElementById("basic-addon2");

  // Se modifica el DOM para mandar el texto de la extensión
  elemento.innerHTML = value;
}

function pageLoad() {
  /********************************************************************************/
  /* Fecha Creación:  11 Febrero 2021.                                            */
  /* Autor:           Iván Fonseca Castro                                         */
  /* Nombre Objeto:   pageLoad()                                                  */
  /* Argumentos:      No utiliza                                                  */
  /*                                                                              */
  /* Descripción:     Esta función permite recargar la página.                    */
  /********************************************************************************/

  location.reload();
}
