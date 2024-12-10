"use client";

import { Advocate } from "@/lib/types";
import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import AdvocateTable from "./components/AdvocateTable";

const { Search } = Input;

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch("/api/advocates")
      .then((response) => response.json())
      .then((jsonResponse) => {
        setAdvocates(jsonResponse.data || []);
        setFilteredAdvocates(jsonResponse.data || []);
      })
      .catch((error) => console.error("Error fetching advocates:", error));
  }, []);

  const handleSearch = (value: string) => {
    const searchTermValue = value.toLowerCase();
    setSearchTerm(searchTermValue);

    const filtered = advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTermValue) ||
        advocate.lastName.toLowerCase().includes(searchTermValue) ||
        advocate.city.toLowerCase().includes(searchTermValue) ||
        advocate.degree.toLowerCase().includes(searchTermValue) ||
        advocate.specialties.some((s) => s.toLowerCase().includes(searchTermValue)) ||
        advocate.yearsOfExperience.toString().includes(searchTermValue)
      );
    });

    setFilteredAdvocates(filtered);
  };

  const handleReset = () => {
    setFilteredAdvocates(advocates);
    setSearchTerm("");
  };

  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="text-center">Solace Advocates</h1>

      <div className="flex justify-start items-center gap-2">
        <Search className="w-96" value={searchTerm} onChange={({ target: { value } }) => handleSearch(value)} onSearch={handleSearch} />
        <Button type="primary" onClick={handleReset}>Reset</Button>
      </div>

      <AdvocateTable advocates={filteredAdvocates} />
    </main>
  );
}
