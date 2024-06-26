import { useGlobalContext } from "../CustomHooks.jsx/useGlobalContext";
import { tableHeaders } from "../Data";
import TableItems from "./TableItems";

const Table = () => {
  const { userData } = useGlobalContext();

  const headerList = tableHeaders.map((header) => (
    <th key={header.id}>{header.value}</th>
  ));

  const tableData = userData.map((data) => {
    const { id, firstName, email, phoneNumber } = data;
    return (
      <TableItems
        key={id}
        id={id}
        firstName={firstName}
        email={email}
        phoneNumber={phoneNumber}
        data={data}
      />
    );
  });

  return (
    <>
      <div className="col-md-6 tabt">
        <table className="table">
          <tbody>
            <tr className="ztxt">{headerList}</tr>
            {tableData}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
