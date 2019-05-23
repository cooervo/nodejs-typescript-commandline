import { MIN_VACATION_DAYS } from "./vacation-policy";

export class User {
    age: number;
    name: string;
    birthDate: Date;
    startDate: Date;
    vacationDays: number = MIN_VACATION_DAYS; // default

    constructor(name: string,
                birthDate: Date,
                startDate: Date,
                year: Date,
                vacationDays?: number) {
        this.name = name;
        this.birthDate = birthDate;
        this.startDate = startDate;
        this.age = this.getAge(year);
        if (vacationDays) {
            this.vacationDays = vacationDays;
        }
    }

    /**
     * Gets the user age based on the given yearDate
     */
    getAge(yearDate: Date): number {
        let age = yearDate.getFullYear() - this.birthDate.getFullYear();
        if (age < 0) {
            age = 0;
        }
        return age;
    }
}

export const getUsers = (inputYear: Date): User[] => {
    return [
        new User("Hans Müller",
            new Date("1950 12 30"), // Birthdays
            new Date("2001 01 01"), // Started work date
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
            27,              // special contract
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
