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

// Soluzione

// Correzione URL fetch: L’endpoint contiene uno slash finale errato ("?per_page=10/"). Deve essere rimosso per garantire l’esito corretto della chiamata API:
// fetch("https://api.github.com/users?per_page=10")
// Nomenclatura stato selezionato: Rinominare lo stato setSelectedUsers in setSelectedUser, poiché gestisce un singolo utente selezionato. Tutti i riferimenti nel file vanno aggiornati di conseguenza.

// Gestione stato di caricamento ed errore: È consigliata una gestione dello stato di caricamento ed errore durante il recupero della lista utenti. Questo migliora la fruibilità:

// const [loading, setLoading] = useState<boolean>(true);
// const [error, setError] = useState<string | null>(null);

// useEffect(() => {
//   setLoading(true);
//   setError(null);
//   fetch("https://api.github.com/users?per_page=10")
//     .then((response) => {
//       if (!response.ok) throw new Error(response.statusText);
//       return response.json();
//     })
//     .then((data: UsersProps[]) => {
//       setUsers(data);
//       setLoading(false);
//     })
//     .catch((err) => {
//       setError(err.message);
//       setLoading(false);
//     });
// }, []);

// if (loading) return <p>Caricamento utenti...</p>;
// if (error) return <p>Errore: {error}</p>;
