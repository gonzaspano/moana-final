var suscriber = []
var dataList = [];

function suscripsion(input){
    if(Array.isArray(input)){
    saveInfoInStore("suscriptor", input);
    console.log(dataList)
    event.preventDefault
    }
}


function saveInfoInStore(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}


function addSuscriber(name, surname, email) {
    this.name = name,
    this.surname = surname,
    this.email = email,
    this.addToSuscriberList = function(){dataList.push(this)}
}

function getSuscriberInfoAndStore(name, surname, email) {
    suscriber = new addSuscriber(name, surname, email)
    suscriber.addToSuscriberList()
    suscripsion(dataList)
}

$(document).ready(function() {

    var getName = $("#getName")
    var getSurname = $("#getSurname")
    var getEmail = $("#getEmail")

    var suscriptionForm = $("#suscriptionForm");
    var textoSuscripted = $("#textoSuscripted")
    textoSuscripted.hide()

    $("form[name='form1']").validate({
        rules: {
            nombre: { 
                required: true,
            },
            apellido: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
            checkbox: {
                required: true,
            }
        },
        messages: {
            apellido: {
                required: 'El campo apellido es obligatorio',
            },
            nombre: {
                required: 'El campo nombre es obligatorio',
            }  
        },
        submitHandler: function(form) {
            getName = getName.val()
            getSurname = getSurname.val()
            getEmail = getEmail.val()

            suscriptionForm.slideUp(function() {
                textoSuscripted.slideDown(function() {
                    textoSuscripted.html(`
                    <h1>Gracias ${getName} por suscribirte</h1>
                    <p>A partir de mañana tendrás toda nuestra información en tu correo electrónico</p>`)
                })
            })
            getSuscriberInfoAndStore(getName, getSurname, getEmail)
        }
    })
})
