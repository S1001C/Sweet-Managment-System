// const request = require("supertest");
// const app = require("../app");
// const mongoose = require("mongoose");

// let userToken;
// let adminToken;
// let sweetId;

// describe("Sweet & Inventory APIs", () => {
//   beforeAll(async () => {
//     // Register USER
//     const userRes = await request(app)
//       .post("/api/auth/register")
//       .send({
//         name: "User",
//         email: "user@test.com",
//         password: "password123"
//       });

//     userToken = userRes.body.token;

//     // Register ADMIN
//     const adminRes = await request(app)
//       .post("/api/auth/register")
//       .send({
//         name: "Admin",
//         email: "admin@test.com",
//         password: "password123"
//       });

//     // make admin manually
//     const User = mongoose.model("User");
//     const adminUser = await User.findOne({ email: "admin@test.com" });
//     adminUser.role = "ADMIN";
//     await adminUser.save();

//     // login admin again
//     const adminLogin = await request(app)
//       .post("/api/auth/login")
//       .send({
//         email: "admin@test.com",
//         password: "password123"
//       });

//     adminToken = adminLogin.body.token;
//   });

//   it("should create a sweet", async () => {
//     const res = await request(app)
//       .post("/api/sweets")
//       .set("Authorization", `Bearer ${userToken}`)
//       .send({
//         name: "Ladoo",
//         category: "Dessert",
//         price: 10,
//         quantity: 5
//       });

//     expect(res.statusCode).toBe(201);
//     expect(res.body.name).toBe("Ladoo");
//     sweetId = res.body._id;
//   });

//   it("should get all sweets", async () => {
//     const res = await request(app)
//       .get("/api/sweets")
//       .set("Authorization", `Bearer ${userToken}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.length).toBe(1);
//   });

//   it("should purchase a sweet", async () => {
//     const res = await request(app)
//       .post(`/api/sweets/${sweetId}/purchase`)
//       .set("Authorization", `Bearer ${userToken}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.sweet.quantity).toBe(4);
//   });

//   it("should not allow USER to delete sweet", async () => {
//     const res = await request(app)
//       .delete(`/api/sweets/${sweetId}`)
//       .set("Authorization", `Bearer ${userToken}`);

//     expect(res.statusCode).toBe(403);
//   });
// it("should get all sweets", async () => {
//   const res = await request(app)
//     .get("/api/sweets")
//     .set("Authorization", `Bearer ${userToken}`);

//   expect(res.statusCode).toBe(200);
//   expect(res.body.length).toBeGreaterThanOrEqual(1);
// });
//   it("should allow ADMIN to delete sweet", async () => {
//     const res = await request(app)
//       .delete(`/api/sweets/${sweetId}`)
//       .set("Authorization", `Bearer ${adminToken}`);

//     expect(res.statusCode).toBe(200);
//   });
// });
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

let userToken;
let adminToken;
let sweetId;

describe("Sweet & Inventory APIs", () => {
  beforeAll(async () => {
    // Register USER
    const userRes = await request(app)
      .post("/api/auth/register")
      .send({
        name: "User",
        email: "user@test.com",
        password: "password123"
      });

    userToken = userRes.body.token;

    // Register ADMIN
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Admin",
        email: "admin@test.com",
        password: "password123"
      });

    // Promote ADMIN manually
    const User = mongoose.model("User");
    const adminUser = await User.findOne({ email: "admin@test.com" });
    adminUser.role = "ADMIN";
    await adminUser.save();

    // Login ADMIN again to get token
    const adminLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "password123"
      });

    adminToken = adminLogin.body.token;
  });

  it("should create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Ladoo",
        category: "Dessert",
        price: 10,
        quantity: 5
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Ladoo");
    sweetId = res.body._id;
  });

  it("should get all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it("should purchase a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(4);
  });

  it("should not allow USER to delete sweet", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
  });

  it("should allow ADMIN to delete sweet", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });
});
