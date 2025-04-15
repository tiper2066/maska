// ************ 임시 비밀번호 발급을 위한 폼 ************
'use client';
import { useRef, useState } from 'react';
import {
    VStack,
    Input,
    Button,
    FormControl,
    FormErrorMessage,
    Box,
} from '@chakra-ui/react';

import AuthData from '@/data/AuthData'; // AuthData 가져옴
import ModalComponent from '@/components/common/ModalComponent';

const TempPasswordIssueForm = () => {
    const { authEmail, authUnsubscribing } = AuthData;
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isModalOpenSuccess, setIsModalOpenSuccess] = useState(false); // 이메일 발송 성공 모달 오픈 여부
    const btnTempPwIssue = useRef(); // 임시 비밀번호 발송 버튼 참조

    // 모달 창 열기 이벤트 핸들러
    const handleModalOpen = (currentModal) => {
        if (currentModal === 'successModal') {
            setIsModalOpenSuccess(true); // 이메일 발송 성공 모달 오픈
        } else {
            return;
        }
    };

    // 모달 창 닫기 이벤트 핸들러 (모든 모달을 닫는다.)
    const handleModalClose = () => {
        setIsModalOpenSuccess(false);
    };

    // 이메일 1차 발송 클릭 이벤트 핸들러
    const handleSuccessEmail = () => {
        // console.log('이메일 발송에 성공함');
        if (btnTempPwIssue.current.innerText === '임시 비밀번호 발송') {
            btnTempPwIssue.current.innerText = '임시 비밀번호 재발송';
        } else {
            btnTempPwIssue.current.disabled = true; // 버튼 비활성화
        }

        setIsModalOpenSuccess(false); // 모달 창 닫기
    };

    // 이메일 발송 성공 모달 창 옵션 설정
    const modalOptionSuccess = {
        title: '이메일로 임시 비밀번호를 발송했습니다.',
        description: '임시 비밀번호는 48시간 후에 만료됩니다.',
        btnLabelNagative: '',
        btnLabelPositive: '확인',
    };

    // 이메일 유효성 검사
    const validateEmail = (email) => {
        if (!email.trim()) {
            return '이메일을 입력해주세요.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.length > 320 || /\s/.test(email) || !emailRegex.test(email)) {
            return '이메일 형식(user@email.com)으로 입력해주세요.';
        }
        if (email === authUnsubscribing) {
            return '최근에 탈퇴한 이메일입니다.';
        }
        if (email !== authEmail) {
            return '등록되지 않은 이메일입니다.';
        }
        return '';
    };

    // 임시 비밀번호 발송 버튼  클릭 이벤트 함수
    const handleTempPWIssue = () => {
        const emailValidation = validateEmail(email);
        console.log('emailValidation: ', emailValidation);
        setEmailError(emailValidation);

        if (!emailValidation) {
            // router.push('/main-member');
            console.log('비밀번호 발송 완료 - 유효성 검사 통과');
            handleModalOpen('successModal');
        } else {
            console.log(
                '비밀번호 발송 실패 - 유효성 검사 오류:',
                emailValidation
            );
        }
    };

    return (
        <>
            <VStack spacing={6} align='stretch'>
                <FormControl isInvalid={emailError}>
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
                        placeholder='이메일(user@email.com)'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size='lg'
                        focusBorderColor='blue.500'
                        // 자동완성 시 배경이 바뀌는 것을 방지하는고 항상 흰색으로 고정함
                        sx={{
                            backgroundColor: 'white',
                            '&:-webkit-autofill': {
                                backgroundColor: 'white !important',
                                boxShadow:
                                    '0 0 0px 1000px white inset !important',
                                WebkitTextFillColor: 'black !important', // kebab-case를 camelCase로 수정
                            },
                            '&:-webkit-autofill:focus': {
                                backgroundColor: 'white !important',
                                boxShadow:
                                    '0 0 0px 1000px white inset !important',
                            },
                        }}
                    />
                    {emailError && (
                        <FormErrorMessage pl={4}>{emailError}</FormErrorMessage>
                    )}
                </FormControl>
                <Button
                    colorScheme='blue'
                    size='lg'
                    onClick={(e) => {
                        e.preventDefault();
                        handleTempPWIssue();
                    }}
                    mt={6}
                    w='full'
                    className='btn_round btn_lg'
                    _active={{
                        bg: 'var(--clr-primary)', // 누른 상태 배경색
                        color: 'whiteAlpha.900', // 누른 상태 텍스트 색상
                    }}
                    _hover={{
                        bg: 'var(--clr-primary)',
                        color: 'whiteAlpha.900',
                    }}
                    ref={btnTempPwIssue}
                >
                    임시 비밀번호 발송
                </Button>
            </VStack>
            {/* ------ 새로운 파일 업로드하기 버튼 모달 ------- */}
            <ModalComponent
                isModalOpen={isModalOpenSuccess} // 오픈 여부 상태 변수 전달
                handleModalClose={handleModalClose} // 닫기 버튼용 함수 전달
                // handleModalNegative={handleNewFileUpload} // 부정 버튼용 함수 전달
                handleConfirm={handleSuccessEmail} // 예 또는 긍정 버튼용 함수 전달
                modalOption={modalOptionSuccess} // 모달 UI 요소를 위한 옵션 전달
            />
        </>
    );
};
export default TempPasswordIssueForm;
