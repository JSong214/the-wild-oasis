import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export default function useBookings() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  // filter
  const filterField = searchParams.get("status") || "all";
  const filter =
    filterField === "all"
      ? null
      : {
          field: "status",
          value: filterField,
        };

  // sortBy
  const sortField = searchParams.get("sort") || "startDate-desc";
  const [sort, orderby] = sortField.split("-");
  const sortBy =
    sortField === "startDate-desc"
      ? null
      : {
          field: sort,
          orderby,
        };

  // pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { bookings, isLoading, count };
}
