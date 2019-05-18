// Returns dd.mm.yyyy
export const dateFormat = (d: Date): string => {
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const date = d.getDate().toString().padStart(2, "0");
    return `${date}.${month}.${d.getFullYear()}`;
};

export const yearsDiff = (d1: Date, d2: Date): number => {
    return d1.getFullYear() - d2.getFullYear();
};