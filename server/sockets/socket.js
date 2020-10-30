const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');
 
let ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('siguienteTicket',(data,callback)=>{
        siguiente = ticketControl.siguiente();

        callback(siguiente);
    });


    client.emit('estadoActual',{
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });


    client.on('atenderTicket',(data,callback)=>{
        if(!data.escritorio)
        {
            return callback({
                err: true,
                message: "El escritorio no fue asignado"
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        client.broadcast.emit('ultimos4',{
            ultimos4: ticketControl.getUltimos4()
        });
        callback(atenderTicket);

      

        //Actualizar / notificar / cambios en los ultimos 4
    });


    


});