"use client";

import { Advocate } from "@/lib/types";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface AdvocateTableProps {
  advocates: Advocate[];
}

const columns: ColumnsType<Advocate> = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Degree",
    dataIndex: "degree",
    key: "degree",
  },
  {
    title: "Specialties",
    dataIndex: "specialties",
    key: "specialties",
    render: (specialties: string[]) => (
      <>
        {specialties.map((specialty: string) => (
          <Tag key={specialty} className="mt-1">{specialty}</Tag>
        ))}
      </>
    ),
  },
  {
    title: "Years of Experience",
    dataIndex: "yearsOfExperience",
    key: "yearsOfExperience",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  }
];

const AdvocateTable = ({ advocates }: AdvocateTableProps) => {
  return (
    <Table columns={columns} dataSource={advocates} />
  );
};

export default AdvocateTable;