import {
  Box,
  Button,
  CardBody,
  Input,
  Text,
  FormControl,
  Icon,
  InputGroup,
} from '@chakra-ui/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Sign from '../component/Sign.jsx';
import { setCookie } from '../api/cookie.js';

function Login({ setIsLogin }) {
  const [showPW, setShowPW] = React.useState(false); // 비밀번호 보여주기 여부
  const navigate = useNavigate();
  const inputStyle = {
    borderBottom: '1px solid black',
    borderTop: 'none',
    borderRight: 'none',
    borderLeft: 'none',
    borderRadius: '0px',
  };
  const buttonColor = {
    backgroundColor: '#3182CE',
    color: '#ffff',
  };

  const groupStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }; // text와 inputgroup을 감싸는 박스의 스타일
  const TextStyle = {
    fontSize: 'xl',
    fontWeight: '500',
    mr: '10px',
  }; // email, password등의 text 스타일

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  }; // input 그룹과 formhelpertext를 그룹으로 묶는 스타일
  const swalFire = {
    width: 400,
    height: 260,
    showConfirmButton: false,
    cancelButtonText: '확인',
    cancelButtonColor: '#CF5E53',
    showCancelButton: true,
    timer: 3000,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    await axios
      .post('/auth/login', loginData)
      .then((res) => {
        setCookie(res.data.data.token);
        axios.defaults.headers.common.Authorization = `${res.data.data.token}`;
        setIsLogin(true);
        Swal.fire({ ...swalFire, html: '로그인 성공' });
        navigate('/');
      })
      .catch(() => {
        Swal.fire({
          ...swalFire,
          html: '잘못된 정보입니다',
        });
      });
  }; // 로그인 submit 시 백엔드한테 post

  return (
    <Sign page="login">
      <CardBody
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="1.25rem"
        boxShadow="10px 10px 30px #c2c2c2"
      >
        <form onSubmit={handleSubmit}>
          <Box
            w="xl"
            h="sm"
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
          >
            <FormControl
              w="xl"
              h="15rem"
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
            >
              <Box sx={groupStyle}>
                <Text sx={TextStyle}>Email</Text>
                <Box sx={inputGroupStyle}>
                  <Input
                    name="email"
                    w="28.125rem"
                    placeholder="이메일을 입력해주세요"
                    sx={inputStyle}
                    _focusVisible={{ borderColor: 'black' }}
                    _hover={{ borderColor: 'black' }}
                  />
                </Box>
              </Box>
              <Box sx={groupStyle}>
                <Text sx={TextStyle}>Password</Text>
                <Box sx={inputGroupStyle}>
                  <InputGroup w="450px">
                    <Input
                      name="password"
                      w="28.125rem"
                      placeholder="비밀번호를 입력해주세요"
                      sx={inputStyle}
                      type={showPW ? 'text' : 'password'}
                      _focusVisible={{ borderColor: 'black' }}
                      _hover={{ borderColor: 'black' }}
                    />
                    <Icon
                      w="30px"
                      h="30px"
                      mt="12px"
                      as={showPW ? ViewIcon : ViewOffIcon}
                      onClick={() => {
                        setShowPW(!showPW);
                      }}
                    />
                  </InputGroup>
                </Box>
              </Box>
            </FormControl>
            <Button
              _hover={{ backgroundColor: '#3182CE', opacity: '0.8' }}
              mb="1.25rem"
              type="submit"
              id="submit"
              sx={buttonColor}
            >
              Login
            </Button>
          </Box>
        </form>
      </CardBody>
    </Sign>
  );
}

export default Login;
