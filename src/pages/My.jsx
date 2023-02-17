import * as React from 'react';
import {
  Box,
  Flex,
  Text,
  StackDivider,
  VStack,
  Icon,
  Button,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import Information from '../component/Information';
import Board from '../component/Board';
import { editMode } from '../helper/types';
import BoardApi from '../api/portfolio';

function My() {
  const [edit, setEdit] = useState(editMode.unEdit);
  const [myList,setList]=useState([]);

  const fetchMyBoardList = async () => {
    const res = await BoardApi.getMyBoardList();
    res ? setList(res) : console.log(res);
}
  useEffect(()=>{fetchMyBoardList()},[]);

  const style= edit
    ?{
      animation:'shakingBoard 1s infinite',
      color:'grey',
      backgroundColor:'rgba(0, 0, 0, 0.01)',
    } 
    :{}
 
  return (
    <Box w="60%" m="auto" mt="20" mb="5">
      <Flex>
        <Information />
        <Box>
          <Box ml="10">
            <VStack
              divider={<StackDivider border="solid 1px grey" />}
              spacing={4}
              w="fit-content"
              align="stretch"
            >
              <Box display="flex">
                <Text fontSize="4xl" as="b">
                  My Portfolio
                </Text>
                {edit ? (
                  <Button
                    mt="auto"
                    ml="auto"
                    onClick={() => setEdit(editMode.unEdit)}
                  >
                    선택 취소
                  </Button>
                ) : (
                  <Box mt="auto" ml="auto">
                    <Button
                      colorScheme="black"
                      variant="ghost"
                      onClick={() => setEdit(editMode.modify)}
                    >
                      <Icon w="7" h="7" ml="auto" as={EditIcon} />
                    </Button>
                    <Button
                      colorScheme="black"
                      variant="ghost"
                      onClick={() => setEdit(editMode.delete)}
                    >
                      <Icon w="7" h="7" as={DeleteIcon} />
                    </Button>
                  </Box>
                )}
              </Box>
              <Flex mx={3} justifyContent="space-around" wrap="wrap">
                {myList.map((list) => (
                  <div style={style} key={`mypage__board-${list.id}`}>
                    <Board edit={edit} board={list}/>
                  </div>
                ))}
              </Flex>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default My;
