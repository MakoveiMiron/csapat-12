export default function ProductCard(props){


    return(
    <>
    <p>Név: {props.product.title}</p>
    <p>Ár: {props.product.price}</p>
    </>
    )
}