'use client';
import useScrollFadeUp from '@/hooks/useScrollFadeUp';
import SecContents from './SecContents';
import Image from 'next/image';

const optionProps = {
    title: 'Make Use Case',
    headline: '증빙자료부터 SNS까지<br >사진·영상 활용에 자유를',
    description: [
        '초상권과 개인정보보호법을 지키면서',
        '안전하게 사진과 영상을 제출 및 업로드해요.',
    ],
    tags: ['#소명자료', '#증빙자료', '#SNS업로드'],
    rules: [
        '개인정보보호법 제25조 제6항',
        '개인정보보호법 제25조의2 제4항',
        '개인정보보호법 제29조',
    ],
};

const SecUseCaseMaska = () => {
    useScrollFadeUp('.fade-up');

    return (
        <div className='sec_contents usecase_maska relative'>
            <div>
                <SecContents optionProps={optionProps} />
            </div>
            <div className='bg_img reveal_usecase_maska_bg fade-up'>
                <Image
                    src='/img/bg_usecase_maska.svg'
                    alt='Use Case maska'
                    width={24}
                    height={24}
                />
            </div>
        </div>
    );
};
export default SecUseCaseMaska;
