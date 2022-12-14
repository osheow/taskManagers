import { useState } from "react";
import TimePicker from "react-dropdown-timepicker";

export default function ArticleEntry({ addArticle }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  function submit(e) {
    setError(null);
    e.preventDefault();
    if (!title.trim() || !startTime.trim() || !endTime.trim()) {
      setError("Both the title and body must be supplied");
    } else {
      addArticle({ title, startTime, endTime });
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        {error && <p className="error">{error}</p>}
        Name of event
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        Start time
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        End time
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        {/*<textarea
          rows="8"
          value={body}
          onChange={(e) => setBody(e.target.value)}
  ></textarea>*/}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
