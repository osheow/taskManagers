import { useEffect, useState } from "react";
import React from "react";
import Nav from "./Nav";
import Article from "./Article";
import ArticleEntry from "./ArticleEntry";
import { SignIn, SignOut, useAuthentication } from "../services/authService";
import { fetchArticles, createArticle } from "../services/articleService";
import "./App.css";
import Calendar from "react-calendar";
import WCalendar from "./weeklyCalendar";
import Anirec from "./aniRec.js";

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
    { id: 1, content: "Meet Masao for Udon" },
    { id: 2, content: "Fix up these horrible React notes" },
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
  function addArticle({ title, startTime, endTime }) {
    createArticle({ title, startTime, endTime }).then((event) => {
      setArticle(event);
      setArticles([event, ...event]);
      setWriting(false);
    });
  }

  return (
    <div className="App">
      <header>
        <div className="title">
          <h3 id="titleHead">Task Managers</h3>
        </div>
        {/*{user && <button onClick={() => setWriting(true)}>New Event</button>}*/}
        <div className="signIn">{!user ? <SignIn /> : <SignOut />}</div>
      </header>

      {!user ? (
        ""
      ) : (
        <img
          height="150"
          src="https://i.pinimg.com/564x/46/cd/20/46cd20a33efe24abce136ee09cea122a.jpg"
        ></img>
      )}
      {/*<Nav articles={articles} setArticle={setArticle} />*/}

      {!user ? (
        ""
      ) : writing ? (
        <ArticleEntry addArticle={addArticle} />
      ) : (
        <Article article={article} />
      )}

      <div id="container-left">
        <h3>Recommended Watchlist</h3>
        <Anirec />
      </div>
      <div id="container-right">
        <WCalendar />
      </div>
    </div>
  );
}
