import styles from "./ControlsTable.module.css";

export const ControlsTable = () => {
  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td>Pause:</td>
          <td>P</td>
        </tr>

        <tr>
          <td>Restart:</td>
          <td>R</td>
        </tr>

        <tr>
          <td>Move left:</td>
          <td>J</td>
        </tr>

        <tr>
          <td>Move right:</td>
          <td>K</td>
        </tr>

        <tr>
          <td>Fire:</td>
          <td>F</td>
        </tr>

        <tr>
          <td>Debug mode:</td>
          <td>Q</td>
        </tr>
      </tbody>
    </table>
  );
};
