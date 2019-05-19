import * as fs from "fs";

export const cleanFile = (fileName: string) => {
    fs.writeFile(fileName, "", err => {
        if (err) throw console.log(`Error cleaning file: ${fileName}`, err);
    });
};
export const appendText = (fileName: string, appendTxt: string) => {
    fs.appendFile(fileName, appendTxt, err => {
        if (err) throw console.log(`Error appending to ${fileName}`, err);
    });
};
