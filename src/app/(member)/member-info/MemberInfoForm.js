// ************ 회원 정보를 위한 폼 ************
'use client';
import ModalComponent from '@/components/common/ModalComponent';
import {
    VStack,
    Input,
    FormLabel,
    Button,
    FormControl,
} from '@chakra-ui/react';
import { useState } from 'react';

const MemberInforForm = () => {
    const [isModalOpenPwChange, setIsModalOpenPwChange] = useState(false); // 비밀번호 변경하기 모달 오픈 여부

    // 비밀번호 변경하기 버튼 클릭 (모달열기) 이벤트 함수
    const handleModalOpen = () => {
        setIsModalOpenPwChange(true); // 비밀번호 변경하기 모달 오픈
    };

    // 모달 창 닫기 이벤트 핸들러 (모든 모달을 닫는다.)
    const handleModalClose = () => {
        setIsModalOpenPwChange(false);
    };

    // 비밀번호 변경하기 모달 창 옵션 설정
    const modalOptionPwChange = {
        title: '비밀번호 변경하기',
        description: '현재 비밀번호와 새 비밀번호를 입력',
        btnLabelNagative: '',
        btnLabelPositive: '변경하기',
    };

    return (
        <>
            <VStack spacing={6} align='stretch' w='full' position='relative'>
                {/* 이름 표시 */}
                <FormControl>
                    <FormLabel>이름</FormLabel>
                    <Input
                        placeholder='이름을 입력하세요'
                        value='홍길동'
                        onChange={(e) => {}}
                        size='lg'
                        focusBorderColor='blue.500'
                        borderColor='var(--clr-primary)'
                        isReadOnly
                    />
                </FormControl>
                {/* 이메일 표시 */}
                <FormControl>
                    <FormLabel>이메일</FormLabel>
                    <Input
                        placeholder='아이디(user@email.com)'
                        value='user@email.com'
                        size='lg'
                        focusBorderColor='blue.500'
                        borderColor='var(--clr-primary)'
                        isReadOnly
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>비밀번호</FormLabel>
                    <Button
                        colorScheme='blue'
                        size='lg'
                        onClick={(e) => {
                            e.preventDefault();
                            handleModalOpen();
                        }}
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
                    >
                        비밀번호 변경하기
                    </Button>
                </FormControl>
            </VStack>
            {/* ------ 비밀번호 변경하기 모달 ------- */}
            <ModalComponent
                isModalOpen={isModalOpenPwChange} // 오픈 여부 상태 변수 전달
                handleModalClose={handleModalClose} // 닫기 버튼용 함수 전달
                // handleModalNegative={handleNewFileUpload} // 부정 버튼용 함수 전달
                handleConfirm={handleModalClose} // 예 또는 긍정 버튼용 함수 전달
                modalOption={modalOptionPwChange} // 모달 UI 요소를 위한 옵션 전달
                isPwChangeModal={true}
            />
        </>
    );
};
export default MemberInforForm;
