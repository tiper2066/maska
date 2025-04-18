'use client';

import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Divider,
    Flex,
    Spacer,
    Link,
    Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// import dynamic from 'next/dynamic';

// 동적 임포트로 아이콘 최적화
// const FcGoogle = dynamic(
//     () => import('react-icons/fc').then((mod) => mod.FcGoogle),
//     { ssr: false, loading: () => <span>G</span> } // 로딩 중일 경우 표시 추가
// );

// AuthData 임포트
import AuthData from '@/data/AuthData';

export default function SignUpForm() {
    const router = useRouter();
    // 인증 데이터에서 인증 관련 정보 추출
    const {
        authEmail,
        authPassword,
        authUnsubscribing,
        authDuplicate,
        authNonMember,
    } = AuthData;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [terms1, setTerms1] = useState(false);
    const [terms2, setTerms2] = useState(false);

    // 유효성 검사 상태
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isEmailDisabled, setIsEmailDisabled] = useState(false);
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [capsLockOn, setCapsLockOn] = useState(false);
    const [passwordAttempts, setPasswordAttempts] = useState(0);
    const [isLoginLocked, setIsLoginLocked] = useState(false);
    const [lockoutEndTime, setLockoutEndTime] = useState(null);

    // Caps Lock 감지
    const handleCapsLock = (e) => {
        const capsLock = e.getModifierState('CapsLock');
        setCapsLockOn(capsLock);
    };

    // 비밀번호 5회 실패 시 10분간 로그인 제한
    useEffect(() => {
        if (passwordAttempts >= 5) {
            setIsLoginLocked(true);
            const lockoutTime = new Date().getTime() + 10 * 60 * 1000; // 10분 후
            setLockoutEndTime(lockoutTime);

            const timer = setTimeout(() => {
                setIsLoginLocked(false);
                setPasswordAttempts(0);
                setLockoutEndTime(null);
            }, 10 * 60 * 1000); // 10분 후 제한 해제

            return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
        }
    }, [passwordAttempts]);

    // 이름 유효성 검사
    const validateName = () => {
        if (!name || name.trim() === '') {
            setNameError('이름을 입력해 주세요.');
            return false;
        }
        setNameError('');
        return true;
    };

    // 이메일 유효성 검사
    const validateEmail = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email || email.trim() === '') {
            setEmailError('이메일을 입력해주세요.');
            return false;
        }
        if (email.includes(' ')) {
            setEmailError('이메일 형식(user@email.com)으로 입력해주세요.');
            return false;
        }
        if (email.length > 320) {
            setEmailError('이메일은 최대 320자까지 입력 가능합니다.');
            return false;
        }
        if (!emailRegex.test(email)) {
            setEmailError('이메일 형식(user@email.com)으로 입력해주세요.');
            return false;
        }
        if (email === authDuplicate) {
            setEmailError('이미 존재하는 이메일입니다.');
            return false;
        }
        if (email === authNonMember) {
            setEmailError('등록되지 않은 이메일입니다.');
            return false;
        }
        if (email === authUnsubscribing) {
            setEmailError('최근에 탈퇴한 이메일입니다.');
            return false;
        }

        setEmailError('');
        return true;
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
            // setPasswordError('8~20자의 영문&숫자 입력, 특수문자 금지');
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

    // 인증코드 발송 버튼 클릭 시
    const handleSendVerificationCode = () => {
        if (validateEmail()) {
            alert('해당 이메일로 인증 코드를 발송했습니다.');
            setIsEmailDisabled(true);
            setIsVerificationSent(true);
        }
    };

    // 폼 제출 시
    const handleSubmit = (e) => {
        e.preventDefault();
        const isNameValid = validateName();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        if (
            isNameValid &&
            isPasswordValid &&
            isConfirmPasswordValid &&
            !isLoginLocked
        ) {
            router.push('/main-member');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4} align='stretch'>
                {/* 이름 입력 */}
                <FormControl isRequired isInvalid={!!nameError}>
                    {/* <FormLabel>이름</FormLabel> */}
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
                        placeholder='이름'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            validateName();
                        }}
                        onBlur={validateName}
                        size='lg'
                        focusBorderColor='blue.500'
                    />
                    {nameError && (
                        <Text color='red.500' fontSize='sm' mt={1} pl={4}>
                            {nameError}
                        </Text>
                    )}
                </FormControl>

                {/* 이메일 입력 및 인증코드 발송 버튼 */}
                <FormControl isRequired isInvalid={!!emailError}>
                    {/* <FormLabel>이메일</FormLabel> */}
                    <Flex>
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
                            placeholder='이메일(useruser@email.com)'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError('');
                            }}
                            isDisabled={isEmailDisabled}
                            mr={2}
                            size='lg'
                            focusBorderColor='blue.500'
                        />
                        <Button
                            colorScheme='blue'
                            onClick={handleSendVerificationCode}
                            flexShrink={0}
                            className='btn_round btn_ml'
                        >
                            {isVerificationSent
                                ? '인증코드 재발송'
                                : '인증코드 발송'}
                        </Button>
                    </Flex>
                    {emailError && (
                        <Text color='red.500' fontSize='sm' mt={1} pl={4}>
                            {emailError}
                        </Text>
                    )}
                </FormControl>

                {/* 비밀번호 입력 */}
                <FormControl isRequired isInvalid={!!passwordError}>
                    {/* <FormLabel>비밀번호</FormLabel> */}
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
                        value={password}
                        placeholder='비밀번호'
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
                        <Text color='red.500' fontSize='sm' mt={1} pl={4}>
                            {passwordError}
                        </Text>
                    )}
                    {capsLockOn && (
                        <Text color='red.500' fontSize='sm' mt={1} pl={4}>
                            &lt;Caps Lock&gt;이 켜져 있습니다.
                        </Text>
                    )}
                    {isLoginLocked && (
                        <Text color='red.500' fontSize='sm' mt={1} pl={4}>
                            비밀번호 5회 오류로 10분간 로그인이 제한됩니다. (
                            {Math.ceil(
                                (lockoutEndTime - new Date().getTime()) /
                                    1000 /
                                    60
                            )}
                            분 남음)
                        </Text>
                    )}
                </FormControl>

                {/* 비밀번호 확인 */}
                <FormControl
                    isRequired
                    isInvalid={
                        confirmPasswordError &&
                        confirmPasswordError !== '비밀번호가 일치합니다.'
                    }
                    mb={5}
                >
                    {/* <FormLabel>비밀번호 확인</FormLabel> */}
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
                        value={confirmPassword}
                        placeholder='비밀번호 확인'
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

                {/* 체크박스와 보기 링크 */}
                <Flex width='full' align='center'>
                    <Checkbox
                        isChecked={terms1}
                        onChange={(e) => setTerms1(e.target.checked)}
                        isRequired
                    >
                        [필수] 표준 서비스 계약 동의
                    </Checkbox>
                    <Spacer />
                    <Link
                        href='#'
                        className='show_rule'
                        textDecoration='underline'
                    >
                        보기
                    </Link>
                </Flex>

                <Flex width='full' align='center'>
                    <Checkbox
                        isChecked={terms2}
                        onChange={(e) => setTerms2(e.target.checked)}
                        isRequired
                    >
                        [필수] 개인정보처리방침 동의
                    </Checkbox>
                    <Spacer />
                    <Link href='#' className='show_rule'>
                        보기
                    </Link>
                </Flex>

                {/* 가입하기 버튼 */}
                <Button
                    type='submit'
                    colorScheme='blue'
                    width='full'
                    isDisabled={isLoginLocked}
                    className='btn_round btn_lg'
                    mt={6}
                    _active={{
                        bg: 'var(--clr-primary)', // 누른 상태 배경색
                        color: 'whiteAlpha.900', // 누른 상태 텍스트 색상
                    }}
                    _hover={{
                        bg: 'var(--clr-primary)',
                        color: 'whiteAlpha.900',
                    }}
                >
                    가입하기
                </Button>

                {/* 구분선 */}
                <Box
                    position='relative'
                    textAlign='center'
                    w='50%'
                    mx='auto'
                    py='20px'
                >
                    <Divider borderStyle='dashed' borderColor='gray.300' />
                    <Text
                        position='absolute'
                        top='50%'
                        left='50%'
                        transform='translate(-50%, -50%)'
                        bg='white'
                        px={3}
                        color='gray.500'
                        fontSize='sm'
                        bgColor='var(--clr-light-blue)'
                    >
                        또는
                    </Text>
                </Box>

                {/* 구글 계정으로 가입 */}
                <Button
                    variant='outline'
                    width='full'
                    leftIcon={
                        <Image
                            src='/img/icon_google.svg'
                            width={30}
                            height={30}
                            alt='Google Icon'
                            className='icon_google'
                        />
                    }
                    className='btn_round btn_outline btn_lg'
                >
                    Google 계정으로 간편하게 가입하기
                </Button>
            </VStack>
        </form>
    );
}
