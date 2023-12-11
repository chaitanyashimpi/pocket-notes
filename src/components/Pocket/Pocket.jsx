import React, { useEffect, useState } from "react";
import styles from "./pocket.module.css";
import NewGroup from "../NewNoteGroup/NewGroup";

const Pocket = () => {
	const [noteGroups, setNoteGroups] = useState([]);
    const [selectNote, setSelectNote] = useState("")

	useEffect(() => {
		const updateNoteGroups = () => {
			const allGroups = JSON.parse(localStorage.getItem("pocketGroup")) || [];
			setNoteGroups(allGroups);
		};

		updateNoteGroups();

		window.addEventListener("storage", updateNoteGroups);

		return () => {
			window.removeEventListener("storage", updateNoteGroups);
		};
	}, [setNoteGroups]);

	const setNote = (name) => {
		localStorage.setItem("setNote", name);
        setSelectNote(name)
	};

	return (
		<div className={styles.pocket}>
			<h1>Pocket Notes</h1>
			<div className={styles.notes}>
				{noteGroups.map((group, index) => (
					<div
						className={styles.note}
						style={{
							backgroundColor: selectNote === group[1] || localStorage.getItem("setNote") === group[1]
								? "rgba(0, 0, 0, 0.158)"
								: "",
						}}
						key={index}
						onClick={() => setNote(group[1])}
					>
						<div
							className={styles.noteLogo}
							style={{ backgroundColor: group[2] }}
						>
							{group[0]}
						</div>
						<div className={styles.noteName}>{group[1]}</div>
					</div>
				))}
				<NewGroup />
			</div>
		</div>
	);
};

export default Pocket;
