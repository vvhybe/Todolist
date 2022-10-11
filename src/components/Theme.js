import React, {useState, useEffect, useRef} from 'react';
import themes from '../api/themes.json';

import  aqua from '../imgs/BG/aqua-bg.svg';
import  black from '../imgs/BG/black-bg.svg';
import  blue from '../imgs/BG/blue-bg.svg';
import  brown from '../imgs/BG/brown-bg.svg';
import  coral from '../imgs/BG/coral-bg.svg';
import gray from '../imgs/BG/gray-bg.svg';
import keppel from '../imgs/BG/keppel-bg.svg';
import moss from '../imgs/BG/moss-bg.svg';
import peru from '../imgs/BG/peru-bg.svg';
import pink from '../imgs/BG/pink-bg.svg';
import purpel from '../imgs/BG/purpel-bg.svg';

const BGimgs = {
    "aqua":aqua,
    "black":black,
    "blue":blue,
    "brown":brown,
    "coral":coral,
    "gray":gray,
    "keppel":keppel,
    "moss":moss,
    "peru":peru,
    "pink":pink,
    "purpel":purpel
};

export default function Theme() {
    const theme = localStorage.getItem("theme");

    const [currentTheme, setCurrentTheme] = useState(theme ? theme : "gray");
    const [activeThemes, setactiveThemes] = useState(false);

    const toggelThemes = ()=>{ setactiveThemes(!activeThemes) };
    const onClickOutsideThemes = ()=>{ setactiveThemes(false) };

    useEffect(()=>{
        const localTheme = localStorage.getItem("theme");
        if(localTheme){
            setCurrentTheme(localTheme)
        }
    },[]);
    
    useEffect(()=>{
        localStorage.setItem("theme", currentTheme);
        
        const styleRoot = document.documentElement;
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        const [themeProperties] = themes.filter(theme => (theme.name === currentTheme));
        const CSSthemeProperties = Object.keys(themeProperties);
        const CSSthemeValues= Object.values(themeProperties);
        
        metaTheme.setAttribute("content", styleRoot.style.getPropertyValue("--pr-def-color"));
        styleRoot.style.setProperty("--bg-img", `url(${BGimgs[currentTheme]})`);
    

        // CSS :root pr/sc-def/drk-color + op + op1 + op2 + op3 
        for (let clr = 1; clr < 4; clr++) {
            styleRoot.style.setProperty(CSSthemeProperties[clr], CSSthemeValues[clr]);
            styleRoot.style.setProperty(CSSthemeProperties[clr]+"-op", CSSthemeValues[clr]+"65");
            styleRoot.style.setProperty(CSSthemeProperties[clr]+"-op1", CSSthemeValues[clr]+"50");
            styleRoot.style.setProperty(CSSthemeProperties[clr]+"-op2", CSSthemeValues[clr]+"34");
            styleRoot.style.setProperty(CSSthemeProperties[clr]+"-op3", CSSthemeValues[clr]+"1f");
        }
        
        const propertiesThemeCSS = CSSthemeProperties.reverse(); 
        const valuesThemeCSS = CSSthemeValues.reverse(); 
        
        // CSS :root --bx-shadow
        for (let bxshd = 0; bxshd < 3; bxshd++) {
            styleRoot.style.setProperty(propertiesThemeCSS[bxshd], valuesThemeCSS[bxshd]);
        }
        

    },[currentTheme]);

    // close the Themes by losing the focus on it/ clicking outside of it
    const useOutSideClick = (callback) =>{
        const ref = useRef();
        useEffect(()=>{
            const outClick = (event) =>{ if(ref.current && !ref.current.contains(event.target)){ callback(); } };
            document.addEventListener("click", outClick);
            
            return () => { document.removeEventListener("click", outClick); }
        });
        return ref;
    }
    
    const ref = useOutSideClick(onClickOutsideThemes);

    return (
    <div className='theme' ref={ref}>
        <button className='themeBtn' title={currentTheme} onClick={toggelThemes}></button>
        <div className={activeThemes ? "themes activeThemes" : "themes"}>
            {themes.map(theme => (
                <button key={theme.name} title={theme.name} onClick={()=>{setCurrentTheme(theme.name)}} className={currentTheme === theme.name ? "currentTheme" : ""} style={{backgroundColor: theme["--pr-def-color"]}}></button>
            ))}
        </div>
    </div>
  )
}
