'use client';
import Link from 'next/link';
import FileUploadComponent from '../common/FileUploadComponent';

const SecMain = () => {
    return (
        <div className='sec_main align_center'>
            <h1 className='title fade_down'>
                영상·사진 속 <span className='text_blur'>개인정보 블러</span>
                <br />
                <span className='text_maska'>마스카</span>에서 간편하고 안전하게
            </h1>
            <FileUploadComponent />
            <div className='features'>
                <p>AI 기반 자동 블러</p>
                <span>&bull;</span>
                <p>Maska로 개인정보보호법 준수</p>
                <span>&bull;</span>
                <p>구간 전송 암호화로 높인 보안성</p>
            </div>
            <Link href='/signup' className='btn_round btn_xl btn_skyblue'>
                가입하고 더 많은 파일 마스카하기
            </Link>
        </div>
    );
};
export default SecMain;
