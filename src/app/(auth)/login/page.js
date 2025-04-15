// ************** 로그인 페이지 **************
import { Box, Center, Heading, Text } from '@chakra-ui/react';
import LoginForm from './LoginForm';

export default function LoginPage() {
    return (
        <Center
            minH='100vh'
            bg='var(--clr-light-blue)'
            alignItems='flex-start'
            pt='10rem'
        >
            <Box w='100%' maxW='550px' p={8}>
                <Heading
                    as='h1'
                    textAlign='center'
                    mb={6}
                    fontSize={30}
                    fontWeight={600}
                    fontFamily='var(--ff-style)'
                    className='form_title'
                >
                    로그인
                </Heading>

                <Text textAlign='center' mb={10} className='form_description'>
                    로그인하고 더 편리하게 마스크하세오
                </Text>

                {/* 클라이언트 컴포넌트 - 인터랙티브한 부분만 클라이언트에서 렌더링 */}
                <LoginForm />
                {/* ---- 스크롤을 위한 강제 높이 100px 추가 ---- */}
                <Box h='6.25rem'></Box>
            </Box>
        </Center>
    );
}
