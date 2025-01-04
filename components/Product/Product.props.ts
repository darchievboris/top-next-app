import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {ProductModule} from "@/interfaces/product.interface";

export interface ProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    product:ProductModule
}