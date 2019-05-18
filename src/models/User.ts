import * as Date from "../util/date";
import { dateParse } from "../util/date";

export interface User {
    name: string;
    birthDate: Date;
    startDate: Date;
    vacationDays?: number;
}

export const getUsers = (): User[] => {
    return [
        <User>{
            name: "Hans Müller",
            birthDate: dateParse("1950 12 30"),
            startDate: dateParse("2001 01 01"),
            vacationDays: 26,
        },
        <User>{
            name: "Angelika Fringe",
            birthDate: dateParse("1966 06 09"),
            startDate: dateParse("2001 01 15"),
            vacationDays: 26,
        },
        <User>{
            name: "Peter Klever",
            birthDate: dateParse("1991 07 12"),
            startDate: dateParse("2016 05 15"),
            vacationDays: 27,
        },
        <User>{
            name: "Marina Helter",
            birthDate: dateParse("1970 01 26"),
            startDate: dateParse("2018 01 15"),
            vacationDays: 26,
        },
        <User>{
            name: "Sepp Meier",
            birthDate: dateParse("1980 05 23"),
            startDate: dateParse("2011 12 01"),
            vacationDays: 26,
        },
    ];
};

