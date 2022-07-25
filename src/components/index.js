import React, { useEffect, useState, useRef, Children } from 'react';

import Skeleton from './common/Skeleton';
import InfiniteScroll from './infinite-scroll';

import { getGiphy, getSearchGiphy } from './script';

import {
  RecentSearchesContainer,
  SearchedData,
  Container,
  SearchButton,
} from './style';

export default function SearchGiphy() {
  const [isPaused, setIsPaused] = useState({});
  const [loader, setLoader] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [inputText, setInputText] = useState('');

  const [page, setPage] = useState(0);
  const [recentSearched, setRecentSearched] = useState(
    localStorage.getItem('searched')
      ? JSON.parse(localStorage.getItem('searched'))
      : []
  );
  const [giphyData, setGiphyData] = useState([]);

  useEffect(() => {
    if (!inputText.trim()) {
      getGiphy().then((data) => setGiphyData(data));
    }
  }, []);

  const onSearch = (value) => {
    setIsSearching(true);
    if (!recentSearched.includes(value))
      setRecentSearched([...recentSearched, value]);
    setGiphyData([]);

    getSearchGiphy({ page, searchQuery: value }).then((data) => {
      setGiphyData(data);
      setIsSearching(false);
    });
  };
  useEffect(() => {
    if (recentSearched.length)
      localStorage.setItem('searched', JSON.stringify(recentSearched));
  }, [recentSearched]);

  useEffect(() => {
    if (inputText.trim()) {
      setLoader(true);
      getSearchGiphy({ page, searchQuery: inputText }).then((response) => {
        setGiphyData((prevData) => [...prevData, ...response]);
        setLoader(false);
      });
    }
  }, [page]);

  const fetchMore = () => {
    setPage((prevPageNum) => prevPageNum + 1);
  };
  return (
    <Container>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          placeholder="Search..."
          onChange={({ target: { value } }) => setInputText(value)}
          value={inputText}
        />
        <SearchButton
          onClick={() => {
            onSearch(inputText);
          }}
          disabled={!inputText.trim()}
        >
          search
        </SearchButton>
        {!!recentSearched.length && (
          <RecentSearchesContainer>
            <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
              Recent searched :-
            </span>
            <SearchedData>
              {Children.toArray(
                recentSearched.map((el) => (
                  <u
                    style={{
                      marginLeft: '5px',
                      marginRight: '5px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      onSearch(el);
                      setInputText(el);
                    }}
                  >
                    {el},
                  </u>
                ))
              )}
            </SearchedData>
          </RecentSearchesContainer>
        )}
      </div>
      {isSearching && <Skeleton columnNumber={20} />}

      {!!giphyData.length && !isSearching && (
        <InfiniteScroll
          data={giphyData}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          fetchMore={fetchMore}
          loader={loader}
        />
      )}
    </Container>
  );
}
