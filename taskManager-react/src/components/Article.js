export default function Article({ article }) {
  return (
    <article>
      {!article ? (
        <div>
          <h5>How to create an event: </h5>
          <p>
            1. Set your event time by dragging on the calendar <br></br>2. Name
            your event in the pop-up box
          </p>
        </div>
      ) : (
        <section>
          <h2>{article.title}</h2>
          <p className="date">{`Posted: ${article.date}`}</p>
          <p className="body">{article.body}</p>
        </section>
      )}
    </article>
  );
}
