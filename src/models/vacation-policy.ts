import * as DateUtil from "../service/date";
import { User } from "./user";

export const MIN_VACATION_DAYS = 26;
export const AGE_FOR_EXTRAS = 30;

/**
 * Returns the vacations days taking into account the HR policy:
 * 1 extra day per 5 years
 */
export const getVacationDays = (u: User, yearInput: Date): number => {
    const inputBeforeStartDate = yearInput.getTime() < u.startDate.getTime();
    // if input before start date
    // then user hasn't started therefore no vacation days
    if (inputBeforeStartDate) {
        return 0;
    }

    // if started in the course of the year
    if (yearInput.getFullYear() === u.startDate.getFullYear()) {
        const totalMonths = 12;
        const vacStartsNextMonth = u.startDate.getMonth() + 1;
        const vacationGivingMonths = totalMonths - vacStartsNextMonth;
        return Math.floor((u.vacationDays / 12) * vacationGivingMonths);
    }

    // if age is less than 30,
    // then no extra days just return vacationDays
    if (u.age < AGE_FOR_EXTRAS) {
        return u.vacationDays;
    }

    let extraDays = 0;
    const birth30th = new Date(u.birthDate.setFullYear(u.birthDate.getFullYear() + AGE_FOR_EXTRAS));
    const mostRecentDate = new Date(Math.max(birth30th.getTime(), u.startDate.getTime()));
    const diffYearInputAndMostRecent = DateUtil.yearsDiff(yearInput, mostRecentDate);
    if (diffYearInputAndMostRecent > 0) {
        extraDays = Math.floor(diffYearInputAndMostRecent / 5);
    }
    return u.vacationDays + extraDays;
};
