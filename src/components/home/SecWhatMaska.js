'use client';
import useScrollFadeUp from '@/hooks/useScrollFadeUp';
import SecContents from './SecContents';
import Image from 'next/image';

const optionProps = {
    title: 'What is Maska',
    headline: '얼굴·자동차번호판 가리는건<br ><span>마스카</span>에서',
    description: [
        '마스카는 AI 기술 기반으로 얼굴과',
        '자동차 번호판을 자동으로 한 번에 가려줘요.',
        '클릭 한 번으로 손쉽게 마스카 작업을 한 뒤',
        '다운로드까지 무료로 받을 수 있어요.',
    ],
    tags: ['#얼굴인식', '#자동차번호판인식'],
};

const SecWhatMaska = () => {
    useScrollFadeUp('.fade-up'); // 요소 애니메이션하기

    return (
        <div className="sec_contents what_maska relative">
            <div>
                <SecContents optionProps={optionProps} />
            </div>
            <div className="bg_img reveal_what_maska_bg fade-up">
                <Image
                    src="/img/bg_what_maska.svg"
                    alt="what maska"
                    width={24}
                    height={24}
                    priority
                />
            </div>
        </div>
    );
};
export default SecWhatMaska;
