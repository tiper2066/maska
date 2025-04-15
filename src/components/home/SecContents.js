import parse from 'html-react-parser'; // html 태그 포함 문자열 파싱해서 출력

const SecContents = ({ optionProps }) => {
    const { title, headline, description, tags, rules } = optionProps;
    return (
        <>
            <h2 className='title'>{title}</h2>
            <h3 className='headline'>{parse(headline)}</h3>
            <p className='description'>
                {description && description.length > 0
                    ? description.map((item, index) => (
                          <span key={index}>
                              {parse(item)}
                              <br />
                          </span>
                      ))
                    : null}
            </p>
            <div className='tags'>
                {tags && tags.length > 0
                    ? tags.map((tag) => <span key={tag}>{tag}</span>)
                    : null}
            </div>
            <div className='rules'>
                {rules && rules.length > 0
                    ? rules.map((rule) => <p key={rule}>&sdot; {rule}</p>)
                    : null}
            </div>
        </>
    );
};
export default SecContents;
