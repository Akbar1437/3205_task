import React from "react";
import { InputType } from "../../types";

export function Results({ data }: { data: InputType[] }) {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Email: {item.email}, Number: {item.number}
          </li>
        ))}
        {data.length <= 0 && <span>Пользователь не найден</span>}
      </ul>
    </div>
  );
}
