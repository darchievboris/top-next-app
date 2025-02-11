import CoursesIcon from './icons/CoursesIcon.svg';
import ServicesIcon from './icons/ServicesIcon.svg';
import BooksIcon from './icons/BooksIcon.svg';
import ProductsIcon from './icons/ProductsIcon.svg';
import { TopLevelCategory } from '@/interfaces/page.interface';
import { FirstLevelMenuItem } from '@/interfaces/menu.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
	{ route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services },
	{ route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books },
	{ route: 'products', name: 'Курсы', icon: <ProductsIcon />, id: TopLevelCategory.Products }
];

export const priceRu = (price: number): string =>
	new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		maximumFractionDigits: 0
	}).format(price);

export const declOfNum = (number:number): string =>{
	const titles = ["отзыв","отзыва","отзывов"]
	const cases = [2,0,1,1,1,2]
	let temp =0

	if(number %100 >4 && number %100 <20) {temp = 2}
	else {
		temp = cases[(number % 10 < 5) ? number % 10 : 5]
	}

	return titles[temp]
}