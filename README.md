# Dmoney API Automaton using Axios
Tested an API using Mocha and axios framework by user interaction and created mochawesome report

### Prerequisites :
- Install Nodejs latest version
- Install VS code latest version

### Project Scenario :
1. Call login API
2. Create  a new customer and an agent
3. Search by the customer phone number
4. Deposit 5000 tk to the Agent from system
5. Deposit 2000 tk by agent to customer 
6. Check balance of customer
7. Check statement by trnxId 
8. Withdraw 1000 tk by customer and assert expected balance
9. Send 500 tk to another customer and assert expected balance
10. Check customer statement

### How to run this project
- Clone the repo
- Open termianl in the root folder
- Give following commands:
```ruby
npm init -y
```

```ruby
npx mocha --timeout=30000 test\user.test.js
```

```ruby
npx mocha --timeout=30000 test\trx.test.js
```

**To create mochawesome report**, give following commands:
```ruby
npm i mochawesome
```
```ruby
npm test file ./test/*.test.js
```
### Test Cases :
https://docs.google.com/spreadsheets/d/1IPLXcD-1KWsA7kg4IsEP5YtJCJLZsrELXkIZLLNKAYk/edit?usp=sharing

### Screenshot
This is the screenshot of **mochawesome.html** report:
![Screenshot 2023-04-03 170404](https://user-images.githubusercontent.com/58912515/229494022-b24faaa8-ba50-43eb-ba10-901781d6b066.png)

