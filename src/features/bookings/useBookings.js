import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // Filtering
  const filterValue = searchParams.get("status");

  // Sorting
  const sortValue = searchParams.get("sort") || "startDate-desc";
  const [sortBy, direction] = sortValue.split("-");
  const sort = { sortBy, direction };

  // Pagination
  const page = Number(searchParams.get("page"));

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () =>
      getBookings({
        filter,
        sort,
        page,
      }),
  });

  // Prefetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () =>
        getBookings({
          filter,
          sort,
          page: page + 1,
        }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () =>
        getBookings({
          filter,
          sort,
          page: page - 1,
        }),
    });

  return { bookings, isLoading, error, count };
}

export default useBookings;
