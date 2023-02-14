import * as React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import Board from '../component/Board';

function Main( { title, list }) {
 
  return  <Box maxW='1500px' mx='auto' my='10'>
        <Text fontSize='4xl' as='b' mx='10'> {title} 모아보기 </Text>
        <Flex  justifyContent="space-around" wrap="wrap">
        {list.map((index) => (
          <div  key={`mainpage__board-${index}`}>
            <Board />
          </div>
        ))}
  </Flex>
</Box>
}
Main.defaultProps = {
  title: '최신 프로젝트',
  list: [1,2,3]
};
export default Main;
