/**
 * Validate input length and if it is a number
 * @param input
 */
export const isValidYear = (input: string) => {
    if (isNaN(Number(input))) {
        console.log("Error: Please try again, with a valid number.\n");
        return false;
    }

    if (input.length !== 4) {
        console.log("Error: Year should be 4 digits. Example: 1950, 2019.\n");
        return false;
    }

    return true;
};