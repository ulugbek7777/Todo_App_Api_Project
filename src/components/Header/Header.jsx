import React, { useState } from 'react';
import style from './Header.module.css';
import home from './../../assets/images/home.png';
import menu from './../../assets/images/menu.png';
import { NavLink } from 'react-router-dom';
const Header = (props) => {
    const [inputText, setInputText] = useState('')
    const onSearch = (e) => {
        props.getSearchingData(e.currentTarget.value);
        setInputText(e.currentTarget.value);
    }
    return (
        <div>
            <div className={style.headerContainer}>
                <div className={style.rightElements}>
                    <p>{props.name}</p>
                </div>
                <div className={style.flexWrap}>
                    <div><img style={{ marginTop: '16px' }} className={style.leftIcons} src={menu} alt="" /></div>
                    <div><img className={style.leftIcons} src={home} alt="" /></div>
                    <div>
                        <input value={inputText} onChange={ (e) => onSearch(e) } className={style.headerInput} type="text" name="textfield" autocomplete="off" placeholder="search..." />
                        { props.searchingData.check === true && <div className={style.resultBlock}>
                            { props.searchingData.task.map(u => <div className={style.taskBlock}>
                                <NavLink onClick={ ()=> {setInputText(''); props.getSearchingData('');} } to={ props.taskTodayCheck + '/task/' + u.id }>
                                    <div className={style.taskIcon}></div>
                                    <div className={style.taskText}>{u.task}</div>
                                </NavLink>
                            </div>) }
                        </div> }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;

