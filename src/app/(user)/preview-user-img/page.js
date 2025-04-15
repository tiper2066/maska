// ************************ 미리보기 페이지 - 이미지 (비회원) ************************
'use client';
import FooterSimple from '@/components/common/FooterSimple';
import ModalComponent from '@/components/common/ModalComponent';
import { Divider, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const PreviewUserImg = () => {
    const router = useRouter(); // 라우터 객체 생성

    const [isModalOpenLogin, setIsModalOpenLogin] = useState(false); // 편집하기 모달 오픈 여부
    const [isModalOpenDownload, setIsModalOpenDownload] = useState(false); // 다운로드하기 모달 오픈 여부
    const [isModalOpenXBtn, setIsModalOpenXBtn] = useState(false); // 다운로드하지 않고 나가기 (X 버튼) 모달 오픈 여부
    const [isModalOpenNewFile, setIsModalOpenNewFile] = useState(false); // 새로운 파일 업로드하기 모달 오픈 여부

    const btnMaskaEditRef = useRef(); // 마스카 영역 편집하기 버튼 참조
    const btnDonwloadRef = useRef(); // 바로 다운로드하기 버튼 참조

    // 모달 창 열기 이벤트 핸들러
    const handleModalOpen = (currentModal) => {
        if (currentModal === 'LoginModal') {
            setIsModalOpenLogin(true);
        } else if (currentModal === 'DownLoadModal') {
            setIsModalOpenDownload(true);
        } else if (currentModal === 'XBtnModal') {
            setIsModalOpenXBtn(true);
        } else if (currentModal === 'NewFileModal') {
            setIsModalOpenNewFile(true);
        }
    };

    // 모달 창 닫기 이벤트 핸들러 (모든 모달을 닫는다.)
    const handleModalClose = () => {
        setIsModalOpenLogin(false);
        setIsModalOpenDownload(false);
        setIsModalOpenXBtn(false);
        setIsModalOpenNewFile(false);
    };

    // 편집하기 모달 창 확인 이벤트 핸들러
    const handleGoToLogin = () => {
        setIsModalOpenLogin(false); // 모달 창 닫고
        setIsModalOpenDownload(false); // 모달 창 닫고
        router.push('/login'); // 로그인 페이지로 이동
    };

    // 바로 다운로드 모달 창 확인 이벤트 핸들러
    const handleDownload = () => {
        setIsModalOpenLogin(false); // 모달 창 닫고
        setIsModalOpenDownload(false); // 모달 창 닫고
        setIsModalOpenXBtn(false); // 모달 창 닫고
        btnMaskaEditRef.current.classList.add('disabled'); // 마스카 영역 편집하기 버튼 비활성
        btnDonwloadRef.current.classList.add('disabled'); // 바로 다운로드하기 버튼 비활성
    };

    // 새로운 파일 업로드하기 클릭 이벤트 핸들러
    const handleNewFileUpload = () => {
        router.push('/'); // 홈으로 이동
    };

    // 마스카 영역 편집하기 모달 창 옵션 설정
    const modalOptionLogin = {
        title: '로그인하고 마스카 영역을 편집해보세요!',
        description: '',
        btnLabelNagative: '취소하기',
        btnLabelPositive: '로그인하기',
    };

    // 바로 다운로드하기 모달 창 옵션 설정
    const modalOptionDownload = {
        title: '바로 다운로드 하시겠습니까?',
        description: '',
        btnLabelNagative: '다운로드하기',
        btnLabelPositive: '로그인/영역 편집하기',
    };

    // 다운로드하지 않고 나가기 창 옵션 설정 (우측 패널 X 버튼)
    const modalOptionXBtn = {
        title: '다운로드 하지 않고 나가시겠습니까?',
        description: '지금 나가면 파일은 저장되지 않습니다.',
        btnLabelNagative: '나가기',
        btnLabelPositive: '다운로드하기',
    };

    // 다운로드하지 않고 나가기 창 옵션 설정 (우측 패널 X 버튼)
    const modalOptionNewFile = {
        title: '다운로드 하지 않고 새로운 파일을 업로드 하시겠습니까?',
        description: '바로 업로드하면 미리보기 파일은 저장되지 않습니다.',
        btnLabelNagative: '나가기',
        btnLabelPositive: '업로드하기',
    };

    return (
        <>
            <div
                style={{
                    marginTop: 'var(--h-header)',
                    backgroundColor: 'var(--clr-light-blue)',
                    height: 'calc(100vh - var(--h-header))',
                }}
            >
                <div className='preview-user'>
                    {/* ---------- 좌측 미리보기 블럭 -------- */}
                    <div className='left-container'>
                        <div
                            style={{
                                position: 'relative',
                                width: '80%',
                                height: '80%',
                            }}
                        >
                            <Image
                                src='/img/screen_img.svg'
                                alt='preview video screen'
                                fill={true}
                                style={{
                                    objectFit: 'contain',
                                    objectPosition: 'top center', // 좌측 상단을 기준으로 이미지를 정렬
                                }}
                            />
                        </div>
                        <FooterSimple />
                    </div>
                    {/* ---------- 우측 작업 정보 블럭 -------- */}
                    <div className='right-container'>
                        {/* ---------- 텍스트 정보 -------- */}
                        <div
                            className='flex_vertical'
                            style={{
                                width: '100%',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                gap: '1rem',
                            }}
                        >
                            {/* X 닫기 버튼 */}
                            <div className='btn_close_panel'>
                                <Link
                                    href=''
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleModalOpen('XBtnModal');
                                    }}
                                >
                                    <Image
                                        className='icon_cancel_x'
                                        src='/img/icon_cancel_x.svg'
                                        alt='cancel x icon'
                                        width={24}
                                        height={24}
                                    />
                                </Link>
                            </div>
                            {/* 작업 잔여 건수 */}
                            <div
                                className='flex_vertical'
                                style={{
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    gap: '1rem',
                                }}
                            >
                                <p className='item_name'>작업 잔여 건수</p>
                                <p className='item_value'>1/2건 가능</p>
                            </div>
                            {/* ----- 구분선 ------ */}
                            <Divider
                                borderStyle='solid'
                                borderColor='var(--clr-label-blue)'
                                my={2}
                            />
                            {/* 파일 정보 */}
                            <div
                                className='flex_vertical'
                                style={{
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    gap: '1rem',
                                }}
                            >
                                <p className='item_name'>파일 정보</p>
                                <p className='item_value'>
                                    Photo_name.png{' '}
                                    {/* 마스카 진행 상태 뱃지  */}
                                    <Text
                                        as='span'
                                        color='var(--clr-white)'
                                        bgColor='var(--clr-primary)'
                                        className='maska_status_badge'
                                        mx={2}
                                    >
                                        마스카 완료
                                    </Text>
                                </p>
                                <p className='file_info'>
                                    2GB <br />
                                    1920x1080
                                </p>
                            </div>
                            {/* 태그 뱃지 */}
                            <div className='tags' style={{ marginTop: '1rem' }}>
                                <span>#얼굴인식</span>
                            </div>
                        </div>
                        <div
                            className='flex_vertical full_width'
                            style={{ gap: '1rem' }}
                        >
                            <Link
                                href=''
                                className='btn_round btn_outline btn_lg full_width'
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleModalOpen('LoginModal');
                                }}
                                ref={btnMaskaEditRef}
                            >
                                마스카 영역 편집하기
                            </Link>
                            <Link
                                href=''
                                className='btn_round btn_lg full_width'
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleModalOpen('DownLoadModal');
                                }}
                                ref={btnDonwloadRef}
                            >
                                바로 다운로드하기
                            </Link>
                            <p
                                style={{
                                    color: 'var(--clr-red)',
                                    padding: '0rem 2rem 0.5rem 2rem',
                                }}
                            >
                                마스카는 보안을 위해 1회의 다운로드 기회만
                                제공하므로, 신중히 다운로드하시기 바랍니다.
                            </p>
                            <Link
                                href=''
                                className='btn_round btn_lg btn_black full_width'
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleModalOpen('NewFileModal');
                                    // handleNewFileUpload();
                                }}
                            >
                                새로운 파일 업로드하기
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* ------ 마스카 영역 편집하기 모달 ------- */}
            <ModalComponent
                isModalOpen={isModalOpenLogin} // 오픈 여부 상태 변수 전달
                handleModalClose={handleModalClose} //  닫기 버튼용 함수 전달
                handleModalNegative={handleModalClose} // 부정 버튼용 함수 전달
                handleConfirm={handleGoToLogin} // 예 또는 긍정 버튼용 함수 전달
                modalOption={modalOptionLogin} // 모달 UI 요소를 위한 옵션 전달
            />
            {/* ------ 바로 다운로드하기 모달 ------- */}
            <ModalComponent
                isModalOpen={isModalOpenDownload} // 오픈 여부 상태 변수 전달
                handleModalClose={handleModalClose} // 닫기 버튼용 함수 전달
                handleModalNegative={handleDownload} // 부정 버튼용 함수 전달
                handleConfirm={handleGoToLogin} // 예 또는 긍정 버튼용 함수 전달
                modalOption={modalOptionDownload} // 모달 UI 요소를 위한 옵션 전달
            />
            {/* ------ 우측 패널 상단 X 버튼 모달: 다운로드하지 않고 나가기 ------- */}
            <ModalComponent
                isModalOpen={isModalOpenXBtn} // 오픈 여부 상태 변수 전달
                handleModalClose={handleModalClose} // 닫기 버튼용 함수 전달
                handleModalNegative={handleNewFileUpload} // 부정 버튼용 함수 전달
                handleConfirm={handleDownload} // 예 또는 긍정 버튼용 함수 전달
                modalOption={modalOptionXBtn} // 모달 UI 요소를 위한 옵션 전달
            />
            {/* ------ 새로운 파일 업로드하기 버튼 모달 ------- */}
            <ModalComponent
                isModalOpen={isModalOpenNewFile} // 오픈 여부 상태 변수 전달
                handleModalClose={handleModalClose} // 닫기 버튼용 함수 전달
                handleModalNegative={handleNewFileUpload} // 부정 버튼용 함수 전달
                handleConfirm={handleNewFileUpload} // 예 또는 긍정 버튼용 함수 전달
                modalOption={modalOptionNewFile} // 모달 UI 요소를 위한 옵션 전달
            />
        </>
    );
};
export default PreviewUserImg;
