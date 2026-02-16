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

// Soluzione

// Tipizzazione incompleta: Il tipo User dovrebbe includere tutte le proprietà necessarie alla visualizzazione richiesta, tra cui "login", "name" e "avatar_url". Attualmente la proprietà "login" è assente e viene richiesta dall'esercizio. Si consiglia di modificare la tipizzazione in modo più completo:
// interface User {
//   login: string;
//   name: string;
//   avatar_url: string;
//   bio: string;
// }
// Gestione stato di caricamento ed errore: È opportuno aggiungere gestione per stato di caricamento (loading) ed errore (error) per migliorare l'usabilità e la robustezza del componente. Questo consente di fornire feedback all'utente durante l’attesa della risposta o in caso di errore:
// const [loading, setLoading] = useState<boolean>(true);
// const [error, setError] = useState<string | null>(null);

// useEffect(() => {
//   setLoading(true);
//   setError(null);
//   fetch(`https://api.github.com/users/${username}`)
//     .then((response) => {
//       if (!response.ok) throw new Error(response.statusText);
//       return response.json();
//     })
//     .then((json) => {
//       setUser(json);
//       setLoading(false);
//     })
//     .catch((err) => {
//       setError(err.message);
//       setLoading(false);
//     });
// }, [username]);
// Restituire i feedback nel render:

// if (loading) return <p>Caricamento utente...</p>;
// if (error) return <p>Errore: {error}</p>;
// Visualizzazione delle informazioni richieste: Il campo "login" non viene renderizzato. Secondo la traccia, vanno mostrati nome, login e avatar. Consigliato anche l’uso di un testo alternativo più descrittivo sull’avatar:
// return (
//   <>
//     <h2>{user.name}</h2>
//     <p>{user.login}</p>
//     <p>{user.bio}</p>
//     <img src={user.avatar_url} alt={`Avatar dell'utente ${user.login}`} />
//   </>
// );
