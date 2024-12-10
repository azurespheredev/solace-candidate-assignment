"use client";

import AdvocateTable from "@/app/components/AdvocateTable";
import { Advocate } from "@/lib/types";
import { Button, Input, Spin } from "antd";
import React, { useEffect, useState } from "react";

const { Search } = Input;

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchAdvocates = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/advocates");
      const jsonResponse = await response.json();

      setAdvocates(jsonResponse.data || []);
      setFilteredAdvocates(jsonResponse.data || []);
    } catch (error) {
      console.error("Error fetching advocates:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAdvocates();
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
      <h1 className="font-mollie text-4xl text-center">Solace Advocates</h1>

      <div className="flex justify-start items-center gap-2">
        <Search className="w-96" value={searchTerm} onChange={({ target: { value } }) => handleSearch(value)} onSearch={handleSearch} />
        <Button type="primary" onClick={handleReset}>Reset</Button>
      </div>

      <div className="flex justify-center">
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <AdvocateTable advocates={filteredAdvocates} />
        )}
      </div>
    </main>
  );
}
