import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import Filter from "../ui/Filter";
import TableOperations from "../ui/TableOperations";
import Select from "../ui/Select";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <TableOperations>
          <Filter
            filterName="discount"
            options={[
              { optionName: "all", optionLabel: "All Cabins" },
              { optionName: "with-discount", optionLabel: "With Discount" },
              { optionName: "no-discount", optionLabel: "No Discount" },
            ]}
          />
          <Select
            options={[
              { value: "name-asc", label: "Sort by name (A-Z)" },
              { value: "name-desc", label: "Sort by name (Z-A)" },
              { value: "regularPrice-asc", label: "Sort by price (low first)" },
              {
                value: "regularPrice-desc",
                label: "Sort by price (high first)",
              },
              {
                value: "maxCapacity-asc",
                label: "Sort by capacity (low first)",
              },
              {
                value: "maxCapacity-desc",
                label: "Sort by capacity (high first)",
              },
            ]}
            type="white"
          />
        </TableOperations>
      </Row>
      <Row>
        <CabinTable></CabinTable>

        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
