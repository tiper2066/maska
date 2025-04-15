'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
    Box,
    Flex,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaUser, FaArrowRightFromBracket } from 'react-icons/fa6';
import { useEffect } from 'react';
import { useRedirectAndRefreshHome } from '@/utils/RedirectAndRefresh'; // 홈 경로로 이동 시 새로고침함

const Header = ({ user, member }) => {
    useEffect(() => {
        const header = document.querySelector('header');
        const handleScroll = () => {
            let scroll = window.scrollY;
            if (scroll >= 50) {
                header.classList.add('box_shadow');
            } else {
                header.classList.remove('box_shadow');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={user === 'user' ? 'header user' : 'header'}>
            <div className='header_wapper'>
                {/* -------- Cloudbric Maska 로고 -------- */}
                <Link href='/' onClick={useRedirectAndRefreshHome}>
                    <Image
                        className='maska_logo'
                        src='/img/Cloudbric_Maska_logo_black.svg'
                        alt='Cloudbric Maska logo'
                        width={24}
                        height={24}
                        priority
                    />
                </Link>
                {/* -------- 로그인 버튼 및 계정 메뉴 -------- */}
                {member && member === 'member' ? (
                    <Flex align='center' gap={3}>
                        {/* -------- 아바타 및 계정 메뉴 -------- */}
                        {/* Avatar - 테두리 추가 */}
                        <Box pr={3} display='flex' alignItems='center'>
                            <Avatar
                                src='/img/icon_avatar.svg'
                                size='sm'
                                name='User'
                                bg='gray.300'
                            />
                        </Box>
                        {/* 이메일 + 메뉴 */}
                        <Menu>
                            <MenuButton>
                                <Flex align='center'>
                                    <Text
                                        fontSize='var(--fs-20)'
                                        fontWeight='var(--fw-700)'
                                        mr={1}
                                    >
                                        user@email.com
                                    </Text>
                                    <ChevronDownIcon w={24} h={24} />
                                </Flex>
                            </MenuButton>
                            <MenuList
                                py={2}
                                borderRadius='0.625rem'
                                backgroundColor='white'
                                minW='160px'
                                p={20}
                                sx={{
                                    boxShadow:
                                        '0px 5px 15px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <Link href='/member-info'>
                                    <MenuItem
                                        icon={
                                            <Image
                                                src='/img/icon_user.svg'
                                                alt='user icon'
                                                width={24}
                                                height={24}
                                            />
                                        }
                                        sx={{ fontSize: 'var(--fs-18)' }}
                                    >
                                        회원 정보
                                    </MenuItem>
                                </Link>
                                <hr style={{ margin: '10px 0' }} />
                                <Link href='/'>
                                    <MenuItem
                                        icon={
                                            <Image
                                                src='/img/icon_logout.svg'
                                                alt='logout icon'
                                                width={24}
                                                height={24}
                                            />
                                        }
                                        sx={{ fontSize: 'var(--fs-18)' }}
                                    >
                                        로그아웃
                                    </MenuItem>
                                </Link>
                            </MenuList>
                        </Menu>
                    </Flex>
                ) : (
                    // -------- 로그인 버튼 --------
                    <Link href='/login' className='btn_round btn_sm'>
                        로그인하기
                    </Link>
                )}
            </div>
        </header>
    );
};
export default Header;
