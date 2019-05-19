import * as readline from "readline";
import * as User from "./models/user";
import * as File from "./util/file";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const writeReport = (yearInput: Date, users: User.User[]) => {
    const filePath = "./report.txt";
    File.cleanFile(filePath);
    let appendTxt = `Vacation days for year: ${yearInput.getFullYear()}\n\n`;
    File.appendText(filePath, appendTxt);
    users.forEach(u => {
        appendTxt = `Employee: ${u.name}, vacation days: ${u.getVacationsDaysWithPolicy(yearInput)}.\n`;
        File.appendText(filePath, appendTxt);
    });
};

const askYear = () => {
    rl.question("Write year to report (format as YYYY): ", (input: string) => {
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
        writeReport(yearInput, users);
        rl.close();
    });
};

askYear();