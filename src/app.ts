import express from "express";
import bodyParser from "body-parser";
import path from "path";
import expressValidator from "express-validator";
import bluebird from "bluebird";
import * as readline from "readline";
import * as User from "./models/user";
import * as DateUtil from "./util/date";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askYear = () => {
    rl.question("Write year to report (format as YYYY) ", (input: string) => {
        if (isNaN(Number(input))) {
            console.log("Error: Please try again, with a valid number.\n");
            askYear();
            return;
        }

        if (input.length !== 4) {
            console.log("Error: Year should be 4 digits. Example: 1950, 2019.\n");
            askYear();
            return;
        }

        const yearInput: Date = new Date(`${Number(input)} 12 31`);
        const users = User.getUsers(yearInput);

        users.forEach(u => {
            const date = new Date();
            console.log(`birth: ${DateUtil.dateFormat(u.birthDate)} | start: ${DateUtil.dateFormat(u.startDate)} | user age: ${u.age}`);
            console.log(`vacation days: ${u.getVacationsDaysWithPolicy(yearInput)}`);
            console.log("\n");
        });
        rl.close();
    });
};

askYear();