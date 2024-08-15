import Select from "../../ui/Select";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterName="status"
        options={[
          { optionName: "all", optionLabel: "All" },
          { optionName: "checked-out", optionLabel: "Checked out" },
          { optionName: "checked-in", optionLabel: "Checked in" },
          { optionName: "unconfirmed", optionLabel: "Unconfirmed" },
        ]}
      />

      <Select
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
