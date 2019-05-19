import * as chai from "chai";
import { isValidYear } from "../../src/service/validate";

describe("Validate Service tests", () => {
    it("should validate year as YYYY", () => {
        chai.assert(isValidYear("2000") === true);
        chai.assert(isValidYear("-2000") === false);
        chai.assert(isValidYear("2") === false);
        chai.assert(isValidYear("12345") === false);
        chai.assert(isValidYear("foo") === false);
    });
});