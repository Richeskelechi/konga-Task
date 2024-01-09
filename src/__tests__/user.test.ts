import supertest from 'supertest'
import app from '../server'
import sequelize from '../config/database';

describe("Testing The User Service", () => {
    let userToken:string; // Variable to store user token
    let userId:string; // Variable to store user id
    let invalidId:string = "3b5e4824-5eeb-41f4-933e-7a87590C8a45"; // Variable to store invalid user id
    let adminToken:string; // Variable to store admin token
    describe("When Valid User details were given", () => {
        //should respond with a json object containing the user details
        test("should respond with a json object containing the user details when creating a valid user", async () => {
            const response = await supertest(app).post("/users/").send({
                firstName: "Jane1",
                lastName: "Stellas1",
                password: "stel1234",
                role: "user",
                email: "stellas1.jane@example.com"
            })
            userToken = response.body.data.token;
            userId = response.body.data.user.id;
            expect(response.body).toEqual(expect.any(Object));
        })
        // should respond with a stauscode of 201
        test("should respond with a stauscode of 201 when creating valid data", async () => {
            const response = await supertest(app).post("/users/").send({
                firstName: "Admin",
                lastName: "Super",
                password: "stel1234",
                role: "admin",
                email: "admin.jane@example.com"
            })
            adminToken = response.body.data.token;
            expect(response.statusCode).toBe(201)
        })
        // should respond with a token after creating the user
        test("should respond with a token when creating a valid data", async () => {
            const response = await supertest(app).post("/users/").send({
                firstName: "Jane3",
                lastName: "Stellas3",
                password: "stel1234",
                role: "user",
                email: "stellas3.jane@example.com"
            })
            expect(response.body.data).toHaveProperty("token");
        })
        //should respond with a json object containing a msg key of failure
        test("should respond with a json object containing Failure Message when the same Email was provided", async () => {
            const response = await supertest(app).post("/users/").send({
                firstName: "Jane1",
                lastName: "Stellas1",
                password: "stel1234",
                role: "user",
                email: "stellas1.jane@example.com"
            })
            expect(response.body.msg).toEqual("Failure");
        })
        //should respond with a json object containing a msg key of sucess when Admin tries to access the getAll route
        test("should respond with a json object containing a msg key of sucess when Admin tries to access the getAll route", async () => {
            const response = await supertest(app)
                .get("/users/")
                .set('Authorization', `Bearer ${adminToken}`) // Include the adminToken in the Authorization header
            expect(response.body.msg).toEqual("Success");
        });
        //should respond with a json object containing a msg key of failure when User tries to access the getAll route
        test("should respond with a json object containing a msg key of failure when User tries to access the getAll route", async () => {
            const response = await supertest(app)
                .get("/users/")
                .set('Authorization', `Bearer ${userToken}`) // Include the adminToken in the Authorization header
            expect(response.body.msg).toEqual("Failure");
        });
        //should respond with a json object containing a msg key of sucess when valid userId is provided
        test("should respond with a json object containing a msg key of sucess when valid userId is provided", async () => {
            const response = await supertest(app)
                .get("/users/" + userId)
            expect(response.body.msg).toEqual("Success");
            expect(response.statusCode).toBe(200)
        });
        //should respond with a json object containing a msg key of Failure when InValid userId is provided
        test("should respond with a json object containing a msg key of failure when InValid userId is provided", async () => {
            const response = await supertest(app)
                .get("/users/" + invalidId)
            expect(response.body.msg).toEqual("Failure");
            expect(response.statusCode).toBe(404)
        });
        //should respond with a stauscode of 200 when a user is successfully updated
        test("should respond with a stauscode of 200 when a user is successfully updated", async () => {
            const response = await supertest(app)
                .put("/users/" + userId).send({
                    firstName: "Janny",
                    lastName: "Stella",
                })
                .set('Authorization', `Bearer ${userToken}`) // Include the adminToken in the Authorization header
            expect(response.body.msg).toEqual("Success");
        }); 
        //should respond with a json object containing a msg key of failure when User tries to delete a user
        test("should respond with a json object containing a msg key of failure when User tries to delete a user", async () => {
            const response = await supertest(app)
                .delete("/users/" + userId)
                .set('Authorization', `Bearer ${userToken}`) // Include the adminToken in the Authorization header
            expect(response.body.msg).toEqual("Failure");
        }); 
        //should respond with a json object containing a msg key of sucess when Admin tries to delete a user
        test("should respond with a json object containing a msg key of sucess when Admin tries to delete a user", async () => {
            const response = await supertest(app)
                .delete("/users/" + userId)
                .set('Authorization', `Bearer ${adminToken}`) // Include the adminToken in the Authorization header
            expect(response.body.msg).toEqual("Success");
        });    
    })
    describe("When invalid User details were given", () => {
        // should respond with a stauscode of 400
        test("should respond with a statusCode of 400 when email isnt provided", async () => {
            const response = await supertest(app).post("/users/").send({
                firstName: "Jane1",
                lastName: "Stellas1",
                password: "stel1234",
                role: "user",
                email: ""
            })
            expect(response.statusCode).toBe(400)
        })
        // should respond with a stauscode of 400
        test("should respond with a statusCode of 400 when FirstName isnt provided", async () => {
            const response = await supertest(app).post("/users/").send({
                firstName: "",
                lastName: "Stellas1",
                password: "stel1234",
                role: "user",
                email: "ste@gmail.com"
            })
            expect(response.statusCode).toBe(400)
        })
    })
    // Clear the database or perform any necessary teardown after all tests are completed
    afterAll(async () => {
        await sequelize.sync({ force: true });
    }); 
})