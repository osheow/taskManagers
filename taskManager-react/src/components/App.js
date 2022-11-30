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
  /*
  const [todos, setTodos] = useState([
    {id: 1, content: 'Meet Masao for Udon'},
    {id: 2, content: 'Fix up these horrible React notes'},
  ]);
  */


  // This is a trivial app, so just fetch all the articles only when
  // a user logs in. A real app would do pagination. Note that
  // "fetchArticles" is what gets the articles from the service and
  // then "setArticles" writes them into the React state.
  useEffect(() => {
    if (user) {
      fetchArticles().then(setArticles);
    }
  }, [user]);

  

  // Update the "database" *then* update the internal React state. These
  // two steps are definitely necessary.
  function addArticle({ id, text, start, end }) {
    createArticle({ id, text, start, end }).then((event) => {
      setArticle(event);
      setArticles([event, ...event]);
      setWriting(false);
    });
  }

  return (
    <div className="App">
      <header>
        Task Managers
        {user && <button onClick={() => setWriting(true)}>New Event</button>}
        {!user ? <SignIn /> : <SignOut />}
      </header>

      {/*{!user ? "" : <Nav articles={articles} setArticle={setArticle} />}

      {!user ? (
        ""
      ) : writing ? (
        <ArticleEntry addArticle={addArticle} />
      ) : (
        <Article article={article} />
      )}*/}
      <div id="container-left">
        <h3>Recommended Watchlist</h3>
      </div>
      <div id="container-right">
        <WCalendar />
      </div>
    </div>
  );
}
