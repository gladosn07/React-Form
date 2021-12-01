import { useState } from "react";

interface IProduct {
    code: string;
    description: string;
    price?: number;
    key: number;
}

export const Product = () => {
    const [product, setProducts] = useState<IProduct[]>([
        {
            code: '10',
            description: 'Keyboard',
            price: 98,
            key: 1,
        },
    ])

    const Add = () => {
        setProducts(prevState => [...prevState, {
            code: '',
            description: '',
            price: undefined,
            key: Date.now(),
        }])
    }

    const remove = (key: number) => {
        setProducts(prevState => prevState.filter(product => product.key !== key))
    }

    const handInputchange = (key: number, ev: React.ChangeEvent<HTMLInputElement>) => {
        setProducts(prevState => {
            const newState = prevState.map(product => {
                if(product.key === key) {
                    return {
                        ...product,
                        [ev.target.name]: ev.target.value
                    }
                }
                return product
            })
            return newState
        })
    }

    return (
        <div>
            <h2>Products</h2>
            {product.map((product, index) => (
                <div key={product.key} className='row'>
                    {index + 1} 
                    <input 
                        type="text" 
                        placeholder='Code' 
                        name='code'
                        value={product.code}
                        onChange={ev => handInputchange(product.key, ev)}
                    />
                    <input 
                        type="text" 
                        placeholder='Description' 
                        name='description'
                        value={product.description}
                        onChange={ev => handInputchange(product.key, ev)}
                    />
                    <input 
                        type="text" 
                        placeholder='Price' 
                        name='price'
                        value={product.price}
                        onChange={ev => handInputchange(product.key, ev)}
                    />
                    <button className='delete' onClick={() => remove(product.key)}>
                        Delete
                    </button>
                </div>

            ))}
            
            <button className='add' onClick={Add} >Add</button>
            {/* Saida para Testar persistencia dos campos */}
            <pre>
                <code>
                    {JSON.stringify(product, null, 2)}
                </code>
            </pre>
        </div>
    )
}