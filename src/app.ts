import * as readline from "readline";
import * as User from "./models/user";
import * as File from "./util/file";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askYear = () => {
    rl.question("Write year to report (format as YYYY): ", (input: string) => {
        if (!isValid(input)) {
            askYear();
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
        appendTxt = `Employee: ${u.name}, vacation days: ${u.getVacationsDaysWithPolicy(yearInput)}.\n`;
        File.appendText(filePath, appendTxt);
    });
};

/**
 * Validate input lenght and if it is a number
 * @param input
 */
function isValid(input: string) {
    if (isNaN(Number(input))) {
        console.log("Error: Please try again, with a valid number.\n");
        return false;
    }
    if (input.length !== 4) {
        console.log("Error: Year should be 4 digits. Example: 1950, 2019.\n");
        return false;
    }
    return true;
}

askYear();