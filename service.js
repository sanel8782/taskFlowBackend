//inicializaciones
const db = require('./db2');

//funciones
async function readTask(req, res) {
    let task = [];
    const guestId = req.query.guestId;
    try {
        task = await db.query('select * from "Task" where "GuestID" = $1'
            , [guestId]
        );
    } catch (error) {
        return ejecutarEnError(error, res);
    }
    res.json(
        task.rows
    );
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
    if (guestID == null) {
        return res.status(400).json({
            error: 'Se tiene que completar el espacio de guestID'
        })
    }

    // if (isNaN(guestID)) {
    //     return res.status(400).json({
    //         error: 'Se tiene que poner numero el espacio de guestID'
    //     })
    // }

    try {
        sqlResponse = await db.query(`INSERT INTO "Task" 
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

    task = await db.query(`
        UPDATE "Task" 
        SET
	        "TaskName" = $1,
	        "Description" = $2
        WHERE "TaskID" = $3 `,
         [taskName, description, taskID] );

    res.json({
        "respuesta": "Su preticion fue actualizada exitosamente"
    });
}

async function deleteTask(req, res) {
    const taskID = req.body.taskID

    task = await db.query(
        'DELETE  FROM "Task" WHERE "TaskID" = $1', [taskID] );

    res.json({
        "respuesta": "Su eliminacion fue hecha con exito"
    });
}


module.exports = {
    readTask,
    createTask,
    updateTask,
    deleteTask
};
