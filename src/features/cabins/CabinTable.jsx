import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const { cabins, isLoading, error } = useCabins();
  if (isLoading) return <Spinner />;

  // Filtering Cabins

  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins = cabins;

  if (filterValue === "with-discount")
    filteredCabins = filteredCabins.filter((c) => c.discount > 0);
  if (filterValue === "no-discount")
    filteredCabins = filteredCabins.filter((c) => c.discount === 0);

  // 2) Sorting
  const sortBy = searchParams.get("sort") || "name-asc";
  let sortedCabins = filteredCabins;
  const [sortField, sortDirection] = sortBy.split("-");
  const modifier = sortDirection === "asc" ? 1 : -1;

  sortedCabins = filteredCabins.sort(
    (a, b) => (a[sortField] - b[sortField]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
