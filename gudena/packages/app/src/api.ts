import { UserDto } from "~/dto";
const axios = require("axios");

export function getUsers(): Promise<UserDto[]> {
    return axios.get("http://localhost:3011/users")
    .then((res) => {
      return res.data as UserDto[];
    });
}
