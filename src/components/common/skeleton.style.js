import styled from 'styled-components';

export const SkeletonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

export const SkeletonDiv = styled.div`
  height: 200px;
  width: 200px;
  background: rgba(0, 0, 0, 0.1);
`;
