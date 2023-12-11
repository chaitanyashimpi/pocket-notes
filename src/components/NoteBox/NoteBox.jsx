import React, { useEffect, useState } from "react";
import style from "./notebox.module.css";
import Img from "../../images/notes.png";

const NoteSection = (noteGroup) => {
	const [myNote, setMyNote] = useState([]);
	const [allNotes, setAllNotes] = useState([]);

	useEffect(() => {
		const groupName = localStorage.getItem("setNote");
		const storedNotes = JSON.parse(localStorage.getItem(groupName)) || [];
		setMyNote(Array.isArray(storedNotes) ? storedNotes : []);
	}, []);

	const submitNote = async (event) => {
		event.preventDefault();

		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];

		const today = new Date();
		const day = today.getDate();
		const month = months[today.getMonth()];
		const year = today.getFullYear();

		const formattedDate = `${day} ${month} ${year}`;

		let hours = today.getHours();
		let minutes = today.getMinutes();
		const ampm = hours >= 12 ? "PM" : "AM";

		// Convert hours to 12-hour format
		hours = hours % 12;
		hours = hours ? hours : 12; // The hour '0' should be '12'

		// Add leading zero to minutes if needed
		minutes = minutes < 10 ? "0" + minutes : minutes;

		const formattedTime = `${hours}:${minutes} ${ampm}`;

		const Note = [formattedDate, formattedTime, allNotes];

		const groupName = localStorage.getItem("setNote");

		const existingGroups = JSON.parse(localStorage.getItem(groupName)) || [];

		if (existingGroups.length === 0) {
			localStorage.setItem(groupName, JSON.stringify([Note]));
		} else {
			localStorage.setItem(
				groupName,
				JSON.stringify([...existingGroups, Note])
			);
		}

		setMyNote(localStorage.getItem(groupName));

		setAllNotes("");
	};

	return (
		<>
			<div className={style.header} style={{ backgroundColor: "#001f8b" }}>
				<div
					className={style.logo}
					style={{ backgroundColor: noteGroup.noteGroup[2] }}
				>
					{noteGroup.noteGroup[0]}
				</div>
				<div className={style.name}>{noteGroup.noteGroup[1]}</div>
			</div>
			<div className={style.allNotes}>
				{[...myNote].reverse().map((note, index) => (
					<div className={style.note} key={index}>
						{note[2]}
						<div className={style.noteTime}>
							{note[0]} <span></span> {note[1]}
						</div>
					</div>
				))}
			</div>

			<form onSubmit={submitNote} className={style.addNote}>
				<textarea
					name="note"
					id="note"
					onChange={(event) => {
						setAllNotes(event.target.value);
					}}
					value={allNotes}
					placeholder="Enter your note here..."
				></textarea>
				<button className="fas fa-paper-plane"></button>
			</form>
		</>
	);
};

const NoteBox = () => {
	const [noteGroup, setNoteGroup] = useState(null);

	useEffect(() => {
		// Retrieve the value from localStorage
		const setNoteValue = localStorage.getItem("setNote");

		if (setNoteValue) {
			// Parse the "pocketGroup" value from localStorage
			const pocketGroups =
				JSON.parse(localStorage.getItem("pocketGroup")) || [];

			// Find the group with the matching name
			const matchingGroup = pocketGroups.find(
				(group) => group[1] === setNoteValue
			);

			// Set the found group in state
			setNoteGroup(matchingGroup);
		}
	}, []);

	return (
		<div className={style.noteSection}>
			{!noteGroup ? (
				<>
					<img src={Img} alt="Pocket Notes" />
					<h2>Pocket Notes</h2>
					<p>
						Send and receive messages without keeping your phone online. Use
						Pocket Notes on up to 4 linked devices and 1 mobile phone
					</p>
				</>
			) : (
				<NoteSection noteGroup={noteGroup} />
			)}
		</div>
	);
};

export default NoteBox;
