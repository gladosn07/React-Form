import {useFieldArray, useForm} from 'react-hook-form' 

interface IProduct {
    code: string;
    description: string;
    price?: number;
}

type FormValues = {
    products: IProduct[]
}

export const ProductReactHookForm = () => {

    const { control, register, handleSubmit } = useForm<FormValues>();
    const { fields, append, remove, } = useFieldArray({
        control, 
        name: "products",
    });

    const Add = () => {
        append (
            {
                code: '',
                description: '',
                price: undefined,
            });
    };

    return (
        <div>
            <h2>Products</h2>
                <form onSubmit={handleSubmit(data => console.log(data))}>
                {fields.map((product, index) => (
                    <div key={product.id} className='row'>
                        {index + 1} 
                        <input 
                            type="text" 
                            placeholder='Code'
                            {...register(`products.${index}.code`,{
                                required: 'Por favor, preencha o campo'
                            })}
                        />
                        <input 
                            type="text" 
                            placeholder='Description'
                            {...register(`products.${index}.description`)}
                        />
                        <input 
                            type="text" 
                            placeholder='Price'
                            {...register(`products.${index}.price`)}
                        />
                        <button className='delete' onClick={() => remove(index)}>
                            Delete
                        </button>
                    </div>
                ))}
                <button type='submit'>Enviar</button>
            </form>
            <button className='add' onClick={Add} >Add</button>
            {/* Saida para Testar persistencia dos campos */}
            <pre>
                <code>
                    {JSON.stringify(fields, null, 2)}
                </code>
            </pre>
        </div>
    )
}