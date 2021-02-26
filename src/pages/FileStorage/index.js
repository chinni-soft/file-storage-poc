import React, { useEffect, useState } from "react";
import TableScreenTemplate from "../../components/templates/TableScreenTemplate/TableScreenTemplate";
import TopNavigationBar from "../../components/organisms/TopNavigationBar/TopNavigationBar";
import SideNavigationBar from "../../components/organisms/SideNavigationBar/SideNavigationBar";
import EnhancedTable from "../../components/organisms/WhiteBoardTable/EnhancedTable";
import { useHistory } from "react-router-dom";
import { fetchAllFiles, uploadFile } from "../../services/FileStorage";

export default function FileStorage() {
  const history = useHistory();
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");

  useEffect(() => {
    async function fetchData() {
      var files = await fetchAllFiles();
      files = files.map((file) => {
        return { name: file };
      });
      console.log("files ->", files);
      setFiles(files);
    }
    fetchData();
  }, [selectedFile]);

  const headCells = [{ id: "name", numeric: false, label: " File-Name (click to download)" }];

  const handleTabChange = (event, value) => {
    if (value === "FileStorage") {
      history.push("/file-storage");
    }
  };

  const onUploadHandler = async (e) => {
    e.preventDefault();
    console.log("e.target.file --> ", e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    await uploadFile(e.target.files[0]);
  };

  return (
    <TableScreenTemplate
      header={<TopNavigationBar />}
      sidebar={<SideNavigationBar handleTabChange={handleTabChange} />}
      body={
        <EnhancedTable
          headCells={headCells}
          rows={files}
          defaultOrderBy="name"
          defaultOrder="asc"
          rowsPerPage={5}
          onUploadHandler={onUploadHandler}
        />
      }
    />
  );
}
