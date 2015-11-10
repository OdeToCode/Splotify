import * as inquirer from "inquirer";

const id = "SPOTIFYID";
const secret = "SPOTIFYSECRET";

let loginQuestions: inquirer.Questions = [
    {
        type: "input",
        name: "username",
        message: "Spotify name:"
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

    static fromEnvironment(): Promise<Credentials> {
        if (!process.env[id] || !process.env[secret]) {
            return Credentials.prompt();
        }

        let result = new Credentials(
            process.env[id],
            process.env[secret]
        );
        return Promise.resolve(result);
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
