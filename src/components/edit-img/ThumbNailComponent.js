'use client';
import { Badge } from '@chakra-ui/react';
const ThumbNailComponent = ({ src, count }) => {
    const handelMouseOver = (e) => {
        const thumbnail = e.target;
        document.getElementById(
            'screen_edit_img'
        ).src = `/img/screen_edit_over${count}.svg`;
        thumbnail.setAttribute(
            'style',
            'border: 0.125rem solid var(--clr-red)'
        );
    };
    const handelMouseOut = (e) => {
        const thumbnail = e.target;
        document.getElementById('screen_edit_img').src =
            '/img/screen_edit_normal.svg';
        thumbnail.setAttribute(
            'style',
            'border: 0.125rem solid var(--clr-yellow)'
        );
    };
    const handleSelectImage = (e) => {
        const thumbnail = e.target;
        document.getElementById(
            'screen_edit_img'
        ).src = `/img/screen_edit_select${count}.svg`;
        thumbnail.setAttribute(
            'style',
            'border: 0.125rem solid var(--clr-sky-blue)'
        );
    };

    return (
        <div className='flex_vertical' style={{ gap: '1rem' }}>
            <img
                src={src}
                alt={'thumbnail ' + count}
                style={{ border: '0.125rem solid var(--clr-yellow)' }}
                onMouseOver={(e) => {
                    handelMouseOver(e);
                }}
                onMouseOut={(e) => {
                    handelMouseOut(e);
                }}
                onClick={(e) => {
                    handleSelectImage(e);
                }}
            />
            <Badge
                bgColor='var(--clr-sky-blue)'
                fontSize='var(--fs-16)'
                fontWeight='var(--fw-700)'
                color='var(--clr-white)'
                padding='0.28rem 1rem 0.28rem 1rem'
                borderRadius='1rem'
            >
                {count}
            </Badge>
        </div>
    );
};
export default ThumbNailComponent;
