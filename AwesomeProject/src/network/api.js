const { NEWS_FEED_API_ENDPOINT, NEWS_FEED_API_KEY } = require("../../env/env");

export function getNewsFeed(pageNumber,pageSize){
    return fetch(`${NEWS_FEED_API_ENDPOINT}?pageSize=${pageSize}&page${pageNumber}&sources=bbc-news&apiKey=${NEWS_FEED_API_KEY}`)
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}