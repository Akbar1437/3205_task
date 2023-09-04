import React, { useState } from "react";
import axios from "axios";
import { EmailForm } from "./components/email-form-component/email-form.component";
import { Results } from "./components/results-component/results.component";
import { InputType } from "./types";

export function App() {
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (formData: InputType) => {
    setIsLoading(true);

    axios
      .post(`http://localhost:5001/search`, formData)
      .then((response) => {
        setSearchData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>Search Users</h1>
      <EmailForm onSubmit={onSubmit} />
      {isLoading ? <span>Загрузка...</span> : <Results data={searchData} />}
    </div>
  );
}
