import * as inquirer from "inquirer";

let loginQuestions: inquirer.Questions = [
    {
        type: "input",
        name: "username",
        message: "Spotify email:"
    },
    {
        type: "password",
        name: "password",
        message: "Password:"
    }
];


export class Credentials {

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    toBase64(): string {
        let buffer = new Buffer(`${this.username}:${this.password}`,"utf-8");
        return buffer.toString("base64");
    }

    static prompt(): Promise<Credentials> {
        let completion = new Promise<Credentials>((resolve, reject) => {
            inquirer.prompt(loginQuestions, answers => {
                let result = new Credentials(
                    <string>answers["username"],
                    <string>answers["password"]
                );
                resolve(result);
            });
        });

        return completion;
    }

    username: string;
    password: string;
}
