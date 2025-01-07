import {JSX, useEffect} from 'react';
import styles from './Up.module.css'
import {motion, useAnimation} from "framer-motion";
import {useScrollY} from "@/helpers/icons/hooks/useScrollY";
import {ButtonIcon} from "@/components";

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
        <motion.div
            className={styles.up}
            animate={controls}
            initial={{opacity: 0}}
        >
            <ButtonIcon appearance="primary" icon="up" onClick={scrollToTop}/>
        </motion.div>
    )
}