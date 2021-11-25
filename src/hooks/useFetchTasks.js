import {useState, useEffect} from 'react';

export default function useFetchTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3010/tasks')
            .then(res => res.json())
            .then(data => setTasks(data));
    }, []);

    return [tasks, setTasks];
}
