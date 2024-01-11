import { useCallback, useMemo, useState } from "react";
import { UsersTable } from "./components/UsersTable";
import { useFetchUsers } from "./hooks/useFetchUsers";
import { SortBy, Result } from "./types";

function App() {
  const { originalUsers, results, setResults } = useFetchUsers();
  const [colorRows, setColorRows] = useState(false);
  const [countryFilter, setCountryFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.NONE);

  const changeColorRows = useCallback(
    () => setColorRows((prev) => !prev),
    [setColorRows],
  );

  const handleSortUsers = useCallback(
    (selectedSortBy: SortBy) => {
      setSortBy(sortBy === selectedSortBy ? SortBy.NONE : selectedSortBy);
    },
    [setSortBy, sortBy],
  );

  const handleRestoreUsers = useCallback(() => {
    setResults(originalUsers.current);
    setSortBy(SortBy.NONE);
    setColorRows(false);
    setCountryFilter(null);
  }, [setResults, originalUsers]);

  const handleRemoveUsers = useCallback(
    (email: string) => {
      setResults(results?.filter((user) => user.email !== email));
    },
    [setResults, results],
  );

  const filteredUsers = useMemo(
    () =>
      countryFilter !== null
        ? results?.filter((user) =>
            user.location.country
              .toLowerCase()
              .includes(countryFilter.toLocaleLowerCase()),
          )
        : results,
    [results, countryFilter],
  );

  const sortedUsers = useMemo(() => {
    if (sortBy !== SortBy.NONE && filteredUsers) {
      const getPropFns = {
        [SortBy.COUNTRY]: (user: Result) => user.location.country,
        [SortBy.NAME]: (user: Result) => user.name.first,
        [SortBy.SURNAME]: (user: Result) => user.name.last,
      };
      const getProp = getPropFns[sortBy];

      // alternative toSorted does not require to create a brand new array
      return [...filteredUsers]?.sort((a, b) =>
        getProp(a).localeCompare(getProp(b)),
      );
    }

    return filteredUsers;
  }, [sortBy, filteredUsers]);

  return (
    <>
      <h1 className="w-full text-3xl text-neutral-200 shadow-sm text-center mb-5">
        Technical assess React
      </h1>

      <header className="space-x-4 mb-5">
        <button className="base-button" onClick={changeColorRows}>
          Toggle Color
        </button>
        <button
          className="base-button"
          onClick={() => handleSortUsers(SortBy.COUNTRY)}
        >
          Toggle sort by Country
        </button>
        <button className="base-button" onClick={handleRestoreUsers}>
          Restore State
        </button>
        <input
          type="text"
          placeholder="Type country"
          value={countryFilter ?? ""}
          onChange={(e) => setCountryFilter(e?.currentTarget?.value?.trim())}
        />
      </header>

      <main className="mx-auto flex py-5 max-w-5xl">
        <UsersTable
          users={sortedUsers}
          colorRows={colorRows}
          handleRemoveUsers={handleRemoveUsers}
          handleSortUsers={handleSortUsers}
        />
      </main>
    </>
  );
}

export default App;
