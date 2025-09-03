import "./About.css";
import author from "../../assets/images/author.jpg";

function About() {
  return (
    <section className="about">
      <div className="about__wrapper">
        <div className="about__author-wrapper">
          <img
            src={author}
            alt="author portrait"
            className="about__author-image"
          />
        </div>
        <div className="about__author">
          <h2 className="about__author-title">About the author</h2>
          <p className="about__author-paragraph">
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
          </p>
          <p className="about__author-paragraph2">
            You can also talk about your experience with TripleTen, what you
            learned there, and how you can help potential customers.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
