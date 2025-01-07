import {JSX, useEffect} from 'react';
import styles from './Up.module.css'
import UpIcon from './up.svg';
import {motion, useAnimation} from "framer-motion";
import {useScrollY} from "@/helpers/icons/hooks/useScrollY";

export const Up = (): JSX.Element => {
    const controls = useAnimation()
    const y = useScrollY()

    useEffect(() => {
        controls.start({opacity: y / document.body.scrollHeight})
    })
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
    return (
        <motion.button
            className={styles.up}
            onClick={scrollToTop}
            animate={controls}
            initial={{opacity: 0}}
        >

            <UpIcon/>
        </motion.button>
    )
}