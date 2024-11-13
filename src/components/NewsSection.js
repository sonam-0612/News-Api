import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsSecction.css'; // Ensure to include the CSS file for styling

const NewsSection = () => {
    const [news, setNews] = useState([]);
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const customHeadings = [
        "Breaking News: Major Event in Amritsar",
        "Local Hero Saves the Day!",
        "New Developments in Amritsar's Economy",
        "Cultural Fest: Celebrating Tradition",
        "Amritsar's Food Scene: A Culinary Journey"
    ];

    const fetchNews = async () => {
        try {
            const response = await axios.get(
                'https://newsapi.org/v2/everything?q=Amritsar&apiKey=16de15dc111f40b099d5c58d8cf41668'
            );
            setNews(response.data.articles);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch news');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();

        const interval = setInterval(() => {
            setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % (news.length || customHeadings.length));
        }, 3000);

        return () => clearInterval(interval);
    }, [news.length]);

    if (loading) {
        return <div className="spinner"></div>;
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                {error} <button onClick={fetchNews}>Retry</button>
            </div>
        );
    }

    const uniqueValidNews = Array.from(new Set(news.filter(item => item?.urlToImage && item?.title)));

    return (
        <div className="news-section">
            <div className="news-container">

                {Array.from({ length: 3 }).map((_, index) => {
                    let newsIndex = (currentNewsIndex + index) % uniqueValidNews.length;

                    return (
                        <div className="news-card" key={index}>
                            <img
                                src={uniqueValidNews[newsIndex].urlToImage}
                                alt={uniqueValidNews[newsIndex].title}
                                className="news-image"
                            />
                            <div className="headline">
                                {uniqueValidNews[newsIndex].title}
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default NewsSection;



