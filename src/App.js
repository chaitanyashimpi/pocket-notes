import "./App.css";
import NoteBox from "./components/NoteBox/NoteBox";
import Pocket from "./components/Pocket/Pocket";

function App() {
	return (
		<div className="pocketNotes">
			<Pocket />
			<NoteBox />
		</div>
	);
}

export default App;
