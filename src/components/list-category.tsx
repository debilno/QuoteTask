import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { Tag } from "../common/types";
import "../styles/components/list-category.css"

interface ListCategoryProps {
  tags: Tag[]
}

function formatQuoteCount(count: number) {
  if (count > 1000) {
    return (count / 1000).toFixed(1) + "k";
  }
  return count.toString();
}


function ListCategory(props: ListCategoryProps ) {

  return (
    <ListGroup className = "list-wrapper">
      {props.tags
        .filter(
          (tag, index, array) =>
            array.findIndex((t) => t.name === tag.name) === index &&
            tag.quoteCount > 0
        )
        .map((tag) => (
          <a href={`/categories/${tag.name}`} key={tag._id}>
            <ListGroup.Item
              className = "d-flex justify-content-center align-items-end my-0.5 "
            >
              <div className = "ms-2 me-auto">
                <div className = "fw-bold">{tag.name}</div>
              </div>
              <Badge bg = "primary" pill>
              {formatQuoteCount(tag.quoteCount)}
              </Badge>
            </ListGroup.Item>
          </a>
        ))}
    </ListGroup>
  );
}
export default ListCategory;
