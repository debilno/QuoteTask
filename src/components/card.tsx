import "../styles/components/card.css";
import { Quote } from "../common/types";


const Card = (props: Quote) => {
  return (
    <div className = "centered-card">
      <a style = {{ color: "inherit" }} href = {`categories/${props.tags[0]}`}>
        <div className = "card-container">
          <div className = "card">
            <div className  =  "card-body">
              <p className = "card-text">{props.content}</p>
                <footer className = "blockquote-footer">
                  <cite className = "author" title = "Source Title">
                    {props.author}
                  </cite>
                </footer>
                <div className = "card-tag">
                {props.tags}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
