"use client";

import { Advocate } from "@/lib/types";
import { mapAdvocatesWithKey } from "@/lib/utils";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface AdvocateTableProps {
  advocates: Advocate[];
  page: number;
  pageSize: number;
  totalItems: number;
  handlePaginationChange: (page: number, pageSize: number) => void;
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
    width: 136,
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
          <Tag key={specialty}>{specialty}</Tag>
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

const pageSizeOptions = [10, 20, 50, 100];

const AdvocateTable = ({
  advocates,
  page,
  pageSize,
  totalItems,
  handlePaginationChange,
}: AdvocateTableProps) => {
  return (
    <Table
      columns={columns}
      dataSource={mapAdvocatesWithKey(advocates)}
      pagination={{
        position: ["bottomCenter"],
        current: page,
        pageSize,
        pageSizeOptions,
        total: totalItems,
        showSizeChanger: true,
        onChange: handlePaginationChange
      }}
    />
  );
};

export default AdvocateTable;