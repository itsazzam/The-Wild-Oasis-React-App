import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterName="last"
      options={[
        { optionName: "7", optionLabel: "Last 7 days" },
        { optionName: "30", optionLabel: "Last 30 days" },
        { optionName: "90", optionLabel: "Last 90 days" },
      ]}
    />
  );
}

export default DashboardFilter;
