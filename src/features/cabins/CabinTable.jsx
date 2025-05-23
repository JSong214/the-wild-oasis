import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

import useCabin from "./useCabin";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { cabins, isLoading } = useCabin();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins?.length) return <Empty resource="Cabins" />;

  // 1) 筛选
  const filterValue = searchParams.get("discount") || "all";
  let filterData;

  if (filterValue === "all") filterData = cabins;
  if (filterValue === "no-discount") {
    filterData = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === "with-discount")
    filterData = cabins.filter((cabin) => cabin.discount > 0);

  // 2） 排序
  const sort = searchParams.get("sort") || "created_at-asc";
  const [field, orderby] = sort.split("-");
  const modifier = orderby === "asc" ? 1 : -1;

  const sortCabins = filterData.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns={`0.6fr 1.8fr 2.2fr 1fr 1fr 1fr`}>
        <Table.Header>
          <div></div>
          <div>cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
