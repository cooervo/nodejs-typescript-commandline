export interface User {
    name: string;
    birthDate: Date;
    startDate: Date;
}

export const getUsers = (): User[] => {
    const users: User[] = [
            <User>{
                name: "Hans Müller",
                birthDate: new Date(),
                startDate: new Date(),
            },
            <User>{
                name: "Angelika Fringe",
                birthDate: new Date(),
                startDate: new Date(),
            },
        ]
    ;

    return users;
};

