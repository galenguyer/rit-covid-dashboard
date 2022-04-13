import { useEffect, useState } from "react";

export default function useFetch(url, options) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url, options)
            .then((resp) => resp.json())
            .then((resp) => setData(resp))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    return { data, loading, error };
}
