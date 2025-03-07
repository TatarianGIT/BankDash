import {
  CustomTableBody,
  CustomTableContainer,
  CustomTableHeader,
  CustomTableTotalFooter,
} from "./CustomTable";
import TableHeader from "../TableHeader";
import TableRow from "../TableRow";

const LoadingTable = () => {
  return (
    <CustomTableContainer>
      <CustomTableHeader>
        <TableHeader isLoading />
      </CustomTableHeader>

      <CustomTableBody>
        {Array.from({ length: 10 }, (_, index) => {
          return <TableRow key={index} isLoading />;
        })}
      </CustomTableBody>

      <CustomTableTotalFooter>
        <TableRow isLoading isTotalFooter={true} key={"total"} />
      </CustomTableTotalFooter>
    </CustomTableContainer>
  );
};

export default LoadingTable;
