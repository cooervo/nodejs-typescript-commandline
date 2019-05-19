import * as chai from "chai";
import { User } from "../../src/models/user";
import { MIN_VACATION_DAYS } from "../../src/models/vacation-policy";

describe("User tests", () => {
    it("26 vacation days is the default", () => {
        const u = new User("", new Date(), new Date(), new Date());
        chai.assert(u.vacationDays === MIN_VACATION_DAYS);
    });

    it("special contract override the default vacation days", () => {
        const specialContract = 30;
        const u = new User("", new Date(), new Date(), new Date(), 30);
        chai.assert(u.vacationDays === specialContract);
    });
});

describe("User age", () => {
    it("if year input is before user birthdate he should be 0", () => {
        const u = new User("", new Date("2020 10 10"), new Date(), new Date("2000 02 02"));
        chai.assert(u.age === 0);
    });
});
