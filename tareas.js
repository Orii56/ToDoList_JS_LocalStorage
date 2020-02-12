//Seleccionamos la lista
const list = document.getElementById("list");


//Nombres de clases / iconos
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_T = "lineThrough";

//Variables 
let LIST, id;


//Metodo get para pedir los datos al local storage
let datos = localStorage.getItem("Tareas");

//Si no hay datos almacenados, inicializa la lista;
if (datos) {
    LIST = JSON.parse(datos);
    id = LIST.length;
    cargarLista(LIST);

} else {
    //no hay datos aun
    LIST = [];
    id = 0;
}


//Carga la Lista con sus elementos, ejecutando la funcion addToDo 
function cargarLista(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.det, item.hecho, item.eliminar);
    });

}

// Agregar cada tarea
function addToDo(toDo, id, det, hecho, eliminar) {
    let HECHO = "";
    let LINEA = "";
    if (eliminar) {
        return;
    } else {

        if (hecho) {
            HECHO = CHECK;
        } else {
            HECHO = UNCHECK;
        }

        if (hecho) {
            LINEA = LINE_T;
        } else {
            LINEA = "";
        }

        //Este es el HTML que representa cada tarea
        const item = `
      
        <li><div class="tarea">
        <div class="tituloTarea">
            <i class="far ${HECHO}" job="completar" id="${id}"></i> 
            <p class="textoTarea ${LINEA}" job="display" id="${id}"> ${toDo} </p>
            <i class="fas fa-times-circle" job="eliminar" id="${id}"></i>
        </div>
        <div class="detalles ${id}">
            <p class="textoDetalles">${det}</p>
        </div>
    </div>
</li>
        `;

        //Imprimimos "antes de terminar", para poner de ultimo el elemento
        const position = "beforeend";
        list.insertAdjacentHTML(position, item);
    }
}

//Verifica que hayan datos en toDo y le pasa la informacion a AddtoDo
function checkToDo() {
    let toDo = texto1.value;
    let det = texto2.value;
    //det no es obligatorio rellenarlo
    if (toDo) {
        addToDo(toDo, id, det, false, false);
        LIST.push({
            name: toDo,
            id: id,
            det: det,
            hecho: false,
            eliminar: false
        });
        //Metodo SET para que ingresen los datos al Local Storage
        localStorage.setItem("Tareas", JSON.stringify(LIST));

        id++;
    }
    //Vaciamos los campos
    texto1.value = "";
    texto2.value = "";
}

///Funcion completar tarea
function completarTarea(element) {
    //Si existe en el Classlist CHECK, lo cambia a UNCHECK y viceversa
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".textoTarea").classList.toggle(LINE_T);

    if (LIST[element.id].hecho) {
        LIST[element.id].hecho = false;
    } else {
        LIST[element.id].hecho = true;
    }

}

//Elimina una tarea 
function eliminarTarea(element) {
    if (confirm("Desea eliminar esta tarea?")) {
        // iconoEliminar.tituloTarea.divTarea , y eliminamos "toda" la tarea
        let x = element.parentElement.parentElement;
        LIST[element.id].eliminar = true;
        x.remove();
    };
}


function displayDetalles(element) {
    //Nos trae los hijos de CajaTarea
    //iconoEliminar.tituloTarea.divTarea   

    let y = element.parentElement.parentElement.childNodes;

    //El elemento 1 es el texto en tituloTarea, el 3 es el textoDetalles
    title = y[1];
    content = y[3];

    //Si el contenido es mostrado, lo oculta, y quita el estilo al titulo
    if (content.style.display === "block") {
        content.style.display = "none";
        title.style.background = "";
    } else {
        //Si el contenido esta oculto, lo muestra y fija el color de fondo del titulo
        content.style.display = "block";
        title.style.background = "#ccc";

    }

}


//El buscador 
function search() {
    //Lo recibido por el input lo pasamos a Mayusculas
    let filtro = textoBusqueda.value.toUpperCase();

    //Recogemos un array de elementos con la etiqueta li
    let lis = document.getElementsByTagName('li');
    let t;

    //Recorremos dicho array
    for (t = 0; t < lis.length; t++) {
        let name = lis[t].getElementsByClassName('textoTarea')[0].innerHTML;
        let det = lis[t].getElementsByClassName('textoDetalles')[0].innerHTML;
        if (name.toUpperCase().indexOf(filtro) > -1 || det.toUpperCase().indexOf(filtro) > -1) {
            //si lo que entra del input no esta en titulo o detalles, lo oculta
            lis[t].style.display = "";
        } else {
            lis[t].style.display = "none";
        }
    }
}

//El evento ejecuta las funciones según el valor del "job" que tenga el elemento clickado 
list.addEventListener("click", function(event) {
    //Devuelve el elemento que fue clickado
    let element = event.target;

    //Esta completar / eliminar / display
    let elementJob = element.attributes.job.value;


    if (elementJob == "completar") {
        completarTarea(element);
    } else if (elementJob == "eliminar") {
        eliminarTarea(element);
    } else if (elementJob == "display") {
        displayDetalles(element);
    }
    //Metodo SET para que ingresen los datos al LS
    localStorage.setItem("Tareas", JSON.stringify(LIST));

});