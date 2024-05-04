import ListCategory from "../components/list-category";
import { observer } from "mobx-react";
import { useQuotableStore } from "../stores/store";
import { QUOTABLE_API_SERVICE } from "../services/quotable-api";
import { useEffect } from "react";

const Categories = observer(() => {
  const { tags, setTags } = useQuotableStore();

  const getTags = async () => {
    const tags = await QUOTABLE_API_SERVICE.getTags();
    setTags(tags);
  };

  useEffect(() => {
    if (tags.length === 0) {
      getTags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="page">
      <h2 className="title-1">All categories</h2>

      <ListCategory tags={tags} />
    </main>
  );
});

export default Categories;
