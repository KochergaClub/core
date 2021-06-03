import styles from './tables.module.css';

export const Table: React.FC = ({ children }) => (
  <table className={styles.table}>{children}</table>
);

export const TableHeaderCell: React.FC = ({ children }) => (
  <th className={styles['table-header-cell']}>{children}</th>
);
