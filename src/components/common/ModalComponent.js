'use client';
import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalFooter,
    ModalBody,
    VStack,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Box,
    Input,
    Text,
    HStack,
    Progress,
} from '@chakra-ui/react';
import Link from 'next/link';

// AuthData 임포트
import AuthData from '@/data/AuthData';

const ModalComponent = ({
    isModalOpen,
    handleModalClose,
    handleModalNegative,
    handleConfirm,
    modalOption,
    isPwChangeModal = false, // 비밀번호 모달 여부, 디폴트 false
    isUnSubscribeModal = false, // 탈퇴하기 모달 여부, 디폴트 false
    isReadyDownloadModal = false, // 다운로드 준비 중 모달 여부, 디폴트 false
}) => {
    // 인증 데이터에서 인증 관련 정보 추출
    const {
        authEmail,
        authPassword,
        authUnsubscribing,
        authDuplicate,
        authNonMember,
    } = AuthData;

    // 폼 요소 상태
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // 유효성 검사 상태
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [capsLockOn, setCapsLockOn] = useState(false);
    const [isLoginLocked, setIsLoginLocked] = useState(false);
    const [passwordAttempts, setPasswordAttempts] = useState(0);

    // Caps Lock 감지
    const handleCapsLock = (e) => {
        const capsLock = e.getModifierState('CapsLock');
        setCapsLockOn(capsLock);
    };

    // 비밀번호 유효성 검사
    const validatePassword = () => {
        const passwordRegex = /^[a-zA-Z0-9.]{8,20}$/;
        const correctPassword = authPassword;

        if (!password || password.trim() === '') {
            setPasswordError('비밀번호를 입력해주세요.');
            return false;
        }
        if (!passwordRegex.test(password)) {
            setPasswordError(
                '8~20자의 영문&숫자 입력, 특수문자 입력 ~!@#$%^&*()_+={}<>|`:;?,[]`'
            );
            return false;
        }
        if (password !== correctPassword) {
            setPasswordAttempts((prev) => prev + 1);
            setPasswordError('비밀번호가 올바르지 않습니다.');
            return false;
        }

        setPasswordError('');
        return true;
    };

    // 비밀번호 확인 유효성 검사
    const validateConfirmPassword = () => {
        if (password && confirmPassword && password === confirmPassword) {
            setConfirmPasswordError('비밀번호가 일치합니다.');
            return true;
        }
        setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
        return false;
    };

    // 현재 비밀번호 유효성 검사
    const validateCurrentPassword = () => {
        if (!currentPassword || currentPassword.trim() === '') {
            setPasswordError('현재 비밀번호를 입력해주세요.');
            return false;
        }
        // Add more validation logic here if needed
        setPasswordError('');
        return true;
    };

    // 폼 제출 시
    const handleSubmit = (e) => {
        e.preventDefault();
        const isCurrentPasswordValid = validateCurrentPassword();
        const isNewPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        if (
            isCurrentPasswordValid &&
            isNewPasswordValid &&
            isConfirmPasswordValid
        ) {
            // Submit the form
            handleConfirm();
        }
    };

    return isPwChangeModal && isPwChangeModal ? (
        // 비밀번호 변경하기 모달 일 경우 .... 모달 구조
        <Modal isOpen={isModalOpen} onClose={handleModalClose} isCentered>
            <ModalOverlay />
            <ModalContent
                sx={{
                    padding: '30px 20px 20px 20px',
                    minWidth: '34.375rem', // 550px
                }}
            >
                <ModalHeader
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Text
                        sx={{
                            fontSize: 'var(--fs-30)',
                            fontWeight: 'var(--fw-600)',
                            textAlign: 'center',
                            width: '100%',
                        }}
                    >
                        {modalOption.title}
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4} align='stretch'>
                            {/* 현재 비밀번호 입력 */}
                            <FormControl isRequired isInvalid={!!passwordError}>
                                {/* <FormLabel>현재 비밀번호</FormLabel> */}
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
                                    type='password'
                                    value={currentPassword}
                                    placeholder='현재 비밀번호'
                                    onChange={(e) => {
                                        setCurrentPassword(e.target.value);
                                        validatePassword();
                                    }}
                                    onBlur={validatePassword}
                                    onKeyDown={handleCapsLock}
                                    onKeyUp={handleCapsLock}
                                    size='lg'
                                    focusBorderColor='blue.500'
                                />
                                {passwordError && (
                                    <Text
                                        color='red.500'
                                        fontSize='sm'
                                        mt={1}
                                        pl={4}
                                    >
                                        {passwordError}
                                    </Text>
                                )}
                                {capsLockOn && (
                                    <Text
                                        color='red.500'
                                        fontSize='sm'
                                        mt={1}
                                        pl={4}
                                    >
                                        &lt;Caps Lock&gt;이 켜져 있습니다.
                                    </Text>
                                )}
                                {isLoginLocked && (
                                    <Text
                                        color='red.500'
                                        fontSize='sm'
                                        mt={1}
                                        pl={4}
                                    >
                                        비밀번호 5회 오류로 10분간 로그인이
                                        제한됩니다. (
                                        {Math.ceil(
                                            (lockoutEndTime -
                                                new Date().getTime()) /
                                                1000 /
                                                60
                                        )}
                                        분 남음)
                                    </Text>
                                )}
                            </FormControl>

                            {/* 새 비밀번호 입력 */}
                            <FormControl isRequired isInvalid={!!passwordError}>
                                {/* <FormLabel>새 비밀번호</FormLabel> */}
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
                                    type='password'
                                    placeholder='새 비밀번호'
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        validatePassword();
                                    }}
                                    onBlur={validatePassword}
                                    onKeyDown={handleCapsLock}
                                    onKeyUp={handleCapsLock}
                                    size='lg'
                                    focusBorderColor='blue.500'
                                />
                                {passwordError && (
                                    <Text
                                        color='red.500'
                                        fontSize='sm'
                                        mt={1}
                                        pl={4}
                                    >
                                        {passwordError}
                                    </Text>
                                )}
                                {capsLockOn && (
                                    <Text
                                        color='red.500'
                                        fontSize='sm'
                                        mt={1}
                                        pl={4}
                                    >
                                        &lt;Caps Lock&gt;이 켜져 있습니다.
                                    </Text>
                                )}
                                {isLoginLocked && (
                                    <Text
                                        color='red.500'
                                        fontSize='sm'
                                        mt={1}
                                        pl={4}
                                    >
                                        비밀번호 5회 오류로 10분간 로그인이
                                        제한됩니다. (
                                        {Math.ceil(
                                            (lockoutEndTime -
                                                new Date().getTime()) /
                                                1000 /
                                                60
                                        )}
                                        분 남음)
                                    </Text>
                                )}
                            </FormControl>

                            {/* 새 비밀번호 확인 */}
                            <FormControl
                                isRequired
                                isInvalid={
                                    confirmPasswordError &&
                                    confirmPasswordError !==
                                        '비밀번호가 일치합니다.'
                                }
                                mb={5}
                            >
                                {/* <FormLabel>새 비밀번호 확인</FormLabel> */}
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
                                    type='password'
                                    placeholder='새 비밀번호 확인'
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        validateConfirmPassword();
                                    }}
                                    onBlur={validateConfirmPassword}
                                    size='lg'
                                    focusBorderColor='blue.500'
                                />
                                {confirmPasswordError && (
                                    <Text
                                        color={
                                            confirmPasswordError ===
                                            '비밀번호가 일치합니다.'
                                                ? 'var(--clr-sky-blue)'
                                                : 'red.500'
                                        }
                                        fontSize='sm'
                                        mt={1}
                                        pl={4}
                                    >
                                        {confirmPasswordError}
                                    </Text>
                                )}
                            </FormControl>
                        </VStack>
                    </form>
                </ModalBody>
                <ModalFooter
                    className='flex_horizontal'
                    style={{ gap: '1rem', justifyContent: 'center' }}
                >
                    {handleModalNegative && (
                        <Link
                            href='#'
                            onClick={(e) => {
                                e.preventDefault();
                                handleModalNegative();
                            }}
                            className='btn_round btn_outline btn_md'
                        >
                            {modalOption.btnLabelNagative}
                        </Link>
                    )}
                    <Link
                        href='#'
                        className='btn_round btn_lg full_width'
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit(e);
                        }}
                    >
                        {modalOption.btnLabelPositive}
                    </Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    ) : isReadyDownloadModal && isReadyDownloadModal ? (
        // 다운로드 준비 중... 모달 일 경우  .... 모달 구조
        <Modal isOpen={isModalOpen} onClose={handleModalClose} isCentered>
            <ModalOverlay />
            <ModalContent
                sx={{
                    padding: '30px 20px 20px 20px',
                    minWidth: '34.375rem', // 550px
                }}
            >
                <ModalHeader
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Text
                        sx={{
                            fontSize: 'var(--fs-20)',
                            fontWeight: 'var(--fw-400)',
                            textAlign: 'center',
                            width: '100%',
                        }}
                    >
                        {modalOption.title}
                    </Text>
                </ModalHeader>
                <ModalBody>
                    <Text
                        sx={{
                            fontSize: 'var(--fs-18)',
                            fontWeight: 'var(--fw-400)',
                            textAlign: 'center',
                            width: '100%',
                        }}
                    >
                        {modalOption.description}
                    </Text>
                    <HStack spacing={4} mt={4}>
                        <Progress
                            value={80}
                            size='sm'
                            flex='1' // 가로로 늘어나게
                            sx={{
                                borderRadius: '1.875rem',
                                backgroundColor: '#D8DDED', // 진행바 전체 배경
                                '& > div:first-of-type': {
                                    backgroundColor: 'var(--clr-sky-blue)', // 실제 진행바 부분 색상
                                },
                            }}
                        />
                        <Text
                            sx={{
                                fontSize: 'var(--fs-18)',
                                fontWeight: 'var(--fw-600)',
                                color: 'var(--clr-sky-blue)',
                            }}
                        >
                            n초 남음
                        </Text>
                    </HStack>
                </ModalBody>
                <ModalFooter
                    className='flex_horizontal'
                    style={{ gap: '1rem', justifyContent: 'center' }}
                >
                    {handleModalNegative && (
                        <Link
                            href='#'
                            onClick={(e) => {
                                e.preventDefault();
                                handleModalNegative();
                            }}
                            className={
                                isUnSubscribeModal
                                    ? 'btn_round btn_outline btn_md btn_black'
                                    : 'btn_round btn_outline btn_md'
                            }
                        >
                            {modalOption.btnLabelNagative}
                        </Link>
                    )}
                    <Link
                        href='#'
                        className={
                            isUnSubscribeModal
                                ? 'btn_round btn_md btn_black'
                                : 'btn_round btn_md'
                        }
                        // 나가기 버튼 클릭
                        onClick={(e) => {
                            e.preventDefault();
                            handleConfirm();
                        }}
                    >
                        {modalOption.btnLabelPositive}
                    </Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    ) : (
        // 기타 다른 모달 일 경우  .... 모달 구조
        <Modal isOpen={isModalOpen} onClose={handleModalClose} isCentered>
            <ModalOverlay />
            <ModalContent
                sx={{
                    padding: '30px 20px 20px 20px',
                    minWidth: '34.375rem', // 550px
                }}
            >
                <ModalHeader
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Text
                        sx={{
                            fontSize: 'var(--fs-20)',
                            fontWeight: 'var(--fw-400)',
                            textAlign: 'center',
                            width: '100%',
                        }}
                    >
                        {modalOption.title}
                    </Text>
                </ModalHeader>
                <ModalBody>
                    {/* --------- 회원 탈퇴 모달일 경우  --------- */}
                    {isUnSubscribeModal && isUnSubscribeModal ? (
                        <FormControl
                            isInvalid={passwordError}
                            className='flex_horizontal'
                            mb={4}
                        >
                            {/* isRequired 대체 요소 */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '-0.3rem',
                                    left: '3.5rem',
                                    color: 'var(--clr-red)',
                                }}
                            >
                                *
                            </Box>
                            <Input
                                placeholder='비밀번호'
                                type='password'
                                value={password}
                                size='lg'
                                width='340px'
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleCapsLock}
                                onKeyUp={handleCapsLock}
                                focusBorderColor='blue.500'
                            />

                            {passwordError && (
                                <FormErrorMessage pl={4}>
                                    {passwordError}
                                </FormErrorMessage>
                            )}
                        </FormControl>
                    ) : (
                        // --------- 일반 모달일 경우  ---------
                        <Text
                            sx={{
                                fontSize: 'var(--fs-18)',
                                fontWeight: 'var(--fw-400)',
                                textAlign: 'center',
                                width: '100%',
                            }}
                        >
                            {modalOption.description}
                        </Text>
                    )}
                </ModalBody>
                <ModalFooter
                    className='flex_horizontal'
                    style={{ gap: '1rem', justifyContent: 'center' }}
                >
                    {handleModalNegative && (
                        <Link
                            href='#'
                            onClick={(e) => {
                                e.preventDefault();
                                handleModalNegative();
                            }}
                            className={
                                isUnSubscribeModal
                                    ? 'btn_round btn_outline btn_md btn_black'
                                    : 'btn_round btn_outline btn_md'
                            }
                        >
                            {modalOption.btnLabelNagative}
                        </Link>
                    )}
                    <Link
                        href='#'
                        className={
                            isUnSubscribeModal
                                ? 'btn_round btn_md btn_black'
                                : 'btn_round btn_md'
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            handleConfirm(password);
                        }}
                    >
                        {modalOption.btnLabelPositive}
                    </Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
export default ModalComponent;
