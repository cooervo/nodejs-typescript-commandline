import * as readline from "readline";
import * as User from "./user";
import * as File from "../util/file";
import * as Validate from "../util/validate";
import * as Vacation from "./vacation-policy";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const askReportYear = () => {
    rl.question("Write year to report (format as YYYY): ", (input: string) => {
        if (!Validate.isValidYear(input)) {
            askReportYear();
            return;
        }

        const yearInput: Date = new Date(`${Number(input)} 12 31`);
        writeReport(yearInput, User.getUsers(yearInput));
        rl.close();
    });
};

// Cleans report.txt file and writes employees names and vacation days
const writeReport = (yearInput: Date, users: User.User[]) => {
    const filePath = "./report.txt";
    File.cleanFile(filePath);

    // Write title
    let appendTxt = `Vacation days for year: ${yearInput.getFullYear()}\n\n`;
    File.appendText(filePath, appendTxt);

    // Write content
    users.forEach(u => {
        appendTxt = `Employee: ${u.name}, vacation days: ${Vacation.getVacationDays(u, yearInput)}.\n`;
        File.appendText(filePath, appendTxt);
    });
};

