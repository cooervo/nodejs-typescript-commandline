import express from "express";
import bodyParser from "body-parser";
import path from "path";
import expressValidator from "express-validator";
import bluebird from "bluebird";
import * as readline from "readline";
import * as User from "./models/User";
import * as Format from "./util/Format";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askYear = () => {
    rl.question("Which year vacation days to report? ", (input: string) => {
        if (isNaN(Number(input))) {
            console.log("Error: Please try again, with a valid number.");
            askYear();
        } else {
            console.log(`Processing data for year: ${input}`);
            const users = User.getUsers();
            users.forEach(u => {
                console.log(`Name: ${u.name}, birth date: ${Format.dateFormat(u.birthDate)}`);
            });
            rl.close();
        }
    });
};

askYear();