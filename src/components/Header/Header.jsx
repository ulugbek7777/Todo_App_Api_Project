import React from 'react';
import style from './Header.module.css';
import home from './../../assets/images/home.png';
import menu from './../../assets/images/menu.png';
const Header = (props) => {
    return (
        <div>
            <div className={style.headerContainer}>
                <div className={style.rightElements}>
                    <p>{props.name}</p>
                </div>
                <div className={style.flexWrap}>
                    <div><img style={{ marginTop: '16px' }} className={style.leftIcons} src={menu} alt="" /></div>
                    <div><img className={style.leftIcons} src={home} alt="" /></div>
                    <div><input className={style.headerInput} type="text" name="search" placeholder="no active plan for future" /></div>
                </div>
            </div>
        </div>
    );
}

export default Header;

