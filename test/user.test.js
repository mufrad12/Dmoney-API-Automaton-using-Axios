const { expect } = require('chai');
const axios = require('axios');
const jsonData = require('../env.json');
const fs = require('fs')
const { faker } = require('@faker-js/faker')
var rand = require('../generateRandom')
const userData= require('../users.json')

describe("User Login, Create customer, agent and search customer Id", () => {
    it("Calling Login API", async () => 
    {
        var response = await axios.post(`${jsonData.baseUrl}/user/login`,
            {
                "email": "salman@roadtocareer.net",
                "password": "1234"
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            })
        console.log(response.data)
        expect(response.data.message).contains("Login successfully")
        let token_value = response.data.token;
        jsonData.token = token_value;
        fs.writeFileSync('env.json', JSON.stringify(jsonData))

    })

    ///////////////////////// Create New Customer /////////////////////////


    var customer_name = faker.name.fullName();
    var customer_email = faker.internet.email().toLowerCase();
    var customer_phone_number = "017777" + rand(10000, 99999);
    it("Create New User", async () => 
    {
        var response = await axios.post(`${jsonData.baseUrl}/user/create`, {
            "name": customer_name,
            "email": customer_email,
            "password": "1234",
            "phone_number": customer_phone_number,
            "nid": "123456789",
            "role": "Customer"
        }, 
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": jsonData.token,
                "X-AUTH-SECRET-KEY": jsonData.secretKey
            }

        }).then((res) => res.data.user)
        console.log(response)

        var id=response.id;
        var name = response.name;
        var email = response.email;
        var phone_number = response.phone_number;
        var role = response.role;

        var newUser={
            customer_id:id,
            customer_name:name,
            customer_email:email,
            customer_phone_number:phone_number,
            role:role
        }

        userData.push(newUser);

        fs.writeFileSync('users.json',JSON.stringify(userData))
        console.log("Saved!")
    })


    ///////////////////////// Create Another Customer /////////////////////////


    var secondCustomer_name = faker.name.fullName();
    var secondCustomer_email = faker.internet.email().toLowerCase();
    var secondCustomer_phone_number = "017666" + rand(10000, 99999);

    it("Create Another Customer", async () => {

        var response = await axios.post(`${jsonData.baseUrl}/user/create`, {
            "name": secondCustomer_name,
            "email": secondCustomer_email,
            "password": "1233",
            "phone_number": secondCustomer_phone_number,
            "nid": "123456788",
            "role": "Customer"
        }, 
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": jsonData.token,
                "X-AUTH-SECRET-KEY": jsonData.secretKey
            }
        }).then((res) => res.data.user)
        console.log(response)

        var id=response.id;
        var name = response.name;
        var email = response.email;
        var phone_number = response.phone_number;
        var role = response.role;

        var newUser={
            customer_id:id,
            another_customer_name:name,
            another_customer_email:email,
            another_customer_phone_number:phone_number,
            role:role
        }

        userData.push(newUser);

        fs.writeFileSync('users.json',JSON.stringify(userData))
        console.log("Saved!")
    })


    ///////////////////////// Create New Agent /////////////////////////



    var agent_name = faker.name.fullName();
    var agent_email = faker.internet.email().toLowerCase();
    var agent_phone_number = "017777" + rand(10000, 99999);

    it("Create New Agent", async () => {
        var response = await axios.post(`${jsonData.baseUrl}/user/create`, {
            "name": agent_name,
            "email": agent_email,
            "password": "1233",
            "phone_number": agent_phone_number,
            "nid": "123456788",
            "role": "Agent"
        }, 
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": jsonData.token,
                "X-AUTH-SECRET-KEY": jsonData.secretKey
            }
        
        }).then((res) => res.data.user)
        console.log(response)

        
        var name = response.name;
        var email = response.email;
        var phone_number = response.phone_number;
        var role = response.role;

        var newUser={
            agent_name:name,
            agent_email:email,
            agent_phone_number:phone_number,
            role:role
        }

        userData.push(newUser);

        fs.writeFileSync('users.json',JSON.stringify(userData))
        console.log("Saved!")
    })


    ///////////////////////// Search Customer By Id /////////////////////////


    it("Search Customer By Phone Number", async () => {
        var PhoneNumber = userData[userData.length-3].customer_phone_number;
        var response = await axios.get(`${jsonData.baseUrl}/user/search/Phonenumber/${PhoneNumber}`,

            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jsonData.token,
                    "X-AUTH-SECRET-KEY": jsonData.secretKey
                }

            }).then((res) => res.data)

        console.log(response.message);
    })
})


