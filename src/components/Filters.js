import Button from "./Button";

export default function Filters(props) {

    const {onNewList, tags, currentFilter, onFilterChange} = props

    const handleFilterChange = (e) => onFilterChange(Number(e.target.value))

    return (
        <div className="flex gap-2 items-center px-4 pb-4">
            <Button onClick={onNewList}>New list</Button>
            <input type="search" className="px-4 py-2 rounded-lg border" placeholder="Search tasks..." />

            <div className="ml-auto flex gap-2 items-center">
                <label className="sr-only font-medium">Filter by</label>
                <select
                    className="border rounded-lg px-3 py-2"
                    onChange={handleFilterChange}
                    value={currentFilter}
                >
                    <option value={0}>Filter by (none)</option>
                    {tags.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
                </select>

                <label className="sr-only font-medium">Sort by</label>
                <select className="border rounded-lg px-3 py-2">
                    <option>Sort by (none)</option>
                    <option>Lol</option>
                </select>
            </div>
        </div>
    )
}