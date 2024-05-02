"use client";

import Link from "next/link";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";

type TPaginationProps = {
  totalRecords: number;
  page: number;
  limit: number;
};

function Pagination(props: TPaginationProps) {
  const { totalRecords, page, limit } = props;
  const totalPages = Math.ceil(+totalRecords / +limit);
  const arrPages = new Array(totalPages).fill(undefined);

  const router = useRouter();

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pagination}>
        <Link
          href={`/post?page=${+page - 1}&limit=${limit}`}
          style={{
            pointerEvents: +page <= 1 ? "none" : "auto",
          }}
        >
          &laquo;
        </Link>

        {arrPages.map((_, index: number) => (
          <Link
            href={`/post?page=${index + 1}&limit=${limit}`}
            key={`${String(index)}`}
            className={+page === index + 1 ? styles.active : ""}
          >
            {index + 1}
          </Link>
        ))}

        <Link
          href={`/post?page=${+page + 1}&limit=${limit}`}
          style={{
            pointerEvents: +page >= totalPages ? "none" : "auto",
          }}
        >
          &raquo;
        </Link>
      </div>
    </div>
  );
}

export default Pagination;
