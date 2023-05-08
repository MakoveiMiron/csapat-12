import {createProduct} from '../../Services/Crud'

export default function Admin1(){
    return(
        <>
            <button onClick={createProduct}>Create product</button>
        </>
    )
}