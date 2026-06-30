const { createTask, readTask, updateTask, deleteTask } = require("../service");
const db = require("../db2");

jest.mock("../db2", () => ({
    client: {
        query: jest.fn()
    }
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe("createTask", () => {
    test("should create a task", async () => {
        //arrange
        db.client.query.mockResolvedValue({
            rows: [{ TaskID: 10 }]
        });

        const req = {
            body: {
                taskName: "Comprar leche",
                description: "Ir al supermercado",
                guestID: 5
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        //act
        await createTask(req, res);
        //assert (validacione)
        expect(db.client.query).toHaveBeenCalledTimes(1);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            taskID: 10
        });
    });

    test("should fail in guestID create a task", async () => {
        //arrange
        db.client.query.mockResolvedValue({
            rows: [{ TaskID: 10 }]
        });

        const req = {
            body: {
                taskName: "Comprar leche",
                description: "Ir al supermercado",
                guestID: null
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        //act
        await createTask(req, res);
        //assert (validacione)
        expect(db.client.query).toHaveBeenCalledTimes(0);

        expect(res.status).toHaveBeenCalledWith(400);

        expect(res.json).toHaveBeenCalledWith({
            error: 'Se tiene que completar el espacio de guestID'
        });
    });

    test("should fail in db create a task", async () => {
        //arrange
        db.client.query.mockRejectedValue(new Error("Database connection failed"));

        const req = {
            body: {
                taskName: "Comprar leche",
                description: "Ir al supermercado",
                guestID: 5
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        //act
        await createTask(req, res);
        //assert (validacione)
        expect(db.client.query).toHaveBeenCalledTimes(1);

        expect(res.status).toHaveBeenCalledWith(500);

        expect(res.json).toHaveBeenCalledWith({
            error: 'No se pudo conectar a la base de datos',
            details: "Database connection failed"
        });
    });
});

describe("readTask", () => {
    test("should read tasks", async () => {
        //arrange
        db.client.query.mockResolvedValue({
            rows: [
                {
                    "TaskID": "28",
                    "created_at": "2026-06-28T22:57:36.139Z",
                    "TaskName": "tiende la ropa",
                    "Description": "holadsfaf",
                    "CreateDate": "2026-06-28T00:00:00.000Z",
                    "GuestID": "19"
                },
                {
                    "TaskID": "29",
                    "created_at": "2026-06-28T23:06:17.942Z",
                    "TaskName": "bi",
                    "Description": "don ",
                    "CreateDate": "2026-06-28T00:00:00.000Z",
                    "GuestID": "19"
                }
            ]
        });

        const req = {
            query: {
                guestID: 19
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        //act
        await readTask(req, res);
        //assert
        expect(db.client.query).toHaveBeenCalledTimes(1);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith([
            {
                "TaskID": "28",
                "created_at": "2026-06-28T22:57:36.139Z",
                "TaskName": "tiende la ropa",
                "Description": "holadsfaf",
                "CreateDate": "2026-06-28T00:00:00.000Z",
                "GuestID": "19"
            },
            {
                "TaskID": "29",
                "created_at": "2026-06-28T23:06:17.942Z",
                "TaskName": "bi",
                "Description": "don ",
                "CreateDate": "2026-06-28T00:00:00.000Z",
                "GuestID": "19"
            }
        ]);
    });
})

describe("updateTask", () => {
    test("should update a task", async () => {
        //arrange
        db.client.query.mockResolvedValue();

        const req = {
            body: {
                taskName: "Comprar leche",
                description: "Ir al supermercado",
                taskID: 5
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        //act
        await updateTask(req, res);
        //assert (validacione)
        expect(db.client.query).toHaveBeenCalledTimes(1);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            "respuesta": "Su preticion fue actualizada exitosamente"
        })
    });
});

describe("deleteTask", () => {
    test("should delete a task", async () => {
        //arrange
        db.client.query.mockResolvedValue();

        const req = {
            body: {
                taskID: 5
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        //act
        await deleteTask(req, res);
        //assert (validacione)
        expect(db.client.query).toHaveBeenCalledTimes(1);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            "respuesta": "Su eliminacion fue hecha con exito"
        })
    });
});
