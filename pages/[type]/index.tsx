import {Input, Textarea} from '@/components';
import {firstLevelMenu} from '@/helpers/helpers';
import {MenuItem} from '@/interfaces/menu.interface';
import {withLayout} from '@/Layout/Layout';
import axios from 'axios';
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from 'next';
import {ParsedUrlQuery} from 'querystring';
import {JSX} from 'react';
import {API} from "@/helpers/api";

function Type({firstCategory}: TypeProps): JSX.Element {
    return (
        <>
            {firstCategory}
            <Input placeholder="тест"/>
            <Textarea placeholder='text'></Textarea>
        </>
    );
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLevelMenu.map(m => '/' + m.route),
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({
                                                                    params
                                                                }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) return {notFound: true};
    const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
    if (!firstCategoryItem) return {notFound: true};
    const {data: menu} = await axios.post<MenuItem[]>(
        API.topPage.find,
        {
            firstCategory: firstCategoryItem.id
        }
    );
    return {
        props: {
            menu,
            firstCategory: firstCategoryItem.id
        }
    };
};

interface TypeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}
