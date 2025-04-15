// ************** 임시 비밀번호 발급 페이지 **************
import { Box, Center, Heading, Text } from '@chakra-ui/react';
import TempPasswordIssueForm from './TempPasswordForm';

const TempPasswordIssue = () => {
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
                    임시 비밀번호 발급
                </Heading>
                <Text textAlign='center' mb={10} className='form_description'>
                    가입한 사용자 이메일을 입력해주세요.
                </Text>
                {/* 클라이언트 컴포넌트 - 인터랙티브한 부분만 클라이언트에서 렌더링 */}
                <TempPasswordIssueForm />
            </Box>
        </Center>
    );
};
export default TempPasswordIssue;
