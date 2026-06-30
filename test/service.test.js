const { createTask } = require("../service");
const db = require("../db2");

jest.mock("../db2", () => ({
    client: {
        query: jest.fn()
    }
}));

describe("createTask", () => {
    test("should create a task", async () => {

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

        await createTask(req, res);

        expect(db.client.query).toHaveBeenCalledTimes(1);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            taskID: 10
        });
    });
});
