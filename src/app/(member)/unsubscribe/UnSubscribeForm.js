// ************ 회원 탈퇴를 위한 폼 ************
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ModalComponent from '@/components/common/ModalComponent';
import {
    VStack,
    FormLabel,
    Button,
    FormControl,
    Textarea,
    Checkbox,
    Alert,
    AlertIcon,
    AlertDescription,
    Menu,
    MenuList,
    MenuButton,
    MenuItem,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

// AuthData 경로 수정
import AuthData from '@/data/AuthData';

const UnSubscribeForm = () => {
    const router = useRouter();
    const { authEmail, authPassword, authUnsubscribing } = AuthData;
    const [showSuccess, setShowSuccess] = useState(false); // 탈퇴 성공 Alert 보임 여부
    const [password, setPassword] = useState('');
    const [isModalOpenUnSubscribe, setIsModalOpenUnSubscribe] = useState(false); // 회원 탈퇴 모달 오픈 여부
    const [passwordError, setPasswordError] = useState('');

    const options = [
        '원하는 기능이 제공되지 않음',
        '연결이 불안정함',
        '속도가 만족스럽지 않음',
        '개인정보 보호 및 데이터 보안에 대한 우려',
        '서비스를 잘 사용하지 않음',
        '기술적인 문제가 발생함',
        '불만족스러운 고객 지원',
        '어플 지원이 되지 않음',
        '다른 서비스 사용 중',
        '기타',
    ];
    const [selected, setSelected] = useState(''); // 문의 유형 항목 상태 변수

    // 모달 창 열기 이벤트 핸들러
    const handleModalOpen = () => {
        setIsModalOpenUnSubscribe(true); // 이메일 발송 성공 모달 오픈
    };

    // 모달 창 닫기 이벤트 핸들러 (모든 모달을 닫는다.)
    const handleModalClose = () => {
        setIsModalOpenUnSubscribe(false);
    };

    // 비밀번호 확인하기 클릭 이벤트  함수
    const handleUnSubscribe = (password) => {
        if (password === authPassword) {
            // console.log('회원 탈퇴 성공');
            handleModalClose(); // 모달 창 닫기
            setShowSuccess(true); // 성공 메시지 표시
        } else {
            console.log('회원 탈퇴 실패 ');
            setShowSuccess(false); // 성공 메시지 숨김
        }
    };

    // 탈툉하기 모달 창 옵션 설정
    const modalOptionSuccess = {
        title: '회원 탈퇴하기',
        description:
            '회원 탈퇴가 완료되었습니다. 그동안 Cloudbric Maska를 이용해 주셔서 감사합니다.',
        btnLabelNagative: '나가기',
        btnLabelPositive: '비밀번호 확인하기',
    };

    // 탈퇴 성공으로 인해 성공 메시지 발생 시 3초 후에 Alert 창을 닫음
    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
                router.push('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess, router]);

    return (
        <>
            <VStack spacing={6} align='stretch' w='full' position='relative'>
                <p
                    style={{
                        fontSize: 'var(--fs-20)',
                        textAlign: 'center',
                        marginBottom: '1.25rem',
                    }}
                >
                    회원 탈퇴를 진행할 경우 모든 회원 정보가 삭제되며,
                    <br />
                    일주일 동안 동일한 계정으로 재가입은 제한됩니다.
                </p>
                {/* 탈퇴 사유 선택 */}
                <FormControl isRequired>
                    <FormLabel fontSize='var(--fs-18)'>
                        어떤 이유로 회원을 탈퇴하려고 하시나요?
                    </FormLabel>
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
                            {selected || '문의 유형을 선택해 주세요'}
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
                {/* 탈퇴 사유 자세히 작성 */}
                <FormControl>
                    <FormLabel fontSize='var(--fs-18)'>
                        더 나은 서비스 제공을 위해 탈퇴 사유를 작성해주세요.
                    </FormLabel>
                    <Textarea
                        placeholder='탈퇴 사유'
                        resize='vertical'
                        minH='150px'
                        borderRadius='1.563rem'
                        backgroundColor='var(--clr-white)'
                    />
                </FormControl>

                <FormControl mt={4}>
                    <Checkbox onChange={(e) => {}} colorScheme='blue'>
                        회원 계정과 관련된 모든 정보를 삭제하는 것에 동의합니다.
                    </Checkbox>
                </FormControl>

                <FormControl>
                    <Button
                        colorScheme='blue'
                        size='lg'
                        onClick={handleModalOpen}
                        w='full'
                        className='btn_round btn_lg btn_black'
                        _active={{
                            bg: 'var(--foreground)', // 누른 상태 배경색
                            color: 'whiteAlpha.900', // 누른 상태 텍스트 색상
                        }}
                        _hover={{
                            bg: 'var(--foreground)',
                            color: 'whiteAlpha.900',
                        }}
                    >
                        탈퇴하기
                    </Button>
                </FormControl>
            </VStack>
            {/* ------ 회원 탈퇴하기 모달 ------- */}
            <ModalComponent
                isModalOpen={isModalOpenUnSubscribe} // 오픈 여부 상태 변수 전달
                handleModalClose={handleModalClose} // 닫기 버튼용 함수 전달
                handleModalNegative={handleModalClose} // 부정 버튼용 함수 전달
                handleConfirm={handleUnSubscribe} // 예 또는 긍정 버튼용 함수 전달
                modalOption={modalOptionSuccess} // 모달 UI 요소를 위한 옵션 전달
                isUnSubscribeModal={true}
                passwordError={passwordError}
            />
            {/* ---- 탈퇴 성공 시, Alert 창을 표시함 ---- */}
            {showSuccess && (
                <Alert
                    status='error'
                    background='black'
                    width='fit-content'
                    position='fixed'
                    bottom='20px'
                    left='50%'
                    transform='translateX(-50%)'
                    borderRadius='md'
                    color='white'
                    zIndex={10}
                >
                    <AlertIcon color='white' />
                    <AlertDescription>
                        회원 탈퇴가 완료되었습니다. 그동안 Cloudbric Maska를
                        이용해 주셔서 감사합니다.
                    </AlertDescription>
                </Alert>
            )}
        </>
    );
};
export default UnSubscribeForm;
