import * as DateUtil from "../util/date";

export class User {
    age: number;
    name: string;
    birthDate: Date;
    startDate: Date;
    vacationDays: number = 26;

    constructor(name: string,
                birthDate: Date,
                startDate: Date,
                year: Date,
                vacationDays?: number) {
        this.name = name;
        this.birthDate = birthDate;
        this.startDate = startDate;
        this.age = this.calculateAgeForYear(year);
        this.vacationDays = vacationDays || this.vacationDays;
    }

    calculateAgeForYear(yearDate: Date): number {
        let age = yearDate.getFullYear() - this.birthDate.getFullYear();
        if (age < 0) {
            age = 0;
        }
        return age;
    }

    /**
     * Returns the vacations days taking into account the HR policy:
     * 1 extra day per 5 years
     * @param yearInput
     */
    getVacationsDaysWithPolicy(yearInput: Date): number {
        const inputBeforeStartDate = yearInput.getTime() < this.startDate.getTime();
        // if input before start date
        // then user hasn't started therefore no vacation days
        if (inputBeforeStartDate) {
            return 0;
        }

        // if started in the course of the year
        if (yearInput.getFullYear() === this.startDate.getFullYear()) {
            const totalMonths = 12;
            const vacStartsNextMonth = this.startDate.getMonth() + 1;
            const vacationGivingMonths = totalMonths - vacStartsNextMonth;
            return Math.floor((this.vacationDays / 12) * vacationGivingMonths);
        }

        // if age is less than 30,
        // then no extra days just return vacationDays
        if (this.age < 30) {
            return this.vacationDays;
        }

        let extraDays = 0;
        const birth30th = new Date(this.birthDate.setFullYear(this.birthDate.getFullYear() + 30));
        const mostRecentDate = new Date(Math.max(birth30th.getTime(), this.startDate.getTime()));
        const diffYearInputAndMostRecent = DateUtil.yearsDiff(yearInput, mostRecentDate);
        if (diffYearInputAndMostRecent > 0) {
            extraDays = Math.floor(diffYearInputAndMostRecent / 5);
        }
        return this.vacationDays + extraDays;
    }
}


export const getUsers = (inputYear: Date): User[] => {
    return [
        new User("Hans Müller",
            new Date("1950 12 30"),
            new Date("2001 01 01"),
            inputYear
        ),
        new User("Angelika Fringe",
            new Date("1966 06 09"),
            new Date("2001 01 15"),
            inputYear
        ),
        new User("Peter Klever",
            new Date("1991 07 12"),
            new Date("2016 05 15"),
            inputYear,
            27,
        ),
        new User("Marina Helter",
            new Date("1970 01 26"),
            new Date("2018 01 15"),
            inputYear,
        ),
        new User("Sepp Meier",
            new Date("1980 05 23"),
            new Date("2017 12 01"),
            inputYear,
        ),
    ];
};
