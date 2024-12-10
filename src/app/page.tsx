"use client";

import AdvocateTable from "@/app/components/AdvocateTable";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { Advocate } from "@/lib/types";
import { Button, Input, Spin } from "antd";
import React, { useEffect, useState } from "react";

const { Search } = Input;

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Pagination
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [totalItems, setTotalItems] = useState<number>(0);

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

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };


  const fetchAdvocates = async ({
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
  }) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/advocates?page=${page}&pageSize=${pageSize}`);
      const jsonResponse = await response.json();

      if (jsonResponse.data) {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      }

      if (jsonResponse.metadata) {
        setPage(jsonResponse.metadata.page);
        setPageSize(jsonResponse.metadata.pageSize);
        setTotalItems(jsonResponse.metadata.totalItems);
      }
    } catch (error) {
      console.error("Error fetching advocates:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAdvocates({ page, pageSize });
  }, [page, pageSize]);

  return (
    <main className="flex flex-col items-start gap-4 p-4">
      <h1 className="font-mollie w-full text-4xl text-center">Solace Advocates</h1>

      <div className="flex items-center gap-2">
        <Search className="w-96" value={searchTerm} onChange={({ target: { value } }) => handleSearch(value)} onSearch={handleSearch} />
        <Button type="primary" onClick={handleReset}>Reset</Button>
      </div>

      <div className="flex justify-center w-full">
        <Spin spinning={isLoading}>
          <AdvocateTable
            advocates={filteredAdvocates}
            page={page}
            pageSize={pageSize}
            totalItems={totalItems}
            handlePaginationChange={handlePaginationChange}
          />
        </Spin>
      </div>
    </main>
  );
}
