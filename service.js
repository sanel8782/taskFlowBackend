//inicializaciones
const { client } = require("./db2");
let sqlResponse;

//funciones
async function readTask(req, res) {
    const guestId = req.query.guestId;
    let task;
    try {
        task = await client.query('select * from "Task" where "GuestID" = $1'
            , [guestId]
        );
    } catch (error) {
        return ejecutarEnError(error, res);
    }
    res.status(200).json(
        task.rows
    )
}

function ejecutarEnError(error, res) {
    console.error('DB failed in readTask:', error);
    return res.status(500).json({
        error: 'No se pudo conectar a la base de datos',
        details: error.message
    });
}

async function createTask(req, res) {

    const taskName = req.body.taskName
    const description = req.body.description
    const guestID = req.body.guestID

    //validaciones
    if (guestID === null) {
        return res.status(400).json({
            error: 'Se tiene que completar el espacio de guestID'
        })
    }

    try {
        sqlResponse = await client.query(`INSERT INTO "Task" 
            ("TaskName", "Description", "GuestID") 
            VALUES ($1, $2, $3)
            RETURNING "TaskID"`,
             [taskName, description, guestID] );
    } catch (error) {
        return ejecutarEnError(error, res);
    }

    res.status(200).json({
        taskID: sqlResponse.rows[0].TaskID
    });
}

async function updateTask(req, res) {

    const taskName = req.body.taskName
    const description = req.body.description
    const taskID = req.body.taskID

    await client.query(`
        UPDATE "Task" 
        SET
	        "TaskName" = $1,
	        "Description" = $2
        WHERE "TaskID" = $3 `,
         [taskName, description, taskID] );

    res.status(200).json({
        "respuesta": "Su preticion fue actualizada exitosamente"
    });
}

async function deleteTask(req, res) {
    const taskID = req.body.taskID

    await client.query(
        'DELETE  FROM "Task" WHERE "TaskID" = $1', [taskID] );

    res.status(200).json({
        "respuesta": "Su eliminacion fue hecha con exito"
    });
}


module.exports = {
    readTask,
    createTask,
    updateTask,
    deleteTask
};
