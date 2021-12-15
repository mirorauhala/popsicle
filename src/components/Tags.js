import Tag from "./Tag";

export default function Tags({ tags }) {
  return (
    <div className="flex flex-wrap gap-1 empty:hidden mt-2">
      {tags && tags.map((tag) => <Tag key={`tag-${tag.id}`} tag={tag} />)}

      <button className="py-1 rounded text-gray-500 text-sm font-medium">
        Add tag
      </button>
    </div>
  );
}
