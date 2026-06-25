//inicializaciones
const db = require('./db');

//funciones
async function readTask(req, res) {
    let task = [];
    try {
        task = await db.query('SELECT * FROM Task');
    } catch (error) {
        return ejecutarEnError(error, res);
    }
    res.json(
        task
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
        sqlResponse = await db.query(`INSERT INTO Task 
            (TaskName, description, GuestID) 
            VALUES (@taskName, @description, @guestID)
            SELECT SCOPE_IDENTITY() AS TaskID`,
            { taskName, description, guestID });
    } catch (error) {
        return ejecutarEnError(error, res);
    }

    res.status(200).json({
        taskID: sqlResponse[0].TaskID
    });
}

async function updateTask(req, res) {

    const taskName = req.body.taskName
    const description = req.body.description
    const taskID = req.body.taskID

    task = await db.query(`
        UPDATE Task 
        SET
	        TaskName = @taskName,
	        Description = @description
        WHERE TaskID = @taskID `,
        { taskName, description, taskID });

    let headerput = req.headers.puta;
    console.log("mi hear: " + headerput);

    res.json({
        "respuesta": "Su preticion fue actualizada exitosamente"
    });
}

async function deleteTask(req, res) {
    const taskID = req.body.taskID

    task = await db.query(
        'DELETE Task WHERE TaskID = @TaskID', { taskID });

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
