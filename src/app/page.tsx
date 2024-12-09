"use client";

import { Advocate } from "@/lib/types";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const searchTermRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    console.log("Fetching advocates...");
    fetch("/api/advocates")
      .then((response) => response.json())
      .then((jsonResponse) => {
        setAdvocates(jsonResponse.data || []);
        setFilteredAdvocates(jsonResponse.data || []);
      })
      .catch((error) => console.error("Error fetching advocates:", error));
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTermRef.current) {
      searchTermRef.current.textContent = searchTerm;
    }

    console.log("Filtering advocates...");
    const filtered = advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm) ||
        advocate.lastName.toLowerCase().includes(searchTerm) ||
        advocate.city.toLowerCase().includes(searchTerm) ||
        advocate.degree.toLowerCase().includes(searchTerm) ||
        advocate.specialties.some((s) => s.toLowerCase().includes(searchTerm)) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filtered);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);

    if (searchTermRef.current) {
      searchTermRef.current.textContent = "";
    }
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span ref={searchTermRef}></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate: Advocate, index: number) => (
            <tr key={index}>
              <td>{advocate.firstName}</td>
              <td>{advocate.lastName}</td>
              <td>{advocate.city}</td>
              <td>{advocate.degree}</td>
              <td>
                {advocate.specialties.map((s, idx) => (
                  <div key={idx}>{s}</div>
                ))}
              </td>
              <td>{advocate.yearsOfExperience}</td>
              <td>{advocate.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
