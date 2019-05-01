import * as React from "react";
import { UserDto } from "~/dto";
import * as api from "../api";
interface AppState {
  users: UserDto[];
}
class App extends React.Component<any, AppState> {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }
  componentDidMount() {
     api.getUsers().then((users: UserDto[])=> {
           this.setState({ users });
     });
  }
  render() {
    return !this.state.users || this.state.users.length === 0
      ? (<div>NO USER</div>)
      : (<div>
          <div>
            List of existing users
          </div>
        <table style={{ width: "auto", margin: "auto" }}>
          <tbody style={{ display: "block", overflow: "auto" }}>
            <tr>
              <th>Username</th>
              <th>Token</th>
              <th>Logged in on</th>
            </tr>
            {this.state.users.map((user: UserDto, idx: number) => {
              return (
                <tr key={idx}>
                  <td>{user.username}</td>
                  <td>{user.token}</td>
                  <td>{user.loggedInOn}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>);
  }
}
export default App;
