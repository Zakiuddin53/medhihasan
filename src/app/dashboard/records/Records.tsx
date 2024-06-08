"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "mantine-datatable";
import { Button, LoadingOverlay, Modal, Pagination } from "@mantine/core";
import axios from "axios";
import Link from "next/link";
import { useDisclosure, useDebouncedValue } from "@mantine/hooks";
import classes from "./Records.module.css";

function Records() {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 800);
  const [visible, setVisible] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  const recordsPerPage = 5;

  const fetchUsers = (query = "") => {
    setVisible(true);
    axios
      .get(`/api/users`, {
        params: {
          username: query,
          phone: query,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const filteredRecords = res.data.filter(
            (record) =>
              record.username.toLowerCase().includes(query.toLowerCase()) ||
              record.phone.includes(query)
          );

          setRecords(filteredRecords);
          setTotalPages(Math.ceil(filteredRecords.length / recordsPerPage));
        }
      })
      .finally(() => {
        setVisible(false);
      });
  };

  useEffect(() => {
    fetchUsers(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = async (page) => {
    setVisible(true);
    try {
      setCurrentPage(page);
      const res = await axios.get(`/api/users`, {
        params: {
          username: debouncedSearchQuery,
          phone: debouncedSearchQuery,
          page: page,
        },
      });
      if (res.status === 200) {
        const filteredRecords = res.data.filter(
          (record) =>
            record.username
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase()) ||
            record.phone.includes(debouncedSearchQuery)
        );

        setRecords(filteredRecords);
        setTotalPages(Math.ceil(filteredRecords.length / recordsPerPage));
      }
    } finally {
      setVisible(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/users/${recordToDelete}`);

      if (res.status === 200) {
        fetchUsers(debouncedSearchQuery);
      }
    } finally {
      close();
      setRecordToDelete(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleOpenDeleteModal = (id) => {
    setRecordToDelete(id);
    open();
  };

  const ModalContent = () => (
    <div className={classes.modelContentContainer}>
      <h1 className={classes.modelText}>
        Are You Sure you want to Delete this Record?
      </h1>
      <div className={classes.modelButtonContainer}>
        <div style={{ marginRight: "20px" }}>
          <Button variant="primary" onClick={close}>
            CANCEL
          </Button>
        </div>
        <div>
          <Button color="#c8102e" onClick={handleDelete}>
            DELETE
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "blue", type: "bars" }}
      />
      <div className="bg-gray-200 h-screen">
        <div className="max-w-screen-l mx-auto px-4 lg:px-8 py-8 text-black">
          <div className="bg-white shadow-md rounded-lg">
            <div className="p-4">
              <div className="text-center mb-6">
                <h2
                  className="text-xl font-semibold mb-2"
                  style={{ fontSize: "2rem", marginTop: "20px" }}
                >
                  Mehdi Hasan
                </h2>
                <p
                  className="text-gray-600 mb-4"
                  style={{
                    fontSize: "25px",
                    fontFamily: "serif",
                    marginTop: "25px",
                  }}
                >
                  Client Measurement Details
                </p>
              </div>
              <div className="mb-4 w-1/5">
                <input
                  type="text"
                  placeholder="Search by Name / Phone No"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              <Modal opened={opened} onClose={close} centered>
                <div
                  className="modal_header"
                  style={{ backgroundColor: "#3aafa9" }}
                >
                  <h2 className="header_text">Modal Header</h2>
                  <button className="close_button" onClick={close}>
                    Close
                  </button>
                </div>
                <div className="modal_content">
                  <ModalContent />
                </div>
              </Modal>

              <div style={{ minHeight: "300px" }}>
                {currentRecords.length > 0 ? (
                  <DataTable
                    style={{ padding: "20px" }}
                    columns={[
                      { accessor: "username", width: 200, resizable: true },
                      { accessor: "email", width: 200, resizable: true },
                      { accessor: "country", width: 200, resizable: true },
                      { accessor: "phone", width: 200, resizable: true },
                      {
                        accessor: "date",
                        width: 200,
                        resizable: true,
                        render: (rowData) =>
                          rowData.date
                            ? new Date(rowData.date).toLocaleDateString()
                            : "N/A",
                      },

                      {
                        accessor: "actions",
                        title: "Actions",

                        render: (rowData) => (
                          <div style={{ display: "flex", gap: "20px" }}>
                            <Link
                              href={`/dashboard/records/view/${rowData.id}`}
                            >
                              <Button variant="filled">View</Button>
                            </Link>
                            <Link
                              href={`/dashboard/records/edit/${rowData.id}`}
                            >
                              <Button color="cyan">Edit</Button>
                            </Link>
                            <Button
                              variant="filled"
                              color="#c92a2a"
                              onClick={() => handleOpenDeleteModal(rowData.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        ),
                        width: 230,
                        resizable: true,
                      },
                    ]}
                    records={currentRecords}
                    minHeight={500}
                    height={500}
                    withRowBorders
                    withTableBorder
                    striped
                    fz="md"
                    verticalSpacing="md"
                    highlightOnHover
                  />
                ) : (
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    No Records Found
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-center">
                <Pagination
                  total={totalPages}
                  value={currentPage}
                  onChange={handlePageChange}
                  color="teal"
                  radius="xl"
                />
              </div>

              <div className="mt-4 text-center" style={{ color: "darkblue" }}>
                Showing {indexOfFirstRecord + 1} to{" "}
                {indexOfLastRecord > records.length
                  ? records.length
                  : indexOfLastRecord}{" "}
                of {records.length} records
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Records;
