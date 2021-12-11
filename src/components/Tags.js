import Tag from "./Tag";

export default function Tags({ tags }) {
  return (
    <div className="flex flex-wrap gap-2 empty:hidden mt-2">
      {tags && tags.map((tag) => <Tag key={`tag-${tag.id}`} tag={tag} />)}
    </div>
  );
}
