import {createProduct, deleteProduct} from '../../Services/Crud'

export default function Admin1(){
    return(
        <>
            <button onClick={createProduct}>Create product</button>
            <button onClick={deleteProduct}>Delete product</button>
        </>
    )
}