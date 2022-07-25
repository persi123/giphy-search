import styled, { keyframes } from 'styled-components';

const animaition = keyframes`{
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 100%;
    }
  }`;

export const Container = styled.div`
  input[type='text'] {
    width: 200px;
    border: 2px solid #aaa;
    border-radius: 4px;
    margin: 8px 0;
    outline: none;
    padding: 8px;
    box-sizing: border-box;
    transition: 0.3s;
  }
`;

export const SearchButton = styled.button`
  border: 1px solid #aaa;
  background: #aaa;
  color: #fff;
  width: 100px;
  height: 34px;
  border-radius: 4px;
  margin-left: 10px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const EmptyPreviwer = styled.div`
  width: 200px;
  height: 200px;
`;

export const Previewer = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
  position: relative;

  button {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;

    background: none;
    border: none;
    outline: none;

    img {
      width: 44px;
      height: 44px;

      background: rgba(255, 255, 255, 0.4);
    }
  }

  &:hover {
    background: rgba(0, 0, 0, 1);
  }

  &:hover button {
    display: inline-block;
  }
`;

export const MainComponent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

export const CardContainer = styled.div`
  border: 0.1px solid #d8d8d8;
  width: 200px;
  height: auto;
  border-radius: 5px;
  box-shadow: 2px 3px 5px -4px rgba(168, 151, 151, 0.75);
  margin: 20px;
  padding: 10px;
  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
`;

export const InFiniteContainer = styled.div`
  max-width: 500px;
  overflow-y: auto;
  display: flex;
`;

export const RecentSearchesContainer = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const SearchedData = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  /* @media (max-width: 900px) {
    flex-wrap: wrap;
    justify-content: center;
  } */
`;
