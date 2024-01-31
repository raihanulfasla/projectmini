import React from "react";
import Product from "./login/product/Product";
import Editproduct from "./Editproduct";
import { Grid,Paper } from "@mui/material";
import Orders from "./Orders";


function Productlist() {

    const [edit,setEdit] = React.useState(false);
    const [product,setProduct] = React.useState({});
    const [refresh,setRefresh]=React.useState(true)

    const getProductData = (data)=>{
        setProduct(data)
    }

   


    return (
        <>

            { edit ? <Editproduct setRefresh={setRefresh}  refresh={refresh} product={product}/> : <Product  setRefresh={setRefresh} refresh={refresh}/>}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                    <Orders setRefresh={setRefresh} refresh={refresh} getProductData={getProductData} setEdit={setEdit} />
                </Paper>
            </Grid>

        </>
    )
}
export default Productlist;