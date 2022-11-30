import { useEffect, useState } from "react";
import Nav from "./Nav";
import Article from "./Article";
import ArticleEntry from "./ArticleEntry";
import { SignIn, SignOut, useAuthentication } from "../services/authService";
import { fetchArticles, createArticle } from "../services/articleService";
import "./App.css";
import Calendar from "react-calendar";
import WCalendar from "./weeklyCalendar";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [event, setEvent] = useState([]);
  const [information, setInformation] = useState([]);
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [writing, setWriting] = useState(false);
  const user = useAuthentication();

  return (
    <div className="App">
      <header>
        Task Managers
        {user && <button onClick={() => setWriting(true)}>New Event</button>}
        {!user ? <SignIn /> : <SignOut />}
      </header>
      <div id="container-left">
        <h3>Recommended Watchlist</h3>
      </div>
      <div id="container-right">
        <WCalendar />
      </div>
    </div>
  );
}
