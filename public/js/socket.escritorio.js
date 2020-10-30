var socket = io();
var small = $('small');

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio'))
{
    window.location = "index.html";
    throw new Error("Escritorio no asignado");
}

var escritorio = searchParams.get('escritorio');

$('h1').text(`Escritorio ${escritorio}`);


$('button').on('click',function(){
    
    socket.emit('atenderTicket',{escritorio:escritorio,},function(resp)
    {
        if(resp == "No hay tickets")
        {
            $('h4').text("No hay tickets");
        }
        console.log(resp);
        small.text(`${resp.numero}`)
    })
});