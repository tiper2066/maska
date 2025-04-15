// ************** 문의하기 페이지 **************
import { Center, Box, Heading, Text } from '@chakra-ui/react';

import ContactForm from './ContactForm';

export default function Contact() {
    return (
        <Center
            minH='100vh'
            bg='var(--clr-light-blue)'
            alignItems='flex-start'
            pt='10rem'
            height='calc(100vh - 12.5rem)'
            overflowY='auto' // 세로 스크롤 활성화
        >
            <Box
                w='100%'
                maxW='550px'
                p={8}
                style={{ padding: '1.7rem 0 4rem 0' }}
            >
                <Heading
                    as='h1'
                    textAlign='center'
                    mb={6}
                    fontSize={30}
                    fontWeight={600}
                    fontFamily='var(--ff-style)'
                    className='form_title'
                >
                    문의하기
                </Heading>

                <Text textAlign='center' mb={10} className='form_description'>
                    언제든지 귀하의 문의에 귀 기울이고 답변 드리겠습니다.
                </Text>

                <ContactForm />
                {/* ---- 스크롤을 위한 강제 높이 100px 추가 ---- */}
                <Box h='6.25rem'></Box>
            </Box>
        </Center>
    );
}
