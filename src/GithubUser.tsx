// Crea un componente GithubUser che riceve una prop username e recupera i dati dell'utente corrispondente dalla Github API. Il componente dovrebbe renderizzare il nome dell'utente, il login e l'avatar.
// Crea un componente GithubUsers che recupera una lista di utenti dalla Github API e renderizza la lista dei nomi utente come un elenco. Quando un nome utente viene cliccato, il componente GithubUser dovrebbe essere renderizzato, passando il nome utente come prop.

import { useEffect, useState } from "react";

type GithubUserProps = { username: string };
type User = {
  name: string;
  avatar_url: string;
  bio: string;
};

export function GithubUser({ username }: GithubUserProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((json) => {
        setUser(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  if (!user) {
    return null;
  }

  return (
    <>
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <img src={user.avatar_url} alt="Avatar dell'user" />
    </>
  );
}
