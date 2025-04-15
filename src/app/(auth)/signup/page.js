// ************** 회원가입 페이지 **************
import { Box, Heading, Center } from '@chakra-ui/react';
import SignUpForm from './SignUpForm';

export default function SignUpPage() {
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
                    fontFamily={'Pretendard'}
                    className='form_title'
                >
                    회원가입
                </Heading>

                {/* 클라이언트 컴포넌트 - 인터랙티브한 폼 부분 */}
                <SignUpForm />
                {/* ---- 스크롤을 위한 강제 높이 100px 추가 ---- */}
                <Box h='6.25rem'></Box>
            </Box>
        </Center>
    );
}
