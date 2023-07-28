import { ControlsTable } from "../ControlsTable";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
	return (
		<div className={styles.wrapper}>
			<ControlsTable />
		</div>
	);
};
