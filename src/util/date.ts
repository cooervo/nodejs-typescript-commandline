export const dateParse = (s: string): Date => {
    return new Date(Date.parse(s));
};
// Returns dd.mm.yyyy
export const dateFormat = (d: Date): string => {
    // ISO without timestamp is YYYY-MM-DD
    const dateWithoutTimestamp = d.toISOString().replace(/T.*/, "");
    // split into array
    // reverse order
    // and join with "."
    return dateWithoutTimestamp
        .split("-")
        .reverse()
        .join(".");
};