import { makeAutoObservable } from "mobx"

export default class ProductStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Smartphones'},
            {id: 2, name: 'Notepads'},
        ]
        this._brands = [
            {id: 1, name: 'Samsund'},
            {id: 2, name: 'Apple'},
        ]
        this._products = [
            {
                id: 1,
                name: 'Iphone 12',
                description: 'Iphone hyper puper technology...',
                price: '12 USD',
                rating: 4,
                img: '',
                type_id: 1,
                brand_id: 2,
            },
            {
                id: 2,
                name: 'Iphone 13',
                description: 'Iphone hyper puper technology...',
                price: '14 USD',
                rating: 5,
                img: '',
                type_id: 1,
                brand_id: 2,
            },
            {
                id: 3,
                name: 'Smartphone 5',
                description: 'Smartphone hyper puper technology...',
                price: '14 USD',
                rating: 5,
                img: '',
                type_id: 1,
                brand_id: 1,
            },
            {
                id: 3,
                name: 'Notepad 5',
                description: 'Notepad hyper puper technology...',
                price: '15 USD',
                rating: 4.5,
                img: '',
                type_id: 2,
                brand_id: 1,
            },
            {id: 2, name: 'Apple'},
        ]
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setProducts(products) {
        this._products = products
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get products() {
        return this._products
    }
}