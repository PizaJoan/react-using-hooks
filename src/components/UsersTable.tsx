import { FC } from "react";
import { Result, SortBy } from "../types";

export const UsersTable: FC<{
  users?: Result[];
  colorRows: boolean;
  handleRemoveUsers: (email: string) => void;
  handleSortUsers: (sortBy: SortBy) => void;
}> = ({ users, colorRows, handleRemoveUsers, handleSortUsers }) => {
  return (
    <table className="text-neutral-200 text-lg w-full">
      <thead>
        <tr>
          <th>Image</th>
          <th
            onClick={() => handleSortUsers(SortBy.NAME)}
            className="cursor-pointer"
          >
            Name
          </th>
          <th
            onClick={() => handleSortUsers(SortBy.SURNAME)}
            className="cursor-pointer"
          >
            Surname
          </th>
          <th
            onClick={() => handleSortUsers(SortBy.COUNTRY)}
            className="cursor-pointer"
          >
            Country
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user, i) => {
          const rowClassName = colorRows
            ? i % 2 == 0
              ? "bg-slate-600"
              : "bg-slate-500"
            : "";

          return (
            <tr key={user.email} className={`h-20 ${rowClassName}`}>
              <td>
                <img
                  className="mx-auto"
                  src={user.picture.thumbnail}
                  alt={`Profile pic ${user.name.first} ${user.name.last}`}
                />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  className="base-button"
                  onClick={() => handleRemoveUsers(user.email)}
                >
                  Remove
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
