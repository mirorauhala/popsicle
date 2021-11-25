import {useState, useEffect} from 'react';

export default function useFetchLists() {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3010/lists')
            .then(res => res.json())
            .then(data => setLists(data));
    }, []);

    return [lists, setLists];
}
