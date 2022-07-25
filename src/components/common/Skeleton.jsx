import React from 'react';

import { SkeletonContainer, SkeletonDiv } from './skeleton.style';

const getArray = (number) => new Array(number).fill(1);

const Skeleton = ({ columnNumber = 10 }) => {
  return (
    <SkeletonContainer>
      {getArray(columnNumber).map((_, index) => (
        <SkeletonDiv key={index} />
      ))}
    </SkeletonContainer>
  );
};

export default Skeleton;
