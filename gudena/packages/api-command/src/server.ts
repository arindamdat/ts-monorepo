require("module-alias").addAlias("~",__dirname + "../../shared/");
import * as bodyParser from "body-parser";
import * as express from "express";
import * as cors from "cors";
import { updateToken } from "~/core";
import { UserDto } from "~/dto";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.post("/users/:userId", (req, res) => {
    updateToken(req.params.userId, req.body.token)
        .then((user: UserDto | undefined) => {
            if (user === undefined) {
                res.status(500).send("Error");
            } else {
                res.send(user);
            }
        });
});
app.listen(3012, () => {
    console.log("Command server: listening on port 3012");
});
