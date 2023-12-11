import { useState } from "react";
import "./App.css";
import NoteBox from "./components/NoteBox/NoteBox";
import Pocket from "./components/Pocket/Pocket";

function App() {

	const [selected, setSelected] = useState("");

	const getSelected = (selected) => {
		setSelected(selected)
	}


	return (
		<div className="pocketNotes">
			<Pocket onSubmitApp={getSelected}/>
			<NoteBox selected={selected}/>
		</div>
	);
}

export default App;
