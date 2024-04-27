import Link from "next/link";
import styles from "../page.module.css";

type TPaginationProps = {
  totalRecords: number;
  page: number;
  limit: number;
};

function Pagination(props: TPaginationProps) {
  const { totalRecords, page, limit } = props;
  const totalPages = Math.ceil(+totalRecords / +limit);

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pagination}>
        <Link href="/">&laquo;</Link>

        {new Array(totalPages).map((_, index: number) => (
          <Link href="/" key={`${String(index)}`}>
            {index + 1}
          </Link>
        ))}

        <Link href="/">&raquo;</Link>
      </div>
    </div>
  );
}

export default Pagination;
