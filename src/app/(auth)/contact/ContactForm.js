// ************ 문의하기를 위한 폼 ************
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    VStack,
    HStack,
    Input,
    Button,
    Text,
    Textarea,
    FormControl,
    FormLabel,
    Menu,
    MenuList,
    MenuButton,
    MenuItem,
    Box,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const ContactForm = () => {
    const router = useRouter();
    const options = ['일반 문의', '기술 문의', '결제 문의'];
    const [selected, setSelected] = useState(''); // 문의 유형 항목 상태 변수

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('/');
        // console.log('문의가 등록되었습니다.');
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
                {/* 문의 유형 */}
                <FormControl isRequired>
                    {/* <FormLabel>문의 유형</FormLabel> */}
                    {/* isRequired 대체 요소 */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '-0.3rem',
                            left: '-0.5rem',
                            color: 'var(--clr-red)',
                        }}
                    >
                        *
                    </Box>
                    <Menu matchWidth>
                        <MenuButton
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                            size='lg'
                            width='100%'
                            textAlign='left'
                            color={selected ? 'var(--clr-primary)' : '#9da4c0'}
                            fontWeight={
                                selected ? 'var(--fw-500)' : 'var(--fw-400)'
                            }
                            bg='white'
                            border='0.063rem solid'
                            borderColor='var(--clr-label-blue)'
                            _hover={{
                                bg: 'white',
                                borderColor: 'var(--clr-primary)',
                            }}
                            _active={{
                                bg: 'white',
                                borderColor: 'var(--clr-primary)',
                            }}
                        >
                            {selected || '문의 유형'}
                        </MenuButton>
                        <MenuList width='100%' size='lg'>
                            {options.map((option) => (
                                <MenuItem
                                    key={option}
                                    onClick={() => setSelected(option)}
                                    fontSize='var(--fs-18)'
                                >
                                    {option}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                </FormControl>

                {/* 성함, 이메일을 한줄로 배치하는 컨테이너  */}
                <HStack spacing={4} align='flex-start' w='100%'>
                    {/* 성함 */}
                    <FormControl isRequired>
                        {/* <FormLabel>성함</FormLabel> */}
                        {/* isRequired 대체 요소 */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '-0.3rem',
                                left: '-0.5rem',
                                color: 'var(--clr-red)',
                            }}
                        >
                            *
                        </Box>
                        <Input
                            placeholder='성함'
                            size='lg'
                            focusBorderColor='blue.500'
                        />
                    </FormControl>

                    {/* 이메일 */}
                    <FormControl isRequired>
                        {/* <FormLabel>이메일</FormLabel> */}
                        {/* isRequired 대체 요소 */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '-0.3rem',
                                left: '-0.5rem',
                                color: 'var(--clr-red)',
                            }}
                        >
                            *
                        </Box>
                        <Input
                            type='email'
                            placeholder='이메일'
                            size='lg'
                            focusBorderColor='blue.500'
                        />
                    </FormControl>
                </HStack>

                {/* 제목 */}
                <FormControl isRequired>
                    {/* <FormLabel>제목</FormLabel> */}
                    {/* isRequired 대체 요소 */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '-0.3rem',
                            left: '-0.5rem',
                            color: 'var(--clr-red)',
                        }}
                    >
                        *
                    </Box>
                    <Input
                        placeholder='제목'
                        size='lg'
                        focusBorderColor='blue.500'
                    />
                </FormControl>

                {/* 내용 */}
                <FormControl isRequired>
                    {/* <FormLabel>내용</FormLabel> */}
                    {/* isRequired 대체 요소 */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '-0.3rem',
                            left: '-0.5rem',
                            color: 'var(--clr-red)',
                        }}
                    >
                        *
                    </Box>
                    <Textarea
                        placeholder='내용'
                        resize='vertical'
                        // minH='150px'
                        row={3}
                        borderRadius='1.563rem'
                        backgroundColor='var(--clr-white)'
                    />
                </FormControl>

                {/* 파일 첨부 */}
                <FormControl
                    w='full'
                    h='12.5rem'
                    border='1px solid var(--clr-label-blue)'
                    borderRadius='1.563rem'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    position='relative'
                    backgroundColor='var(--clr-white)'
                >
                    <FormLabel
                        position='absolute'
                        top='1.25rem'
                        left='1.875rem'
                        fontSize='var(--fs-18)'
                        fontWeight='var(--fw-400)'
                        color='#9BA4C3'
                    >
                        첨부 파일
                    </FormLabel>
                    <Button
                        mt={6}
                        colorScheme='blue'
                        className='btn_round btn_md'
                        _active={{
                            bg: 'var(--clr-primary)', // 누른 상태 배경색
                            color: 'whiteAlpha.900', // 누른 상태 텍스트 색상
                        }}
                        _hover={{
                            bg: 'var(--clr-primary)',
                            color: 'whiteAlpha.900',
                        }}
                        onClick={() =>
                            document.getElementById('file-input').click()
                        }
                    >
                        파일 선택
                    </Button>
                    <Text
                        fontSize='var(--fs-20)'
                        fontWeight='var(--fw-200)'
                        marginTop='1.25rem'
                    >
                        또는
                    </Text>
                    <Text fontSize='var(--fs-20)' fontWeight='var(--fw-500)'>
                        해당 영역으로 드래그
                    </Text>
                    <Input type='file' display='none' id='file-input' />
                </FormControl>

                {/* 버튼 그룹 */}
                <HStack spacing={4} mt={4} w='full' justify='center'>
                    {/* <Link href='' className='btn_round btn_xl full_width'>
                        보내기
                    </Link> */}
                    <Button
                        type='submit'
                        colorScheme='blue'
                        className='btn_round btn_xl full_width'
                        _active={{
                            bg: 'var(--clr-primary)', // 누른 상태 배경색
                            color: 'whiteAlpha.900', // 누른 상태 텍스트 색상
                        }}
                        _hover={{
                            bg: 'var(--clr-primary)',
                            color: 'whiteAlpha.900',
                        }}
                    >
                        보내기
                    </Button>
                </HStack>
            </VStack>
        </form>
    );
};
export default ContactForm;
