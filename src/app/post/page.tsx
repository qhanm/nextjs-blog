import Link from "next/link";
import { IconEdit } from "../components/IconEdit";
import { IconTrash } from "../components/IconTrash";
import styles from "../page.module.css";
import { TBlog, TParams, TResponses } from "../type";
import Pagination from "../components/Pagination";
import { getListPost } from "../actions";
import FormComponent from "../components/FormComponent";

export default async function Index(props: TParams) {
  const limit = props.searchParams?.limit ?? 2;
  const page = props.searchParams?.page ?? 1;

  const items: { data: TBlog[]; totalRecord: number } = await getListPost(
    +page,
    +limit
  );

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Post page</h2>

      <FormComponent />
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Title</th>
            <th className={styles.th}>Description</th>
            <th className={styles.th}>Updated At</th>
            <th className={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {items.data?.map((item: TBlog) => (
            <tr className={styles.tr} key={item._id}>
              <td className={styles.td}>{item.title}</td>
              <td className={styles.td}>{item.description}</td>
              <td className={styles.td}>{item.updatedAt}</td>
              <td className={styles.td}>
                <div className={styles.actionWrapper}>
                  <div className={styles.action}>
                    <IconEdit />
                  </div>
                  <div className={styles.action}>
                    <IconTrash />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        limit={+limit}
        page={+page}
        totalRecords={items?.totalRecord}
      />
    </main>
  );
}
