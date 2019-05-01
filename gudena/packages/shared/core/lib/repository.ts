import * as fs from "fs";
import * as path from "path";
import * as JSONStream from "JSONStream";
import { UserDto } from "~/dto";
import { Db } from "./db";

export function getUsers(): Promise<UserDto[]> {
    return getDb().then((db: Db) => {
        return db.users;
    });
}
export function updateToken(username: string,token: string): Promise<UserDto | undefined> {
    return getDb().then((db: Db) => {
        const userToUpdate = db.users
            .find((u) => u.username.toLowerCase() === username.toLowerCase());
        if (userToUpdate) {
            userToUpdate.token = token;
            persistDb(db).then((success: boolean) => {
                return success ? userToUpdate : undefined;
            }).catch(() => {
                return undefined;
            });
        }
        return userToUpdate;
    });
}
export function addUser(username: string, token: string): Promise<UserDto | undefined> {
  return getDb().then((db: Db)=> {
      const userToAdd: UserDto= {
          username,
          token,
          loggedInOn: new Date()
      };
      db.users.push(userToAdd);
      return persistDb(db).then((success: boolean)=> {
          return success? userToAdd: undefined;
      }).catch(()=> {
          return undefined;
      });
  });
}
export function deleteUser() {
    // TODO: yet to implement
}
// private methods
function getDb(): Promise<Db> {
    return new Promise((resolve, reject) => {
        const db: Db = {
            users: []
        };
        fs.createReadStream(path.join(__dirname, "data.json"))
            .pipe(JSONStream.parse("*", (val: any, keyArr: string[]) => {
                return { key: keyArr[0], value: val };
            }))
            .on("data", (data: any) => {
                db[data.key] = data.value;
            })
            .on("end", () => {
                resolve(db);
            })
            .on("error", () => {
                reject("error");
            });
    });
}
function persistDb(db: Db): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        const writeStream = fs.createWriteStream(path.join(__dirname, "data.json"));
        const jsonObjStream = JSONStream.stringifyObject();
        jsonObjStream.pipe(writeStream);
        writeStream.on("finish", () => {
            resolve(true);
        })
            .on("error", () => {
                resolve(false);
            });
        const propertyKeys = Object.keys(db);
        const maxLimit = propertyKeys.length;
        let i = 0;
        const writer = () => {
            let ok = true;
            while (i < maxLimit && ok) {
                ok = jsonObjStream.write([
                    propertyKeys[i],
                    db[propertyKeys[i]]
                ]);
                i += 1;
            }
            if (i >= maxLimit) {
                jsonObjStream.end();
            }
            if (i < maxLimit) {
                writeStream.on("drain", writer);
            }
        };
        writer();
    });
}
