const { expect } = require('chai');
const axios = require('axios');
const jsonData = require('../env.json');
const fs = require('fs')
const userData= require('../users.json')


describe("User Transaction", () => {
    before(async () => {
        var response = await axios.post(`${jsonData.baseUrl}/user/login`,
            {
                "email"    : "salman@roadtocareer.net",
                "password" : "1234"
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            })
        console.log(response.data)
        let token_value = response.data.token;
        jsonData.token = token_value;
        fs.writeFileSync('env.json', JSON.stringify(jsonData))

    })


    ///////////////////////// Deposite To Agent /////////////////////////

    it("Deposite to Agent from System", async () => {
        var agentNumber = userData[userData.length-1].agent_phone_number;
        var response = await axios.post(`${jsonData.baseUrl}/transaction/deposit`,

            {
                "from_account": "SYSTEM",
                "to_account": agentNumber,
                "amount": 5000
            },
            {
                headers: {
                    "Content-Type"      : "application/json",
                    "Authorization"     : jsonData.token,
                    "X-AUTH-SECRET-KEY" : jsonData.secretKey
                }

            }).then((res) => res.data)

        console.log(response);
        console.log(response.message);

        expect(response.message).contains("Deposit successful");
    })



    ///////////////////////// Deposite To Customer /////////////////////////


    it("Deposite to Customer from Agent", async () => {
        var agentNumber = userData[userData.length-1].agent_phone_number;
        var customerNumber = userData[userData.length-3].customer_phone_number;

        var response = await axios.post(`${jsonData.baseUrl}/transaction/deposit`,
            {
                "from_account": agentNumber,
                "to_account": customerNumber,
                "amount": 2000
            },
            {
                headers: {
                    "Content-Type"      : "application/json",
                    "Authorization"     : jsonData.token,
                    "X-AUTH-SECRET-KEY" : jsonData.secretKey
            }
            }).then((res) => res.data)

        console.log(response);

        expect(response.message).contains("Deposit successful")

        var trnxId = response.trnxId;
        var customer_trnxId =
        {
              customer_transaction_id:trnxId
        }
          
         userData.push(customer_trnxId);
         fs.writeFileSync('users.json',JSON.stringify(userData))
         console.log("Saved!")
          
    })

    ///////////////////////// Check Balance /////////////////////////

    it("Check Balance of a Customer", async () => {
        var customerNumber = userData[userData.length-4].customer_phone_number;
        var response = await axios.get (`${jsonData.baseUrl}/transaction/balance/${customerNumber}`,
            {
                headers: {
                    "Content-Type"     : "application/json",
                    "Authorization"    : jsonData.token,
                    "X-AUTH-SECRET-KEY": jsonData.secretKey
                }
            }).then((res) => res.data)

        console.log(response.message);

        expect(response.message).contains("User balance")
    })


    ///////////////////////// Check Statement by Transaction ID /////////////////////////

    it("Check Statement by Transaction ID", async () => {
        var trxId = userData[userData.length-1].customer_transaction_id;
        var response = await axios.get(`${jsonData.baseUrl}/transaction/search/${trxId}`,
 
             {
                 headers: {
                     "Content-Type"      : "application/json",
                     "Authorization"     : jsonData.token,
                     "X-AUTH-SECRET-KEY" : jsonData.secretKey
                 }
 
             }).then((res) => res.data)
 
         console.log(response.message);

         expect(response.message).contains("Transaction list")
     })


    ///////////////////////// Withdraw by Customer /////////////////////////

    it("Withdraw by Customer", async () => {
        var customerNumber = userData[userData.length-4].customer_phone_number;
        var agentNumber = userData[userData.length-2].agent_phone_number;
        var response = await axios.post(`${jsonData.baseUrl}/transaction/withdraw`,
            {
                "from_account" : customerNumber,
                "to_account"   : agentNumber,
                "amount"       : 1000
            },
            {
                headers: {
                    "Content-Type"      : "application/json",
                    "Authorization"     : jsonData.token,
                    "X-AUTH-SECRET-KEY" : jsonData.secretKey
                }

            }).then((res) => res.data)

        console.log(response);

        expect(response.message).contains("Withdraw successful")
    })


    ///////////////////////// Send Money To Another Customer /////////////////////////


    it("Send Money to Another Customer", async () => {
        var customerNumber = userData[userData.length-4].customer_phone_number;
        var another_customerNumber = userData[userData.length-3].another_customer_phone_number;
        
        var response = await axios.post(`${jsonData.baseUrl}/transaction/sendmoney`,
            {
                "from_account" : customerNumber,
                "to_account"   : another_customerNumber,
                "amount"       : 500
            },
            {
                headers: {
                    "Content-Type"      : "application/json",
                    "Authorization"     : jsonData.token,
                    "X-AUTH-SECRET-KEY" : jsonData.secretKey
                }

            }).then((res) => res.data)

        console.log(response.message);

        expect(response.message).contains("Send money successful")

    })


    ///////////////////////// Check Customer Statement by Number /////////////////////////

    it("Check Customer Statement", async () => {
        var customerNumber = userData[userData.length-4].customer_phone_number;
        var response = await axios.get(`${jsonData.baseUrl}/transaction/statement/${customerNumber}`,
            {
                headers: {
                    "Content-Type"      : "application/json",
                    "Authorization"     : jsonData.token,
                    "X-AUTH-SECRET-KEY" : jsonData.secretKey
                }
            }).then((res) => res.data)

        console.log(response.message);
    })
})