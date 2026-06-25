//inicializaciones
const db = require('./db');

//funciones
async function readGuest(req, res) {
    let guests = [];

    guests = await db.query('SELECT * FROM "Guest"');
    res.json(guests);
}

async function createGuest(req, res) {

    const Name = req.body.Name
    const LastName = req.body.LastName

    guests = await db.query(`INSERT INTO Guest 
    (Name, LastName)
    VALUES ( @Name, @LastName)`,
        { Name, LastName });
    res.status(201);

}

async function updateGuest(req, res) {

    const Name = req.body.Name
    const LastName = req.body.LastName
    const GuestID = req.body.GuestID


    guest = await db.query(`
    UPDATE Guest
    SET
        Name = @Name,
        LastName = @LastName
    WHERE GuestID = @GuestID`,
        { Name, LastName, GuestID });
    res.json({
        "respuesta": "Su preticion fue actualizada exitosamente"
    });
}

async function deleteGuest(req, res) {  


    const GuestID = req.body.GuestID
    if (GuestID == null) {
        res.status(400).json({
            "respuesta": "Debes poner un GuestID"
        })
    }


    guest = await db.query(`DELETE Guest WHERE GuestID = @GuestID`,
        { GuestID })

    res.json({
        "respuesta": "Su eliminacion fue hecha con exito"
    });


}

module.exports = {
    readGuest,
    createGuest,
    updateGuest,
    deleteGuest
};
