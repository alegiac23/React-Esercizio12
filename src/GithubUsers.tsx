import { useEffect, useState } from "react";
import { GithubUser } from "./GithubUser";

type UsersProps = {
  login: string;
  id: number;
  avatar_url: string;
};

export function GithubUsers() {
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [selectedUser, setSelectedUsers] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users?per_page=10/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((data: UsersProps[]) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setSelectedUsers(user.login)}>
            {user.login}
          </li>
        ))}
      </ul>

      {selectedUser && <GithubUser username={selectedUser} />}
    </>
  );
}
