import * as chai from "chai";
import { dateFormat, yearsDiff } from "../../src/service/date";

describe("Date Service tests", () => {
    it("Format date", () => {
        chai.assert(dateFormat(new Date("2010 01 31")) === "31.01.2010");
    });

    it("5 years diff", () => {
        const diff = yearsDiff(
            new Date("2020 01 31"),
            new Date("2015 01 31"));
        chai.assert(diff === 5);
    });
});