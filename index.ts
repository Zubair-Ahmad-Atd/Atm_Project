
import inquirer from 'inquirer';
import { faker } from '@faker-js/faker';

// person data
// atm machine 
// atm functionalities  
type User = {
    id: number,
    pin: number,
    name: string,
    accountNumber: number,
    balance: number
}

let Users = () => {
    let users: User[] = [];

    for (let i = 0; i < 5; i++) {
        let user: User = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: faker.number.int(),
            balance: 1000000 + Math.floor(Math.random())
        }
        users.push(user)

    }
    return users;
}

// Atm machine
const atmMachine = async (users: User[]) => {
    let res = await inquirer.prompt({
        type: "number",
        name: "pin",
        message: "Enter your pin"
    })
    let user = users.find(val => val.pin === res.pin)
    if (user) {
        console.log(`Welcome:${user.name}`);
        atmFunc(user)
    } else
        console.log("invalid Pin")

}

// atm function 

const atmFunc = async (user: User) => {
    let options = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Select the option",
        choices: ["Withdraw", "Fastcash", "Balance", "Exit"]
    })
    if (options.select === "Withdraw") {
        let amount = await inquirer.prompt({
            type: "number",
            name: "amountEnter",
            message: "Enter the amount"
        })
        if (amount.amountEnter > user.balance) {
            console.log("insufficient balance");

        }
        else {
            console.log("Transaction Successful");
            console.log(`Your remaing balance is:${user.balance - amount.amountEnter}`);
         }
    }
    if (options.select === "Fastcash") {
        let amount = await inquirer.prompt({
            type: "list",
            name: "amountEnter",
            message: "Select amount",
            choices: ['500', '1000', '2000', '5000']

        })

        if (amount.amountEnter > user.balance) {
             console.log("insufficient balance");
            }
        else { 
             console.log("Transaction Successful");
             console.log(`Your remaing balance is:${user.balance - amount.amountEnter}`);
            }
    }
    if (options.select === "Balance") {
        console.log(`Your current balance is: ${user.balance}`);
        
     }
    if (options.select === "Exit") { 
        return
    }
}




    let users = Users()
    atmMachine(users)




