import React, { useEffect, useState } from "react";
import TableScreenTemplate from "../../components/templates/TableScreenTemplate/TableScreenTemplate";
import TopNavigationBar from "../../components/organisms/TopNavigationBar/TopNavigationBar";
import SideNavigationBar from "../../components/organisms/SideNavigationBar/SideNavigationBar";
import EnhancedTable from "../../components/organisms/WhiteBoardTable/EnhancedTable";
import { useHistory } from "react-router-dom";
import { fetchAllFiles } from "../../services/FileStorage";

export default function FileStorage() {
  const history = useHistory();
  const [files, setFiles] = useState([]);
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
  }, []);
  const headCells = [{ id: "name", numeric: false, label: "Name Of The File" }];

  // const rows = [createData("123345"), createData("12345"), createData("1233245")];
  // function createData(name) {
  //   return { name };
  // }
  const handleTabChange = (event, value) => {
    if (value === "FileStorage") {
      history.push("/file-storage");
    }
  };

  return (
    <TableScreenTemplate
      header={<TopNavigationBar />}
      sidebar={<SideNavigationBar handleTabChange={handleTabChange} />}
      body={
        <EnhancedTable headCells={headCells} rows={files} defaultOrderBy="name" defaultOrder="asc" rowsPerPage={5} />
      }
    />
  );
}
