//inicializaciones
const { client } = require("./db2");

//funciones
async function readGuest(req, res) {
    const guests = await client.query('SELECT * FROM "Guest"');
    res.json(guests.rows);
}

async function createGuest(req, res) {

    const Name = req.body.Name
    const LastName = req.body.LastName

    await client.query(`INSERT INTO "Guest" 
    ("Name", "LastName")
    VALUES ( $1, $2)`,
        [ Name, LastName ]);
    res.status(201).json();

}

async function updateGuest(req, res) {

    const Name = req.body.Name
    const LastName = req.body.LastName
    const GuestID = req.body.GuestID


    await client.query(`
    UPDATE "Guest"
    SET
        "Name" = $1,
        "LastName" = $2
    WHERE "GuestID" = $3`,
        [Name, LastName, GuestID] );
    res.json({
        "respuesta": "Su preticion fue actualizada exitosamente"
    });
}

async function deleteGuest(req, res) {

    const GuestID = req.body.GuestID
    if (GuestID === null) {
        res.status(400).json({
            "respuesta": "Debes poner un GuestID"
        })
    }

    await client.query(`DELETE FROM "Guest" WHERE "GuestID" = $1`,
         [GuestID] )

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
