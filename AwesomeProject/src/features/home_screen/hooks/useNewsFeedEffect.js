import {getNewsFeed} from '../../../network/api';
import {getDataFromLocalStorage, localStorageKeys, storeDataLocally} from '../storage/LocalStorage';

const {useState, useCallback, useEffect, useRef} = require('react');

function useNewsFeedEffect() {
  const [newsData, setNewsData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [updateTimer, setUpdateTimer] = useState(0);
  const [pinnedItem, setPinnedItem] = useState(null);
  const newsDataRef = useRef([]);
  const pageNumber = useRef(1);
  const timer = useRef();
  const pageSize = 100;

  useEffect(() => {
    newsDataRef.current = newsData;
  });

  async function getDataFromApi(pageSize) {
    const data = await getDataFromLocalStorage(localStorageKeys.HOME_NEWS_FEED)
    if(Array.isArray(data)&&(pageNumber.current==1)){
        setApiData(()=>{
            return [...data]
        });
        setNewsDataFromApiDataOnFirstRender(data);
    }
    getNewsFeed(pageNumber.current, pageSize)
      .then(res => {
        storeDataLocally(localStorageKeys.HOME_NEWS_FEED, [...res.articles]);
        console.log("wfdwfdfdfdf",pageNumber.current)
        pageNumber.current++;
        setApiData(() => {
          return [...res.articles];
        });
        setNewsDataFromApiDataOnFirstRender(res.articles);
        setTimeout(() => {
          updateNewsFeedWithRandomisedNews();
        }, 0);
      })
      .catch(err => {});
  }

  function getRandomNewsIndices(maxLimit) {
    let randomNews = new Set();
    while (randomNews.size < Math.min(5, maxLimit)) {
      let randIndex = Math.floor(Math.random() * maxLimit);
      randomNews.add(randIndex);
    }
    return randomNews;
  }

  function updateNewsFeedWithRandomisedNews() {
    let newsPresentInApiDataButNotInNewsData = [];
    apiData.forEach(item => {
      let found = newsDataRef.current.find(element => {
        return element.title == item.title;
      });
      if (!found) {
        newsPresentInApiDataButNotInNewsData.push(item);
      }
    });
    let randomNewsIndices = getRandomNewsIndices(
      newsPresentInApiDataButNotInNewsData.length,
    );
    let randomNews = [];
    randomNewsIndices.forEach(item => {
      randomNews.push(newsPresentInApiDataButNotInNewsData[item]);
    });
    setNewsData(prev => {
      if (prev.length <= 10) {
        return [...randomNews, ...prev];
      } else {
        let sliced = prev.slice(5);
        return [...randomNews, ...sliced];
      }
    });
  }

  function updateTimerHandler() {
    // setUpdateTimer(prev => prev + 1);
  }

  useEffect(() => {
    timer.current = setInterval(() => {
      if (apiData.length > 0) {
        updateNewsFeedWithRandomisedNews();
      }
    }, 10000);
    return () => {
      console.log('clesafae');
      clearInterval(timer.current);
    };
  }, [apiData, updateTimer]);

  const deleteNewsFeedHandler = useCallback(
    item => {
      setNewsData(prev => {
        return prev.filter(currentItem => {
          return currentItem.title != item.title;
        });
      });

      setApiData(prev => {
        return prev.filter(currentItem => {
          return currentItem.title != item.title;
        });
      });
    },
    [apiData],
  );

  const pinNewsFeedHandler = useCallback(
    item => {
      setPinnedItem(item);
    },
    [apiData],
  );

  function getNewsNotPresentInNewsData(maxNews, apiData) {
    const newsNotPresentInNewsData = [];
    apiData.forEach(item => {
      if (newsNotPresentInNewsData.length < maxNews) {
        let found = newsDataRef.current.find(element => {
          return element.title == item.title;
        });
        if (!found) {
          newsNotPresentInNewsData.push(item);
        }
      }
    });
    return newsNotPresentInNewsData;
  }

  function setNewsDataFromApiDataOnFirstRender(apiData){
    let data = getNewsNotPresentInNewsData(10, apiData);
    setNewsData(() => {
      return [...data];
    });
  }

  function setNewsDataFromApiData(apiData) {
    let data = getNewsNotPresentInNewsData(10, apiData);

    setNewsData(prev => {
      return [...prev, ...data];
    });
  }

  useEffect(() => {
    getDataFromApi(pageSize);
  }, []);

  const setNewsFeedHandler = useCallback(() => {
    updateTimerHandler();
    if (apiData.length < (newsData.length+9)) {
      getDataFromApi(pageSize);
      setNewsData([]);
    } else {
      setNewsDataFromApiData(apiData);
    }
  }, [apiData, newsData]);

  return {
    newsData,
    setNewsFeedHandler,
    deleteNewsFeedHandler,
    pinNewsFeedHandler,
    pinnedItem,
  };
}

export {useNewsFeedEffect};
