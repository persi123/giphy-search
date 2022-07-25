import { Children, useRef, useState, useEffect, useId } from 'react';

import PlayIcon from '../assets/play.png';
import PauseIcon from '../assets/pause.png';

import {
  CardContainer,
  MainComponent,
  Previewer,
  EmptyPreviwer,
} from './style';

// TODO: handle unnecessary re-render
const InfiniteScroll = ({
  data = [],
  fetchMore,
  isPaused,
  setIsPaused,
  loader,
}) => {
  const [thirdLastEl, setThirdLastEl] = useState(null);
  const [visitedEl, setVisitedEl] = useState([]);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const el = entries[0];
      if (el.isIntersecting) {
        const { item } = el.target.dataset;
        if (visitedEl.includes(item)) {
          return false;
        }
        fetchMore();
        if (item) {
          setVisitedEl((prevVisitedEl) => [...prevVisitedEl, item]);
        }
      }
    })
  );
  const totalDataLength = data.length;

  useEffect(() => {
    const currentEl = thirdLastEl;

    const currentObserver = observer.current;

    if (currentEl) {
      currentObserver?.observe(currentEl);
    }
    return () => {
      // to clear
      if (currentEl) {
        currentObserver?.unobserve(currentEl);
      }
    };
  }, [thirdLastEl]);

  return (
    <>
      <MainComponent>
        {Children.toArray(
          data.map((el, i) => {
            // Working for horizontal also, (Checked)
            const thirdLastItem = totalDataLength - 7 === i;
            const imageUrl =
              isPaused[el.id] === 'paused'
                ? el.images['480w_still'].url
                : el.images.original.url;
            return (
              <CardContainer
                index={i}
                ref={thirdLastItem ? setThirdLastEl : null}
                data-item={el.id}
              >
                {el.title && <h4>{el.title}</h4>}
                {loader ? (
                  <EmptyPreviwer />
                ) : (
                  <Previewer>
                    <img src={imageUrl} />
                    <button
                      onClick={() =>
                        setIsPaused({
                          ...isPaused,
                          [el.id]:
                            isPaused[el.id] && isPaused[el.id] === 'paused'
                              ? 'running'
                              : 'paused',
                        })
                      }
                    >
                      {Object.keys(isPaused).length &&
                      isPaused[el.id] === 'paused' ? (
                        <img src={PlayIcon} />
                      ) : (
                        <img src={PauseIcon} />
                      )}
                    </button>
                  </Previewer>
                )}
              </CardContainer>
            );
          })
        )}
      </MainComponent>
      {loader && (
        <img
          src="https://res.cloudinary.com/prashantimages/image/upload/v1658761515/22_az4umu.gif"
          alt="spinner"
        />
      )}
    </>
  );
};

export default InfiniteScroll;
