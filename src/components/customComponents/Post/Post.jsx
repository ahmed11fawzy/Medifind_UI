import styles from "./Post.module.css";
import { useFetch } from "../../../customHooks/useFetch";
import { SlideDown } from "../SlideDown/SlideDown";
import { useEffect } from "react";

export function Post({page, getTotalPage, searchQuery}) {
    const apiUrl = searchQuery 
        ? `http://localhost:7777/search?query=${searchQuery}&page=${page}&limit=6`
        : `http://localhost:7777/acceptedMedicine?page=${page}&limit=6`;

    const { data, totalPage, isLoading, serverError } = useFetch(apiUrl);
    
    useEffect(() => {
        // For search results, if no data or empty array, set total pages to current page
        if (searchQuery) {
            if (!data || data.length === 0) {
                getTotalPage(page);
            } else {
                getTotalPage(Math.ceil(data.length / 6)); // 6 is the limit per page
            }
        } else if (totalPage) {
            getTotalPage(totalPage);
        }
    }, [data, totalPage, getTotalPage, searchQuery, page]);

    if (isLoading) return <div className="text-center py-4">Loading...</div>;
    if (serverError) return <div className="text-center py-4 text-danger">Error loading medicines</div>;
    if (!data || data.length === 0) return <div className="text-center py-4">No medicines found</div>;

    // For search results, slice the data to show only current page items
    const currentPageData = searchQuery
        ? data.slice((page - 1) * 6, page * 6)
        : data;

    return (
        <div className="row gy-5">
            {currentPageData.map((Medicine) => (
                <div className="col-12 col-md-4" key={Medicine.id}>
                    <div className={styles.post}>
                        <SlideDown Medicine={Medicine} />
                    </div>
                </div>
            ))}
        </div>
    );
}