require("module-alias").addAlias("~",__dirname + "../../shared/");
import * as bodyParser from "body-parser";
import * as express from "express";
import * as cors from "cors";
import { getUsers } from "~/core";
import { UserDto } from "~/dto";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get("/users", (req: any, res: any) => {
    getUsers()
        .then((users: UserDto[]) => {
            res.send(users);
        });
});
app.listen(3011, ()=> {
    console.log("Query server is listening on port 3011");
});
