import React from "react";
import Skeleton from '@mui/material/Skeleton';
export default function customSkeleton(){
    return(
        <>
         <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={210}
        height={150}
        style={{margin:"10px"}}
      />
        </>
    )
}