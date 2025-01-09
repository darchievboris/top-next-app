import {JSX, useState} from 'react';
import {SearchProps} from './Search.props';
import styles from './Search.module.css'
import cn from 'classnames';
import {Button, Input} from "@/components";
import SearchIcon from "./search.svg"
import {useRouter} from "next/router";

export const Search = ({className, ...props}: SearchProps): JSX.Element => {
    const [search, setSearch] = useState<string>('')
    const router = useRouter();

    const goToSearch = () => {
        router.push({
            pathname: '/search',
            query: {
                q: search
            }
        });
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            goToSearch();
        }
    };
    return (
        <form className={cn(styles.search, className)}{...props} role="search">
            <Input
                className={styles.input}
                placeholder='Поиск...'
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Искать по сайту"
            />
            <Button className={styles.button} appearance="primary" onClick={goToSearch}>
                <SearchIcon/>
            </Button>
        </form>
    )
};