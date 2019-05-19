import * as chai from "chai";
import { User } from "../../src/models/user";
import * as Vacation from "../../src/models/vacation-policy";
import { MIN_VACATION_DAYS } from "../../src/models/vacation-policy";

describe("Vacation policy", () => {
    it("if input before start date, then vacation days 0", () => {
        const dateInFuture = new Date("4020 01 01");
        const inputYear = new Date("2000 01 01");
        const u = new User("", new Date(), dateInFuture, inputYear);
        const vacationsDays = Vacation.getVacationDays(u, inputYear);
        chai.assert(vacationsDays === 0);
    });

    it("should have default vacation days, if user is less than 30 years old and has no special contract", () => {
        const birthDate = new Date("2000 01 01");
        const startDate = new Date("2015 01 01");
        const inputYear = new Date("2020 01 01");
        const u = new User("", birthDate, startDate, inputYear);
        const vacationsDays = Vacation.getVacationDays(u, inputYear);
        chai.assert(vacationsDays === MIN_VACATION_DAYS);
    });

    it("should have 2 extra vacation days", () => {
        const birthDate = new Date("2000 01 01");
        const startDate = new Date("2030 01 01");
        const inputYear = new Date("2040 01 01");
        const u = new User("", birthDate, startDate, inputYear);
        const vacationsDays = Vacation.getVacationDays(u, inputYear);
        chai.assert(vacationsDays === (MIN_VACATION_DAYS + 2));
    });

    it("should have 6 extra vacation days + special contract", () => {
        const birthDate = new Date("2000 01 01");
        const startDate = new Date("2030 01 01");
        const inputYear = new Date("2060 01 01");
        const specialContract = 33;
        const u = new User("",
            birthDate, startDate, inputYear,
            specialContract);
        chai.assert(u.vacationDays === specialContract);
        const vacationsDays = Vacation.getVacationDays(u, inputYear);
        chai.assert(vacationsDays === (specialContract + 6));
    });

    it("should have 1 extra vacation days", () => {
        const birthDate = new Date("2000 01 01");
        const startDate = new Date("2034 01 01");
        const inputYear = new Date("2040 01 01");
        const u = new User("", birthDate, startDate, inputYear);
        const vacationsDays = Vacation.getVacationDays(u, inputYear);
        chai.assert(vacationsDays === (MIN_VACATION_DAYS + 1));
    });

    it("should have half vacation days", () => {
        const birthDate = new Date("2000 01 01");
        const startDate = new Date("2040 06 01");
        const inputYear = new Date("2040 12 31");
        const u = new User("", birthDate, startDate, inputYear);
        const vacationsDays = Vacation.getVacationDays(u, inputYear);
        chai.assert(vacationsDays === Math.floor(MIN_VACATION_DAYS / 2));
    });
});