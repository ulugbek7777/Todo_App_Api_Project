import React from 'react'
import style from './../Inbox.module.css';

function ChapterCreator(props) {
    // props.setChapterInput('hehe');
    return (
        <div>
            <div>
                <div className={style.blockInp}>
                    <input onChange={ (e) => props.setChapterInput(e.currentTarget.value) } value={ props.chapterInput } className={style.chapterInput} placeholder="Text here..." />
                </div>
                <div>
                    <button onClick={ props.addChapter } className={`${style.button} ${style.redBtn}`}>Add Chapter</button>
                    <button onClick={ props.cencel } className={`${style.button} ${style.whiteBtn}`}>Cencel</button>
                </div>
                </div>
        </div>
    )
}

export default ChapterCreator;
